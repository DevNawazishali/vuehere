<i18n>
  EN:
  JP:
</i18n>
<template>
  <div class="nft-index">
    <div class="first-screen">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="pack-chosed-content">
        <div class="pack-wrap">
          <div class="mask-panel single">
            <img class="lt-icon" src="../../assets/image/pc/frame-edge-lt.png" alt="" srcset="" />
            <img class="lb-icon" src="../../assets/image/pc/frame-edge-lb.png" alt="" srcset="" />
            <img class="rt-icon" src="../../assets/image/pc/frame-edge-rt.png" alt="" srcset="" />
            <img class="rb-icon" src="../../assets/image/pc/frame-edge-rb.png" alt="" srcset="" />
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
            <span class="astr">10000.34567 USDC</span>
            <div class="handle-line">
              <input type="number" class="number-input" v-model="buySinglePackNum" />
              <span class="astr">{{ buySinglePackNum * boxPrice }} USDC</span>
              <span @click="showModal('buySinglePack')" class="buy-button">Buy Packs</span>
            </div>
          </div>
          <div class="mask-panel box">
            <img class="lt-icon" src="../../assets/image/pc/frame-edge-lt.png" alt="" srcset="" />
            <img class="lb-icon" src="../../assets/image/pc/frame-edge-lb.png" alt="" srcset="" />
            <img class="rt-icon" src="../../assets/image/pc/frame-edge-rt.png" alt="" srcset="" />
            <img class="rb-icon" src="../../assets/image/pc/frame-edge-rb.png" alt="" srcset="" />
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
            <span class="astr">{{ usdtBalance }}</span>
            <div class="handle-line">
              <div>
                <div class="thrid-title">Gift Box Price</div>
                <span class="astr">{{ bagPrice }} USDC</span>
              </div>
              <span @click="showModal('buyBoxPack')" class="buy-button plus"
                >Buy Box Pack <br />+House</span
              >
            </div>
          </div>
        </div>
        <div class="custom">
          <span class="title">Open Packs</span>
          <img src="../../assets/image/pc/giftIcon.png" alt="" srcset="" />
          <span class="red-box"></span>
          <span class="label"
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor.</span
          >
          <div class="box-type">
            <div class="item">
              <span class="type">Number of single packs holdings</span>
              <span class="value">{{ boxNum }}</span>
              <div class="handle-area">
                <input class="number number-input" type="number" v-model="openSinglePackNum" />
                <span @click="showModal('openSinglePack')" class="open-box-button"
                  >Open Single Pack</span
                >
              </div>
            </div>
            <div class="item">
              <span class="type">Number of box’s holdings</span>
              <span class="value">{{ bagNum }}</span>
              <div class="handle-area">
                <input class="number" type="text" />
                <span @click="showModal('openBoxPack')" class="open-box-button">Open Box Pack</span>
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
          <template v-if="modalType === 'buySinglePack'">
            <span class="title">Buy Single Pack</span>
            <span class="item-line">
              <span class="label">Number</span>
              <span class="value">1</span>
            </span>
            <span class="item-line">
              <span class="label">Price</span>
              <span class="value">{{ boxPrice }} USDC</span>
            </span>
          </template>
          <template v-if="modalType === 'buyBoxPack'">
            <span class="title">Buy Box Pack</span>
            <span class="item-line">
              <span class="label">Price</span>
              <span class="value">{{ bagPrice }} USDC</span>
            </span>
          </template>
          <template v-if="modalType === 'openSinglePack'">
            <span class="title">Open Single Pack</span>
            <span class="item-line">
              <span class="label">Number</span>
              <span class="value">20</span>
            </span>
          </template>
          <template v-if="modalType === 'openBoxPack'">
            <span class="title">Open Box Pack</span>
            <span class="item-line">
              <span class="label">Price</span>
              <span class="value">123.456 BNB</span>
            </span>
          </template>
          <div class="handle-button">
            <span @click="closeModal" class="button-item cancel-button">Cancel</span>
            <span @click="confirmModal" class="button-item confirm-button">confirm</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  buyBoxNew,
  checkApprove,
  usdtBalance,
  usdtApprove,
  openBox,
  boxNum,
  bagPrice,
  boxPrice,
} from "../../hooks/nftContract";

const name = "home";

export default {
  name,
  components: {},
  data() {
    return {
      boxPrice,
      bagPrice,
      total: "0",
      phasesAcitive: 1,
      scrollTop: 0,
      modalStatus: false,
      usdtBalance: "",
      modalType: "buySinglePack",
      modalType: "buySinglePack",
      buySinglePackNum: 1,
      openSinglePackNum: 1,
      bagNum: "0",
      boxNum: "0",
    };
  },
  computed: {
    ...mapState(["account", "isWallet"]),
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
    showModal(flag) {
      this.modalType = flag;
      this.modalStatus = true;
    },
    async confirmModal() {
      const isApprove = await checkApprove();
      const { modalType, buySinglePackNum, openSinglePackNum } = this;
      console.info("isApprove :", isApprove);
      if (!isApprove) {
        await usdtApprove();
      }
      if (modalType === "buySinglePack") {
        await buyBoxNew(0, buySinglePackNum);
      }
      if (modalType === "buyBoxPack") {
        await buyBoxNew(0, 1);
      }
      if (modalType === "openSinglePack") {
        const infos = await openBox(0, openSinglePackNum);
        console.info("-------------------", infos);
      }
      if (modalType === "openBoxPack") {
        const infos = await openBox(0, 1);
        console.info("-------------------", infos);
      }
    },
  },
  async mounted() {
    this.bagNum = await boxNum(0);
    console.info(this.bagNum);
    this.boxNum = await boxNum(1);
    this.usdtBalance = await usdtBalance();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
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
    height: 1150px;
    position: relative;
    background: url("../../assets/image/pc/firstBack.png") no-repeat;
    background-size: cover;
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 50%;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 50%;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .pack-chosed-content {
      position: relative;
      z-index: 10;
      padding-top: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .pack-wrap {
        display: flex;
      }
      .mask-panel {
        position: relative;
        display: inline-block;
        width: 617px;
        height: 624px;
        background: url("../../assets/image/pc/mask.png") no-repeat;
        background-size: contain;
        box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.6);
        opacity: 1;
        border: 2px solid #96711a;
        box-sizing: border-box;
        padding: 50px 30px;
        .lt-icon {
          position: absolute;
          top: -26px;
          left: -22px;
        }
        .lb-icon {
          position: absolute;
          bottom: -17px;
          left: -15px;
        }
        .rt-icon {
          position: absolute;
          top: -17px;
          right: -15px;
        }
        .rb-icon {
          position: absolute;
          bottom: -18px;
          right: -16px;
        }
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
            margin: 0 45px;
            font-size: 50px;
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
          color: #fff784;
          border-radius: 8px 8px 8px 8px;
          opacity: 1;
          border: 1px solid #c79b34;
          outline: none;
          padding-left: 8px;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            appearance: none;
          }
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
        margin-right: 40px;
      }
      .box {
        .plus {
          height: 80px;
          background-repeat: no-repeat;
          background-size: cover;
          width: 270px;
          line-height: 38px;
        }
      }
      .custom {
        display: flex;
        align-items: center;
        width: 1268px;
        height: 191px;
        margin: 40px auto;
        background: linear-gradient(132deg, #707070 0%, #383838 100%);
        border-radius: 5px 5px 5px 5px;
        opacity: 1;
        border: 3px solid #717171;
        .number-input {
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            appearance: none;
          }
        }
        > img {
          display: inline-block;
          margin-right: 16px;
        }
        .red-box {
          display: inline-block;
          width: 126px;
          height: 129px;
          background-image: url("../../assets/image/pc/redBox.png");
          background-repeat: no-repeat;
          background-size: contain;
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
          border-right: 1px solid #ffffff;
          padding-right: 18px;
        }
        .box-type {
          display: flex;
          margin-left: 20px;
          .item {
            &:first-child {
              margin-right: 20px;
            }
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
              .number {
                width: 82px;
                height: 46px;
                padding-left: 20px;
                outline: none;
                background: #461f1f;
                border-radius: 8px 8px 8px 8px;
                opacity: 1;
                border: 1px solid #c79b34;
                color: #fff784;
              }
              .open-box-button {
                display: inline-block;
                margin-left: 8px;
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
      width: 782px;
      height: 348px;
      background: url("../../assets/image/pc/modalBack.png") no-repeat;
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
        margin-top: 60px;
        text-align: center;
        .title {
          display: inline-block;
          margin-bottom: 30px;
          font-size: 3rem;
          font-family: Playfair Display-Bold, Playfair Display;
          font-weight: bold;
          color: #ffffff;
        }
        .item-line {
          display: block;
          width: 50%;
          margin-left: 30%;
          margin-bottom: 8px;
          text-align: initial;
          .label {
            display: inline-block;
            width: 120px;
            text-align: left;
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
          margin-top: 20px;
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
            line-height: 52px;
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
