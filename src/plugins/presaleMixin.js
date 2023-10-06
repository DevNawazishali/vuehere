import {
  getTime,
  getCurrency,
  getClaimDate,
  buyMBT,
  getUserLocked,
  claim,
  isOpened,
} from '@/hooks/presaleContract';
import { updateChainId } from '@/hooks/useWallte';
import { formatCountDown } from '@/utils/utils';
import Decimal from 'decimal.js';
import { mapState } from 'vuex';
import api from '@/api/api';
import fill from '@/plugins/filters';

let timer;

export default {
  data() {
    return {
      buyValue: null,
      select: '1',
      input3: '',
      time: {
        startTime: '--',
        endTime: '--',
      },
      isClaim: false, // 是否展示领取页面
      currency: [],
      activeSymbol: {
        index: null,
        symbol: 'USDT',
        token: '',
        balance: 0,
        minBuyAmount: 0,
        maxBuyAmount: 0,
        isNeedApprove: false,
        changeScale: 0,
      },
      selectCurrency: 'USDT',
      buyDisabled: false,
      claimDisabled: true,
      claimDate: 0,
      calcBuyAmountValue: null,
      userLocked: {
        total: 0,
        Locked: 0,
        Unlocked: 0,
      },
      claimCountdown: 'xx day xx hour',
      code: this.$route.query.code,
      starAndEndTime: {
        startTime: 0,
        endTime: 0,
      },
    };
  },
  computed: {
    ...mapState(['isWallet', 'account']),
    rateValue() {
      const { symbol, changeScale } = this.activeSymbol;
      let val = 0;
      if (changeScale > 0) {
        const scale = new Decimal(changeScale);
        val = new Decimal(1).div(scale).toFixed();
      }
      return `${val} ${symbol}`;
    },
    minimumPurchase() {
      const { symbol, minBuyAmount } = this.activeSymbol;
      return `${fill.filters.numberFormat(minBuyAmount)} ${symbol}`;
    },
    maximamPurchase() {
      const { symbol, maxBuyAmount } = this.activeSymbol;
      return `${fill.filters.numberFormat(maxBuyAmount)} ${symbol}`;
    },
    isOpen() { // 是否已开启
      const { startTime, endTime } = this.time;
      const n = Math.floor(Date.now());
      return Number(endTime) > n && n > Number(startTime);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.calcBuyAmountValue = null;
      if (this.isWallet) {
        await this.getUserInfo();
      }
      await this.getDate();
      await this.getTokens();
      await this.fetchClaimDate();
    },

    async fetchClaimDate() {
      const time = await getClaimDate();
      const now = Math.floor(new Date().getTime() / 1000);
      const end = Number(time);
      const interval = end - now;
      this.isClaim = interval <= 0;
      this.claimDate = time * 1000;
      this.claimCountdown = formatCountDown(interval);
      if (this.isClaim) {
        await updateChainId();
      }
    },

    async getUserInfo() {
      this.userLocked = await getUserLocked();
      this.claimDisabled = !(Number(this.userLocked.Unlocked) > 0);
    },

    async getDate() {
      const time = await getTime();
      this.time = {
        startTime: Number(time.startTime) * 1000,
        endTime: Number(time.endTime) * 1000,
      };
      if (this.time.endTime < Math.floor(Date.now())) {
        clearInterval(timer);
      }
    },

    async getTokens() {
      this.currency = await getCurrency();
      this.activeSymbol = this.currency[0];
      this.selectCurrency = 'USDT';
    },

    buyValueInput(val) {
      const { balance } = this.activeSymbol;
      this.calcBuyAmountValue = null;
      if (Number(val) > Number(balance)) {
        this.buyValue = balance;
      }
      // if (Number(val) < Number(minBuyAmount)) {
      //   this.buyValue = minBuyAmount;
      // };
      // if (Number(val) > Number(maxBuyAmount)) {
      //   this.buyValue = maxBuyAmount;
      // };
    },

    buyValueChange(val) {
      try {
        if (Number(val) > 0) {
          const { changeScale } = this.activeSymbol;
          const calc = new Decimal(val).mul(new Decimal(changeScale)).toFixed();
          this.calcBuyAmountValue = this.truncation(calc);
        } else {
          this.calcBuyAmountValue = null;
        }
      } catch (error) { }
    },

    inputMax() {
      const { balance } = this.activeSymbol;
      this.buyValue = balance;
      this.buyValueChange(this.buyValue);
    },

    currencyChange(val) {
      this.activeSymbol = this.currency.find(i => (i.symbol === val));
      this.buyValueChange(this.buyValue);
      this.buyValue = null;
      this.calcBuyAmountValue = null;
    },

    // 购买
    async buyClick() {
      if (!this.isWallet) return this.ConnectWallet();
      const is = await isOpened();
      if (!is) return;
      const { buyValue, code } = this;
      this.buyValueChange(buyValue);
      const {
        symbol, balance, minBuyAmount, maxBuyAmount,
      } = this.activeSymbol;

      if (Number(buyValue) > Number(balance)) return;

      if (Number(buyValue) >= Number(minBuyAmount) && Number(buyValue) <= Number(maxBuyAmount)) {
        this.buyDisabled = true;
        try {
          const tx = await buyMBT(buyValue, this.activeSymbol, code);
          this.buyDisabled = false;
          this.init();
          this.buyValue = null;
        } catch (error) {
          this.buyDisabled = false;
        }
      } else {
        if (Number(buyValue) > Number(maxBuyAmount)) {
          return this.tip(`Maximum Purchase ${maxBuyAmount} ${symbol}`);
        }
        return this.tip(`Minimum Purchase ${minBuyAmount} ${symbol}`);
      }
    },

    async claimClick() {
      if (!this.isWallet) return this.ConnectWallet();
      this.claimDisabled = true;
      try {
        await claim();
        this.claimDisabled = false;
        this.getUserInfo();
      } catch (error) {
        this.claimDisabled = false;
      }
    },

    fetchUserCode() {
      if (this.$route.query.code) {
        api.getByCode({ code: this.$route.query.code }).then((r) => {
          if (!r) this.$router.push('/');
        });
      } else {
        this.$router.push('/');
      }
    },
  },
  beforeMount() {
    this.fetchUserCode();
  },
  watch: {
    async isWallet(is) {
      if (is) {
        this.getTokens();
        this.getUserInfo();
      } else {
        this.userLocked = {
          total: 0,
          Locked: 0,
          Unlocked: 0,
        };
        this.currency.forEach((i) => {
          i.balance = 0;
        });
        this.buyValue = null;
      }
    },
  },
  destroyed() {
    clearInterval(timer);
  },
};
