<template>
  <div class="wallet">
    <span v-if="isWallet" @mouseenter="enterAddress" class="address-name">{{
      addressHandle
    }}</span>
    <template v-else>
      <img
        @click="ConnectWallet"
        src="../assets/image/pc/wallet.png"
        alt=""
        srcset=""
      />
    </template>
    <div
      class="wallet-list"
      @blur="blurWalletList"
      tabindex="-1"
      ref="walletList"
      v-show="walletList"
      @mouseleave="blurWalletList"
    >
      <span @click="exitWallet" class="item">Disconnect</span>
      <span @click="copyAddress" class="item">Copy</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { isMobile, copyToClipboard } from '@/utils/utils';

export default {
  name: '',
  data() {
    return {
      walletList: false,
    };
  },
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
  methods: {
    enterAddress() {
      this.walletList = true;
      this.$nextTick(() => {
        this.$refs.walletList.focus();
      });
    },
    blurWalletList() {
      this.walletList = false;
    },
    exitWallet() {
      this.DisconnectWallet();
      this.$refs.walletList.blur();
    },
    copyAddress() {
      copyToClipboard(this.account);
    },
  },
};
</script>
<style scoped lang='less'>
.wallet {
  position: absolute;
  width: 138px;
  right: 50px;
  top: 150px;
  display: flex;
  align-items: center;
  > img {
    position: absolute;
    right: 0px;
  }
  .address-name {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: url("../assets/image/pc/menuBack.png") no-repeat;
    background-size: 100%;
    text-align: center;
    font-size: 1.6rem;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffac1a;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .line {
    display: inline-block;
    width: 294px;
    height: 5px;
    background: linear-gradient(270deg, rgba(255, 144, 29, 0) 0%, #ff901d 100%);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
  }
  .wallet-list {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
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
</style>
