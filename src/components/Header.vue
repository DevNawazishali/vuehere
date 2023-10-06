<i18n>
  EN:
    menu:
      - 'HOME'
      - 'NFT'
      - 'Staking'
      - 'POOL'
      - 'MARKET'
      - 'DOCS'
      - 'ABOUT'
  JA:
    menu: '选择钱包'
</i18n>
<template>
  <div class="header">
    <span @mouseenter="showMenu(item)" class="menu-item" v-for="item in menus" :key="item.id">
      <span @click="toMenu(item)">{{ $t(item.name) }}</span>
      <span v-if="item.id === 'nft'" class="nft"></span>
      <div
        v-if="item.id === 'nft' && showNftList"
        class="nft-list"
        tabindex="-1"
        @blur="blurNftList"
        ref="nftList"
        @mouseleave="blurNftList"
      >
        <span @click="toMenuList('myNft')" class="item">My Nft</span>
        <span class="item">Buy NFT</span>
      </div>
    </span>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { isMobile, interceptAdd, copyToClipboard } from '@/utils/utils';
import { menus } from '@/utils/constant';
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';

export default {
  name: '',
  data() {
    return {
      mobileMenu: false,
      showNftList: false,
      menus: [
        { id: 'home', name: 'menu[0]' },
        { id: 'nft', name: 'menu[1]' },
        { id: 'staking', name: 'menu[2]' },
        { id: 'market', name: 'menu[4]' },
        { id: 'docs', name: 'menu[5]' },
        { id: 'about', name: 'menu[6]' },
      ],
    };
  },
  computed: {
    ...mapState(['account', 'isWallet', 'language', 'isMobileActive', 'cacheConnect']),
  },
  components: { Dropdown, DropdownMenu, DropdownItem },
  mounted() {
    const a = sessionStorage.getItem('cacheConnect');
    if (a) this.ConnectWallet();
  },
  methods: {
    ...mapMutations(['val']),
    interceptAdd,
    showMenu(item) {
      if (item.id !== 'nft') return;
      this.showNftList = true;
      this.$nextTick(() => {
        if (this.$refs.nftList) {
          this.$refs.nftList[0].focus();
        }
      });
    },
    blurNftList() {
      this.showNftList = false;
    },
    toMenuList(flag) {
      this.showNftList = false;
      this.$router.push(`/${flag}`);
    },
    toMenu(item) {
      if (item.id === 'home') {
        this.$router.push('/');
      }
      if (item.id === 'nft') {
        this.$router.push('/myNft');
      }
      if (item.id === 'docs') {
        window.open('https://bomber-quest.gitbook.io/bomber-quest/bomber-quest-1');
      }
    },
    checkMenu() {
      if (isMobile()) {
        const { isMobileActive } = this;
        this.val({
          key: 'isMobileActive',
          data: !isMobileActive,
        });
      }
    },
    handleClose() {
      this.mobileMenu = false;
      this.closeHidden();
    },
    openMenu() {
      this.mobileMenu = !this.mobileMenu;
      this.closeHidden();
    },
    closeHidden() {
      const mo = function () {
        // false;
      };
      document.addEventListener('touchmove', mo, false);
    },
    menuClick(/* path */) {
      this.handleClose();
      // this.$router.push(path);
    },
    handleOpen() {
      // 打开新窗口
      const router = this.$router.resolve('/docs');
      window.open(router.href, '_blank');
    },
    handleCopyAddress(text, val = false) {
      // 复制用户地址
      try {
        copyToClipboard(text);
        if (val) this.mobileMenu = false;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  watch: {
    mobileMenu: {
      // 监听钱包状态, 增加或移除hidden
      handler(n) {
        document.body.style.overflow = n ? 'hidden' : '';
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="less">
.header {
  display: flex;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  .menu-item {
    position: relative;
    display: inline-block;
    width: 138px;
    height: 52px;
    margin-right: 20px;
    font-size: 1.6rem;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffac1a;
    line-height: 5.2rem;
    text-align: center;
    text-shadow: 0px 3px 20px rgba(23, 12, 0, 0.5);
    background: url("../assets/image/pc/menuBack.png") no-repeat;
    cursor: pointer;
    .nft-list {
      position: absolute;
      width: 100%;
      display: flex;
      flex-direction: column;
      outline: none;
      .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ffac1a;
        border-color: transparent;
        &:hover {
          border-color: #ffac1a;
        }
      }
    }
  }
  .nft {
    background-image: url("../assets/image/pc/angle.png");
    background-position: center;
    position: absolute;
    width: 35px;
    height: 35px;
    display: inline-block;
    top: 12px;
    right: 15px;
  }
}
</style>
