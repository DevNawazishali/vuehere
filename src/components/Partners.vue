<i18n>
  EN:
    title:
      - 'Investors & Partners'
  JP:
</i18n>
<template>
  <div class="partners">
    <div class="all-mask"></div>
    <div class="top-mask"></div>
    <div class="bottom-mask"></div>
    <div class="partners-content">
      <span class="title">{{ $t("title[0]") }}</span>
      <div class="logo-block">
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-7.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-8.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-49.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-51.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-52.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-7.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-8.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-49.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-51.png" alt="" />
        </span>
        <span class="img-box">
          <img src="../assets/image/pc/logoipsum-logo-52.png" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Partners",
  data() {
    return {
      links: [
        {
          path: "",
          icon: "footer_twitter",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="less">
.partners {
  width: 100%;
  height: 1213px;
  background: #2c1c17;
  position: relative;
  .all-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
  }
  .bottom-mask {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 434px;
    background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    opacity: 1;
    z-index: 5;
  }
  .partners-content {
    position: relative;
    z-index: 10;
    padding-top: 156px;
    .title {
      display: block;
      margin-bottom: 78px;
      text-align: center;
      font-size: 60px;
      font-family: Slackey-Regular, Slackey;
      font-weight: 400;
      color: #ffac1a;
      text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
      -webkit-text-stroke: 2px #b7790c;
    }
    .logo-block {
      margin-left: 225px;
      .img-box {
        display: inline-block;
        width: 291px;
        height: 186px;
        text-align: center;
        line-height: 186px;
      }
    }
  }
  @media @mobile {
    width: 100%;
    height: auto;
    padding-bottom: 150px;
    background: #2d1600;
    position: relative;
    .all-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .top-mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 450px;
      background: linear-gradient(360deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
      opacity: 1;
      z-index: 5;
    }
    .bottom-mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 450px;
      background: linear-gradient(180deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
      opacity: 1;
      z-index: 5;
    }
    .partners-content {
      position: relative;
      z-index: 10;
      padding-top: 150px;
      .title {
        display: block;
        margin-bottom: 50px;
        text-align: center;
        font-size: 3.8rem;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffac1a;
        text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
        -webkit-text-stroke: 2px #b7790c;
      }
      .logo-block {
        text-align: center;
        margin: 0;
        .img-box {
          display: inline-block;
          width: 40%;
          height: 80px;
          text-align: center;
          line-height: 80px;
          > img {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>
