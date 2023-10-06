<i18n>
  EN:
  JP:
</i18n>
<template>
  <div class="mobile-menu">
    <div class="icon">
      <img class="logo" src="../assets/image/mobile/logo.png" alt="" srcset="" />
      <img @click="close" class="close" src="../assets/image/mobile/close.png" alt="" srcset="" />
    </div>
    <span class="menu-item" v-for="item in menus" :key="item.id">
      <span @click="toMenu(item)">{{ $t(item.name) }}</span>
      <span @click="showMenu" v-if="item.id === 'nft'" class="nft"></span>
      <div
        v-if="item.id === 'nft' && showNftList"
        @blur="blurNftList"
        class="nft-list"
        tabindex="-1"
        ref="nftList"
      >
        <span @click="toMenuList('myNft')" class="item">My Nft</span>
        <span class="item">Buy NFT</span>
      </div>
    </span>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      showNftList: false,
      menus: [
        { id: 'home', name: 'HOME' },
        { id: 'nft', name: 'NFT' },
        { id: 'staking', name: 'Staking' },
        { id: 'market', name: 'MARKET' },
        { id: 'docs', name: 'DOCS' },
        { id: 'about', name: 'ADOUT' },
      ],
    };
  },
  created() {},
  methods: {
    close() {
      this.$router.back();
    },
    showMenu() {
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
  },
};
</script>
<style scoped lang="less">
.mobile-menu {
  width: 100%;
  min-height: 100%;
  height: 1334px;
  background: #2d1600;
  opacity: 0.9;
  overflow: auto;
  padding: 26px 40px 26px 30px;
  box-sizing: border-box;
  .icon {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 110px;
    .logo {
      width: 52%;
    }
    .close {
      width: 19%;
    }
  }
  .menu-item {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;
    font-size: 3.2rem;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffac1a;
    text-shadow: 0px 3px 20px rgba(23, 12, 0, 0.5);
    background: url("../assets/image/mobile/menuBack.png") no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
    .nft-list {
      position: absolute;
      width: 50%;
      top: 50px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      outline: none;
      z-index: 10;
      background: #975c23;
      opacity: 1;
      .item {
        width: 100%;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ffac1a;
        border-color: transparent;
        &:hover {
          border-color: #ffac1a;
        }
      }
    }
    .nft {
      background-image: url("../assets/image/pc/angle.png");
      background-position: center;
      width: 40px;
      height: 40px;
      display: inline-block;
      position: absolute;
      margin-left: 100px;
    }
  }
}
</style>
