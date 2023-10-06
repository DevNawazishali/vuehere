<i18n>
  EN:
  JP:
</i18n>
<template>
  <div class="nft-index">
    <div class="first-screen">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="bottom-back"></div>
      <div class="pack-chosed-content">
        <div class="mask-panel single">
          <div class="title">
            <img class="title-icon" src="../../assets/image/pc/titleLeft.png" alt="" srcset="" />
            <span class="name">Single Pack</span>
            <img class="title-icon" src="../../assets/image/pc/titleRight.png" alt="" srcset="" />
          </div>
          <div class="box-des">
            <img src="../../assets/image/pc/box.png" alt="" />
            <div class="des">
              <span class="copy-link">Copy 10% Referral link</span>
              <span class="second-title">Lorem Ipsum</span>
              <span class="label"
                >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor.</span
              >
            </div>
          </div>
          <div class="thrid-title">Binance of</div>
          <span class="astr">10000.34567 ASTR</span>
          <div class="handle-line">
            <input type="text" class="number-input" />
            <span class="astr">0.123 ASTR</span>
            <span @click="openModal" class="buy-button">Buy Packs</span>
          </div>
        </div>
        <div class="mask-panel box">
          <div class="title">
            <img class="title-icon" src="../../assets/image/pc/titleLeft.png" alt="" srcset="" />
            <span class="name">Box Pack</span>
            <img class="title-icon" src="../../assets/image/pc/titleRight.png" alt="" srcset="" />
          </div>
          <div class="box-des">
            <img src="../../assets/image/pc/giftBox.png" alt="" />
            <div class="des">
              <span class="second-title">Lorem Ipsum</span>
              <span class="label"
                >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor.</span
              >
              <span class="second-title">NFT Gift Box composition</span>
              <span class="label">
                <span class="list-item">1. Lorem ipsum</span>
                <span class="list-item">2. Lorem ipsum</span>
                <span class="list-item">3. Lorem ipsum</span>
              </span>
            </div>
          </div>
          <div class="thrid-title">Remaining Amount</div>
          <span class="astr">{{usdtBalance}}</span>
          <div class="handle-line">
            <div>
              <div class="thrid-title">Gift Box Price</div>
              <span class="astr">123.456 ASTR</span>
            </div>
            <span class="buy-button plus">Buy Box Pack <br />+House</span>
          </div>
        </div>
        <div class="custom">
          <div class="label-content">
            <span class="title">Open Packs</span>
            <img src="../../assets/image/pc/giftIcon.png" alt="" srcset="" />
            <span class="red-box"></span>
            <span class="label"
              >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor.</span
            >
          </div>
          <div class="box-type">
            <div class="item">
              <span class="type">Number of box’s holdings</span>
              <span class="value">3000</span>
              <div class="handle-area">
                <input class="number" type="text" />
                <span class="open-box-button">Open Box</span>
              </div>
            </div>
            <div class="item">
              <span class="type">Number of box’s holdings</span>
              <span class="value">3000</span>
              <div class="handle-area">
                <input class="number" type="text" />
                <span class="open-box-button">Open Gift Box</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-show="modalStatus">
      <div class="modal-content">
        <img
          @click="closeModal"
          class="close-icon"
          src="../../assets/image/pc/modalClose.png"
          alt=""
          srcset=""
        />
        <div class="content-wrap">
          <span class="title">Buy Single Pack</span>
          <span class="item-line">
            <span class="label">Number</span>
            <span class="value">1</span>
          </span>
          <span class="item-line">
            <span class="label">Price</span>
            <span class="value">0.123 BNB</span>
          </span>
          <div class="handle-button">
            <span class="button-item cancel-button">Cancel</span>
            <span class="button-item confirm-button">confirm</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { usdtBalance } from '@/hooks/nftContract';

const name = 'home';

export default {
  name,
  components: {},
  data() {
    return {
      total: '0',
      phasesAcitive: 1,
      scrollTop: 0,
      modalStatus: false,
      usdtBalance: '',
    };
  },
  computed: {
    ...mapState(['account', 'isWallet']),
    activeName() {
      return this.$route.path;
    },
  },
  methods: {
    closeModal() {
      this.modalStatus = false;
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
    },
    openModal() {
      this.modalStatus = true;
    },
  },
  async mounted() {
    this.usdtBalance = await usdtBalance();
    window.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>
<style scoped lang="less">
.nft-index {
  position: relative;
  width: 100%;
  font-size: 1.8rem;
  overflow: auto;
  .first-screen {
    width: 100%;
    padding-bottom: 75px;
    position: relative;
    background: url("../../assets/image/mobile/firstBack.png") no-repeat;
    background-size: contain;
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 50%;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
      z-index: 5;
    }
    .bottom-back {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 700px;
      background: #2c1c17;
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 50%;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
      z-index: 5;
    }
    .pack-chosed-content {
      position: relative;
      z-index: 10;
      padding-top: 170px;
      text-align: center;
      .mask-panel {
        text-align: initial;
        position: relative;
        display: inline-block;
        width: 665px;
        height: 673px;
        background: url("../../assets/image/mobile/boxBack.png") no-repeat;
        background-size: contain;
        opacity: 1;
        box-sizing: border-box;
        padding: 80px 60px;
        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
          .title-icon {
            width: 54px;
            height: 42px;
          }
          .name {
            display: inline-block;
            margin: 0 15px;
            font-size: 4rem;
            font-family: Playfair Display-Bold, Playfair Display;
            font-weight: bold;
            color: #5d311c;
          }
        }
        .box-des {
          display: flex;
          margin-bottom: 40px;
          .des {
            display: flex;
            flex-direction: column;
            margin-left: 40px;
            .copy-link {
              text-align: center;
              width: 308px;
              height: 51px;
              font-size: 1.8rem;
              font-family: Poppins-SemiBold, Poppins;
              font-weight: 600;
              color: #199aaa;
              line-height: 51px;
              background: url("../../assets/image/pc/nftButton.png") no-repeat;
              background-size: contain;
            }
          }
          .second-title {
            font-size: 2.5rem;
            font-family: Playfair Display-Bold, Playfair Display;
            font-weight: bold;
            color: #5d311c;
          }
          .label {
            font-size: 1.5rem;
            font-family: Poppins-Light, Poppins;
            font-weight: 300;
            color: rgba(93, 77, 25, 0.7);
            .list-item {
              display: block;
            }
          }
        }
        .thrid-title {
          font-size: 2rem;
          font-family: Playfair Display-Regular, Playfair Display;
          font-weight: 400;
          color: #5d311c;
        }
        .astr {
          display: block;
          font-size: 2.2rem;
          font-family: Poppins-Medium, Poppins;
          font-weight: 500;
          color: #4a4a4a;
        }
        .number-input {
          width: 109px;
          height: 48px;
          background: #461f1f;
          border-radius: 8px 8px 8px 8px;
          opacity: 1;
          border: 1px solid #c79b34;
          outline: none;
          padding-left: 8px;
        }
        .handle-line {
          display: flex;
        }
        .buy-button {
          display: inline-block;
          width: 201px;
          height: 59px;
          margin-left: auto;
          font-size: 18px;
          font-family: Poppins-SemiBold, Poppins;
          font-weight: 600;
          color: #aa6d1d;
          text-align: center;
          line-height: 59px;
          cursor: pointer;
          user-select: none;
          background: url("../../assets/image/pc/buttonBack.png");
        }
      }
      .single {
      }
      .box {
      }
      .custom {
        display: block;
        width: 90%;
        height: 433px;
        margin: 0 auto;
        background: linear-gradient(132deg, #707070 0%, #383838 100%);
        border-radius: 5px 5px 5px 5px;
        opacity: 1;
        border: 3px solid #717171;
        .label-content {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
          > img {
            display: inline-block;
            margin-right: 16px;
          }
          .red-box {
            display: inline-block;
            width: 128px;
            height: 129px;
            background-image: url(/img/redBox.8075202d.png);
            background-size: contain;
            background-repeat: no-repeat;
          }
          .title {
            display: inline-block;
            margin: 0 20px;
            font-size: 2.5rem;
            font-family: Playfair Display-Bold, Playfair Display;
            font-weight: bold;
            color: #ffffff;
          }
          .label {
            display: inline-block;
            width: 198px;
            height: 88px;
            font-size: 1.5rem;
            font-family: Poppins-Light, Poppins;
            font-weight: 300;
            color: rgba(255, 243, 203, 0.7);
            line-height: 21px;
          }
        }
        .box-type {
          display: flex;
          justify-content: center;
          margin-top: 50px;
          .item {
            margin-right: 40px;
            .type {
              display: block;
              font-size: 18px;
              font-family: Playfair Display-Regular, Playfair Display;
              font-weight: 400;
              color: rgba(255, 243, 203, 0.7);
            }
            .value {
              display: block;
              font-size: 21px;
              font-family: Poppins-Medium, Poppins;
              font-weight: 500;
              color: #ffffff;
            }
            .handle-area {
              display: flex;
              align-items: center;
              justify-content: center;
              .number {
                width: 82px;
                height: 46px;
                padding-left: 20px;
                outline: none;
                background: #461f1f;
                border-radius: 8px 8px 8px 8px;
                opacity: 1;
                border: 1px solid #c79b34;
              }
              .open-box-button {
                display: inline-block;
                margin-left: 8px;
                width: 169px;
                height: 51px;
                font-size: 2rem;
                font-family: Slackey-Regular, Slackey;
                font-weight: 400;
                color: #ffffff;
                text-align: center;
                line-height: 51px;
                text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
                cursor: pointer;
                user-select: none;
                background: url("../../assets/image/pc/buttonBack.png") no-repeat;
                background-size: contain;
              }
            }
          }
        }
      }
    }
  }
  .modal {
    position: absolute;
    z-index: 99;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-content {
      position: relative;
      width: 694px;
      height: 755px;
      background: url("../../assets/image/mobile/modalBack.png") no-repeat;
      background-size: contain;
      .close-icon {
        position: absolute;
        top: 50px;
        right: 50px;
        width: 29px;
        height: 29px;
        cursor: pointer;
      }
      .content-wrap {
        width: 100%;
        height: 100%;
        margin-top: 80px;
        text-align: center;
        .title {
          font-size: 3rem;
          font-family: Playfair Display-Bold, Playfair Display;
          font-weight: bold;
          color: #ffffff;
        }
        .item-line {
          display: block;
          .label {
            font-size: 2rem;
            font-family: Playfair Display-Regular, Playfair Display;
            font-weight: 400;
            color: rgba(255, 243, 203, 0.7);
          }
          .value {
            font-size: 2rem;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .handle-button {
          .button-item {
            display: inline-block;
            width: 169px;
            height: 51px;
            font-size: 1.8rem;
            font-family: Poppins-SemiBold, Poppins;
            font-weight: 600;
            color: #aa6d1d;
            text-align: center;
            line-height: 51px;
            cursor: pointer;
            user-select: none;
          }
          .cancel-button {
            background: url("../../assets/image/pc/buttonBack.png") no-repeat;
            margin-right: 24px;
            background-size: contain;
          }
          .confirm-button {
            width: 200px;
            height: 52px;
            color: #199aaa;
            background: url("../../assets/image/pc/modalButton.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>
