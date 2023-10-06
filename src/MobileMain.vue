<template>
  <div class="main">
    <Header />
    <div class="contentView">
      <router-view />
    </div>
  </div>
</template>
<script>
import { throttle } from "@/utils";
import Header from "./components/MobileHeader.vue";

export default {
  name: "",
  components: { Header },
  data() {
    return {
      activeKey: "/", // 当前选中路由key
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
      if (!i.path.includes("/")) {
        this.isDrawer = false;
        return;
      }
      if (i.path === "/") this.$router.push("/");
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
    "$route.path": {
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
    window.addEventListener("scroll", throttle(this.handleScroll, 300), true);
  },
  destroyed() {
    window.removeEventListener("scroll", throttle(this.handleScroll, 300), true);
  },
};
</script>
<style scoped lang="less">
.main {
  position: relative;
  width: 100%;
  min-height: 100%;
}

.contentView {
  width: 100%;
  min-height: 100%;
  @media @mobile {
    background-size: contain;
  }
}
</style>
