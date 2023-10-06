<i18n>
  EN:
    text:
      - 'Subscribe to Our Newsletter'
      - 'Follow us'
      - 'SUBSCRIBE'
  JP:
</i18n>
<template>
  <div class="footer">
    <div class="all-mask"></div>
    <div class="footer-content">
      <span class="title">{{ $t("text[1]") }}</span>
      <span class="platform">
        <section class="platform-box">
          <span class="img-box">
            <img src="../assets/image/pc/platform1.png" alt="" srcset="" />
          </span>
          <span class="img-box">
            <img src="../assets/image/pc/platform2.png" alt="" srcset="" />
          </span>
          <span class="img-box">
            <img src="../assets/image/pc/platform3.png" alt="" srcset="" />
          </span>
          <!-- <span @click="toTwitter" class="img-box"> -->
          <span class="img-box">
            <a href="https://twitter.com/bomberquest" target="_blank">
              <img src="../assets/image/pc/platform4.png" alt="" srcset="" />
            </a>
          </span>
          <span class="img-box">
            <img src="../assets/image/pc/platform5.png" alt="" srcset="" />
          </span>
        </section>
      </span>
    </div>
    <div class="split-line">
      <img src="../assets/image/mobile/splitLine.png" alt="" />
    </div>
    <span class="footer-text">&copy; Bomber Quest | 2022</span>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    isNft: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      links: [
        {
          path: '',
          icon: 'footer_twitter',
        },
      ],
    };
  },
  created() {},
  methods: {
    toTwitter() {
      window.open('https://twitter.com/bomberquest');
    },
  },
};
</script>
<style scoped lang="less">
.footer {
  width: 100%;
  background: #6e4819;
  position: relative;
  .all-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(360deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
  }
  .footer-content {
    position: relative;
    z-index: 10;
    .title {
      display: block;
      text-align: center;
      width: 80%;
      padding: 0 10%;
      margin-bottom: 50px;
      font-size: 4rem;
      font-family: Slackey-Regular, Slackey;
      font-weight: 400;
      color: #ffac1a;
      text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
      -webkit-text-stroke: 2px #b7790c;
    }
    .email-box {
      position: relative;
      display: block;
      width: 628px;
      height: 550px;
      margin: 0 5%;
      background: url("../assets/image/mobile/email.png") no-repeat;
      background-size: contain;
      .email-input {
        position: absolute;
        top: 275px;
        left: 50%;
        transform: translateX(-50%);
        width: 75%;
        height: 65px;
        background: rgba(40, 3, 3, 0.6);
        border-radius: 5px 5px 5px 5px;
        opacity: 1;
        border: 2px solid rgba(40, 3, 3, 0.6);
        font-size: 1.8rem;
        font-family: Montserrat-Medium, Montserrat;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        padding-left: 30px;
        box-sizing: border-box;
      }
      .button-item {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 300px;
        height: 75px;
        font-size: 1.8rem;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 75px;
        text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
        background: url("../assets/image/mobile/buttonBack.png") no-repeat;
        background-size: contain;
      }
    }
    .platform {
      margin-top: 40px;
      .label {
        font-size: 2.7rem;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffffff;
        line-height: 44px;
        display: block;
        text-align: center;
        margin-bottom: 36px;
      }
      .platform-box {
        padding: 0 5%;
        text-align: center;
        .img-box {
          display: inline-block;
          > img {
            width: 110px;
          }
          > a {
            width: 110px;
          }
          > a img {
            width: 110px;
          }
        }
      }
    }
  }
  .split-line {
    position: relative;
    z-index: 10;
    text-align: center;
    > img {
      width: 90%;
    }
  }
  .footer-text {
    margin-top: 45px;
    width: 100%;
    display: inline-block;
    position: relative;
    z-index: 10;
    font-size: 2.7rem;
    font-family: Montserrat-Medium, Montserrat;
    font-weight: 500;
    color: #ffffff;
    line-height: 42px;
    text-align: center;
  }
}
</style>
