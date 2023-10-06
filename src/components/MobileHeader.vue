<i18n>
  EN:
    text:
      - 'Subscribe to Our Newsletter'
      - 'or follow us on:'
      - 'SUBSCRIBE'
  JP:
</i18n>
<template>
  <div class="header">
    <img
      @click="toMenuPage"
      class="menu-icon"
      src="../assets/image/mobile/menu.png"
      alt=""
      srcset=""
    />
    <div class="wallet">
      <span v-if="isWallet" @click="enterAddress" class="address-name">{{ addressHandle }}</span>
      <template v-else>
        <img @click="ConnectWallet" src="../assets/image/pc/wallet.png" alt="" srcset="" />
      </template>
      <div
        class="wallet-list"
        @blur="blurWalletList"
        tabindex="-1"
        ref="walletList"
        v-show="walletList"
      >
        <span @click="exitWallet" class="item">Disconnect</span>
        <span @click="copyAddress" class="item">Copy</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { tip } from '@/utils/utils';

export default {
  name: '',
  data() {
    return {
      links: [
        {
          path: '',
          icon: 'footer_twitter',
        },
      ],
      walletList: false,
    };
  },
  created() {},
  computed: {
    ...mapState(['account', 'isWallet']),
    addressHandle() {
      const { account } = this;
      if (account) {
        const firstStr = account.slice(0, 6);
        const endStr = account.slice(-4);
        return `${firstStr}...${endStr}`;
      }
      return '';
    },
  },
  async mounted() {
    const a = sessionStorage.getItem('cacheConnect');
    if (a) this.ConnectWallet();
  },
  methods: {
    toMenuPage() {
      this.$router.push('/mobileMenu');
    },
    blurWalletList() {
      this.walletList = false;
    },
    enterAddress() {
      this.walletList = true;
      this.$nextTick(() => {
        this.$refs.walletList.focus();
      });
    },
    copyAddress() {
      const textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', 'readonly');
      textarea.value = this.account;
      document.body.appendChild(textarea);
      textarea.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        tip('Copy successfully');
      }
      document.body.removeChild(textarea);
    },
    exitWallet() {
      this.DisconnectWallet();
      this.$refs.walletList.blur();
    },
  },
};
</script>
<style scoped lang="less">
.header {
  position: absolute;
  width: 100%;
  top: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 20;
  box-sizing: border-box;
  padding: 0 2rem;
  .menu-icon {
    width: 18%;
    cursor: pointer;
  }
  .wallet {
    position: relative;
    display: flex;
    align-items: center;
    > img {
      width: 10rem;
      position: relative;
      right: 2rem;
    }
    .line {
      display: inline-block;
      width: 70px;
      height: 5px;
      background: linear-gradient(270deg, rgba(255, 144, 29, 0) 0%, #ff901d 100%);
      opacity: 1;
    }
    .address-name {
      width: 15rem;
      line-height: 52px;
      background: url("../assets/image/pc/menuBack.png") no-repeat;
      background-size: 100% 100%;
      font-size: 1.4rem;
      font-family: Slackey-Regular, Slackey;
      font-weight: 400;
      color: #ffac1a;
      text-align: center;
    }
    .wallet-list {
      position: absolute;
      top: 55px;
      left: 20px;
      width: 50%;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      outline: none;
      z-index: 10;
      .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ffac1a;
        border-color: transparent;
        font-weight: 400;
        color: #ffac1a;
        &:hover {
          border-color: #ffac1a;
        }
      }
    }
  }
}
</style>
