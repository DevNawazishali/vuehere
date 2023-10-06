<template>
  <div class="main">
    <MobileHeader v-if="isMobile" />
    <Header v-else />
    <div class="contentView">
      <router-view />
    </div>
  </div>
</template>
<script>
import { throttle } from '@/utils';
import { isMobile } from '@/utils/utils';
import Header from './components/Header.vue';
import MobileHeader from './components/MobileHeader.vue';

export default {
  name: '',
  components: { Header, MobileHeader },
  data() {
    return {
      isMobile: isMobile(),
      activeKey: '/', // 当前选中路由key
      isDrawer: false, // 抽屉状态
      isMenu: false,
      oldScrollTop: 0, // 记录上一次滚动结束后的滚动距离
      scrollTop: 0, // 记录当前的滚动距离
    };
  },
  methods: {
    handleOpenDrawer() {
      this.isDrawer = true;
      this.isMenu = true;
    },
    handleBack(i) {
      if (!i.path.includes('/')) {
        this.isDrawer = false;
        return;
      }
      if (i.path === '/') this.$router.push('/');
      // this.activeKey = i.path;
      // this.$router.push(i.path);
      window.scrollTo(0, 0);
      this.isDrawer = false;
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
    },
  },
  watch: {
    '$route.path': {
      // 监听路由变化切换 activeKey
      handler(n, o) {
        if (n !== o) this.activeKey = n;
      },
    },
    scrollTop(newValue, oldValue) {
      setTimeout(() => {
        if (newValue === window.scrollY) {
          // 延时执行后当newValue等于window.scrollY，代表滚动结束
          this.isMenu = false;
          this.oldScrollTop = newValue; // 每次滚动结束后都要给oldScrollTop赋值
        }
      }, 500);
      // 必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
      // 每次滚动开始时oldScrollTop与oldValue相等
      if (this.oldScrollTop === oldValue) this.isMenu = true;
    },
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.handleScroll, 300), true);
  },
  destroyed() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 300), true);
  },
};
</script>
<style scoped lang="less">
.main {
  width: 100%;
  position: relative;
  margin: 0 auto;
  min-height: 100%;
}

.contentView {
  width: 100%;
  min-height: 100%;
  //background-size: contain;
  @media @mobile {
    background-size: contain;
  }
}

.menu-btn {
  position: fixed;
  left: 5.6rem;
  z-index: 10;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;

  @media @mobile {
    display: none;
  }
}

.menu-wrapper {
  width: 100%;
  position: relative;
  font-size: 1.6rem;
  padding-left: 4.2rem;
  box-sizing: border-box;
  margin-top: 7%;

  .menu-line {
    position: absolute;
    width: 0.1rem;
    height: calc(100vh - 14rem);
    left: 5.2rem;
    z-index: 10;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.3;
  }

  .text {
    margin-left: 2rem;
  }

  .menu-item {
    cursor: pointer;
    font-weight: bold;
    margin-top: 5.2rem;
    color: #ffffff;
    transition: 0.25s all ease-in-out;

    &:hover {
      color: #d43b81;
    }
  }

  .menu-icon {
    margin-left: 0.2rem;
  }

  .active {
    color: #d43b81;
  }
}
</style>
