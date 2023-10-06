import { tip } from '@/utils/utils';
import { mapMutations } from 'vuex';
import { onConnect, disconnect } from '@/hooks/useWallte';
import cookies from 'cookies-js';
import { throttle } from '../utils/index';

export default {
  methods: {
    tip,
    ...mapMutations(['val']),
    async ConnectWallet() {
      await onConnect().then((r) => {
        this.val({
          key: 'isWallet',
          data: true,
        });
        this.val({
          key: 'account',
          data: r,
        });
        // cookies.set("cacheConnect", "connect");
        sessionStorage.setItem('cacheConnect', 'connect');
      });
    },

    async DisconnectWallet() {
      await disconnect().then((r) => {
        this.val({
          key: 'isWallet',
          data: false,
        });
        this.val({
          key: 'account',
          data: null,
        });
        this.val({
          key: 'users',
          data: {
            pendingBoxes: 0,
            pendingHighBoxes: 0,
            totalBuy: 0,
          },
        });
        sessionStorage.removeItem('cacheConnect');
      });
    },

    ConnectMetamask() {
      if (window.ethereum) {
        requestAccounts()
          .then((r) => {
            if (r.length > 0) {
              this.val({
                key: 'isWallet',
                data: true,
              });
              this.val({
                key: 'account',
                data: r[0],
              });
              this.val({
                key: 'walletDialog',
                data: false,
              });
            }
          })
          .catch(() => {
            this.val({
              key: 'isWallet',
              data: false,
            });
            tip(this.$t('metamask[1]'));
            return false;
          });
      } else {
        tip(this.$t('metamask[0]'));
      }
    },

    openNew(url) {
      window.open(url);
    },
    truncation(num, decimal) {
      const a = String(num);
      if (a.indexOf('.') > 0) {
        return a.substring(0, a.indexOf('.') + (decimal ? decimal + 1 : 5));
      }
      return a;
    },
  },
};

// 监听浏览器宽度变化
export const windowsSize = {
  data() {
    return {
      winWidth: 0, // 窗口大小
    };
  },
  methods: {
    handleWinSize(e) {
      this.winWidth = e.target.innerWidth || document.body.clientWidth;
    },
  },
  mounted() {
    window.addEventListener('resize', throttle(this.handleWinSize, 500), true);
  },
  destroyed() {
    window.removeEventListener('resize', throttle(this.handleWinSize, 500), true);
  },
};
