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
          <!-- <span @click="toTwitter" class="img-box link"> -->
          <span class="img-box link">
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
      <img src="../assets/image/pc/splitLine.png" alt="" />
    </div>
    <span class="footer-text">&copy; Bomber Quest | 2022</span>
  </div>
</template>
<script>
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
      emailAdress: '',
    };
  },
  created() {},
  methods: {
    toNewEmail() {
      const tempwindow = window.open('_blank');
      tempwindow.location = this.emailAdress;
    },
    toTwitter() {
      window.open('https://twitter.com/bomberquest');
    },
  },
};
</script>
<style scoped lang="less">
.footer {
  width: 100%;
  height: 773px;
  background: #280303;
  position: relative;
  background: url("../assets/image/pc/footerBack.png");
  text-align: center;
  .all-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
  }
  .footer-content {
    position: relative;
    z-index: 10;
    padding-top: 150px;
    margin-bottom: 160px;
    .title {
      display: block;
      margin-bottom: 60px;
      font-size: 6rem;
      font-family: Slackey-Regular, Slackey;
      font-weight: 400;
      color: #ffac1a;
      text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
      -webkit-text-stroke: 2px #b7790c;
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
        .img-box {
          display: inline-block;
        }
        .link {
          cursor: pointer;
        }
      }
    }
  }
  .split-line {
    position: relative;
    z-index: 10;
    text-align: center;
    width: 100%;
    > img {
      width: 100%;
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
    opacity: 0.4;
  }
  @media @mobile {
    width: 100%;
    height: 1290px;
    background: #6e4819;
  }
}
</style>
