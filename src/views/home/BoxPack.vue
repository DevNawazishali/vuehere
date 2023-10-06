<i18n>
  EN:
  JP:
</i18n>
<template>
  <div class="box-pack">
    <div class="bomber-box">
      <div class="top-mask"></div>
      <div class="bottom-mask"></div>
      <div class="bomber-content">
        <div class="box-img">
          <img src="../../assets/image/pc/gameBox.png" alt="" />
        </div>
        <div class="box-des">
          <span class="title">Box Pack</span>
          <!-- <span class="label">5,884 bomber for 5,884 packs </span> -->
          <span class="item-num">
            <img src="../../assets/image/pc/moneyPack.png" alt="" srcset="" />
            <span style="width: 300px" class="common">You get </span>
            <span style="height: 128px; line-height: 29px" class="yellow"
              >15 NFTs - One super rare or higher card in the box</span
            >
          </span>
          <span class="item-num">
            <img src="../../assets/image/pc/moneyPack.png" alt="" srcset="" />
            <span class="yellow">{{ leftBag }}</span
            >&nbsp;
            <span class="common">of 524 in stock </span>
          </span>
          <span class="item-num">
            <img src="../../assets/image/pc/moneyPack.png" alt="" srcset="" />
            <span class="yellow">1050</span>&nbsp;
            <span class="common">USDC </span>
          </span>
          <Button @click="buyPack" class="buy-box-button" :loading="isPackBtn" :disabled="isPackBtn">BUY PACK</Button>
        </div>
      </div>
    </div>
    <div class="open-pack">
      <div class="all-mask"></div>
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="pack-content">
        <span class="title">Open Box Pack</span>
        <div class="pack-wrap single-pack">
          <img class="mark-icon" src="../../assets/image/pc/markIcon.png" alt="" srcset="" />
          <img class="red-box" src="../../assets/image/pc/redBox.png" alt="" srcset="" />
          <div class="box-detail">
            <!-- <span class="des"
              >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor.</span
            > -->
            <div class="box-type">
              <div class="item">
                <span class="type">Number of box's holdings</span>
                <span class="value">{{ boxNumber }}</span>
              </div>
              <div class="split-line open-line"></div>
              <div class="item">
                <div class="handle-area">
                  <input class="number number-input" type="number" v-model="openBoxPackNumber" />
                  <Button @click="openBoxPack" :loading="isBoxPack" :disabled="isBoxPack" class="open-box-button">Open Box Pack</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span class="title">Transfer Box Pack</span>
        <div class="pack-wrap more-pack">
          <img class="mark-icon" src="../../assets/image/pc/markIcon.png" alt="" srcset="" />
          <img class="red-box" src="../../assets/image/pc/gift.png" alt="" srcset="" />
          <div class="box-detail">
            <!-- <span class="des"
              >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor.</span
            > -->
            <div class="box-type">
              <div class="item">
                <span class="type">Number of box's holdings</span>
                <span class="value">{{ boxNumber }}</span>
              </div>
              <div class="split-line"></div>
              <div class="item">
                <div class="form-item">
                  <span class="label">Address</span>
                  <input class="number long" type="text" v-model="toUserAddress" />
                </div>
                <div class="form-item">
                  <span class="label">Number of send</span>
                  <div class="handle-area">
                    <input
                      v-model="sendNumber"
                      class="number number-input"
                      type="number"
                      min="1"
                      oninput="this.value=this.value.replace(/\D/g);if(this.value.length>2)this.value=this.value.slice(0,2)"
                    />
                    <Button @click="transferGiftBox" :loading="isSendPack" :disabled="isSendPack" class="open-box-button">Send Box Pack</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tip } from '@/utils/utils';
import { mapState } from 'vuex';
import { Button } from 'element-ui';
import {
  checkApprove,
  usdtApprove,
  openBox,
  buyBoxNew,
  boxNum,
  transferBox,
  typeInfos,
} from '@/hooks/nftContract';
import api from '@/api/api';

export default {
  name: '',
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  components: { Button },
  data() {
    return {
      sendNumber: 1,
      openBoxPackNumber: 1,
      boxNumber: 0,
      toUserAddress: '',
      leftBag: '524',
      isPackBtn: false,
      isBoxPack: false,
      isSendPack: false,
      code: this.$route.query.code,
    };
  },
  computed: {
    ...mapState(['account', 'isWallet']),
  },
  methods: {
    async queryBoxNum() {
      this.boxNumber = await boxNum(0);
    },

    async buyPack() {
      if (!this.isWallet) return this.ConnectWallet();
      const { code } = this;
      this.isPackBtn = true;
      try {
        const isApprove = await checkApprove();
        if (!isApprove) {
          await usdtApprove();
        }
        await buyBoxNew(0, 1, code);
        tip('Success');
        this.leftBag = 524 - (await typeInfos(0)).count;
        this.isPackBtn = false;
        await this.queryBoxNum();
      } catch (e) {
        this.isPackBtn = false;
      }
    },

    async openBoxPack() {
      if (!this.isWallet) return this.ConnectWallet();
      if (!this.boxNumber) return;
      this.isBoxPack = true;
      try {
        const isApprove = await checkApprove();
        const { openBoxPackNumber } = this;
        if (!isApprove) {
          await usdtApprove();
        }
        await openBox(0, openBoxPackNumber);
        tip('Success');
        this.isBoxPack = false;
        await this.queryBoxNum();
      } catch (e) {
        this.isBoxPack = false;
      }
    },

    async transferGiftBox() {
      if (!this.isWallet) return this.ConnectWallet();
      if (!this.boxNumber) return;
      this.isSendPack = true;
      try {
        const isApprove = await checkApprove();
        const { sendNumber, toUserAddress } = this;
        if (!isApprove) {
          await usdtApprove();
        }
        await transferBox(0, sendNumber, toUserAddress);
        this.isSendPack = false;
        tip('Success');
      } catch (e) {
        this.isSendPack = false;
      }
    },

    fetchUserCode() {
      if (this.$route.query.code) {
        api.getByCode({ code: this.$route.query.code }).then((r) => {
          if (!r) this.$router.push('/');
        });
      } else {
        this.$router.push('/');
      }
    },
  },

  beforeMount() {
    this.fetchUserCode();
  },
  async mounted() {
    this.queryBoxNum();
    this.leftBag = 524 - (await typeInfos(0)).count;
    window.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>
<style scoped lang="less">
.box-pack {
  width: 100%;
  .bomber-box {
    width: 100%;
    height: 1050px;
    background: #2c1c17;
    position: relative;
    .top-mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 450px;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .bottom-mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 450px;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .bomber-content {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      z-index: 10;
      align-items: center;
      justify-content: center;
      .box-img {
        width: 39%;
        text-align: center;
        margin-right: 9%;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .box-des {
        width: 30%;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 6rem;
          font-family: Slackey-Regular, Slackey;
          font-weight: 400;
          color: #ffac1a;
          text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
          -webkit-text-stroke: 2px #b7790c;
        }
        .label {
          display: inline-block;
          margin: 8px 0 50px 0;
          font-size: 1.8rem;
          font-family: Montserrat-Medium, Montserrat;
          font-weight: 500;
          color: #ffffff;
          line-height: 29px;
        }
        .item-num {
          display: flex;
          align-items: center;
          font-size: 2.5rem;
          font-family: Montserrat-Medium Italic, Montserrat;
          font-weight: normal;
          color: #ffffff;
          line-height: 29px;
          margin-bottom: 24px;
          &:nth-child(2) {
            display: inline-block;
            margin-right: 8px;
          }
          .common {
          }
          .yellow {
            font-size: 3rem;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #ffac1a;
            line-height: 0px;
            text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
            -webkit-text-stroke: 1px #b7790c;
          }
        }
        .buy-box-button {
          width: 22rem;
          height: 59px;
          margin-top: 75px;
          font-size: 2rem;
          font-family: Slackey-Regular, Slackey;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          text-shadow: 0 2px 3px rgba(34, 25, 5, 0.52);
          background: url("../../assets/image/pc/buttonBack2.png");
          background-size: 100% 100%;
        }
      }
    }
  }
  .open-pack {
    width: 100%;
    height: 1557px;
    position: relative;
    background: url("../../assets/image/pc/metric.png") no-repeat;
    background-size: cover;
    .all-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #c94f32;
      opacity: 0.83;
    }
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 751px;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
      z-index: 5;
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 450px;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
      z-index: 5;
    }
    .pack-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 170px;
      z-index: 10;
      .title {
        display: inline-block;
        width: 71%;
        margin-bottom: 50px;
        font-size: 60px;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffac1a;
        text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
        -webkit-text-stroke: 2px #b7790c;
      }
      .pack-wrap {
        position: relative;
        display: flex;
        width: 71%;
        height: 402px;
        margin-bottom: 134px;
        background: linear-gradient(
          90deg,
          rgba(250, 191, 86, 0.3) 0%,
          rgba(250, 191, 86, 0.1) 100%
        );
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        border: 2px solid #fabf56;
        overflow: auto;
        .number-input {
          color: #fff784;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            appearance: none;
          }
        }
        .mark-icon {
          position: absolute;
          right: 40px;
          top: 40px;
        }
        .red-box {
          width: 210px;
          height: 210px;
          margin-left: 70px;
          margin-right: 40px;
          margin-top: 50px;
        }
        .box-detail {
          display: inline-block;
          margin-top: 7%;
          width: calc(100% - 320px);
          .des {
            display: block;
            width: 460px;
            margin: 90px 0 45px 0;
            font-size: 1.5rem;
            font-family: Poppins-Light, Poppins;
            font-weight: 300;
            color: rgba(255, 243, 203, 0.7);
            line-height: 21px;
          }
          .box-type {
            display: flex;
            .item {
              padding-top: 40px;
              .type {
                display: block;
                width: 170px;
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
              .form-item {
                display: flex;
                margin-bottom: 15px;
                .label {
                  width: 120px;
                  text-align: right;
                  display: inline-block;
                  font-size: 15px;
                  font-family: Segoe UI-Regular, Segoe UI;
                  font-weight: 400;
                  color: #fff784;
                  margin-right: 12px;
                }
                .long {
                  width: 318px;
                }
              }
              .number {
                width: 98px;
                height: 48px;
                margin-right: 20px;
                padding-left: 20px;
                font-size: 15px;
                outline: none;
                background: #461f1f;
                color: #fff784;
                border-radius: 8px 8px 8px 8px;
                opacity: 1;
                border: 1px solid #c79b34;
              }
              .handle-area {
                display: inline-flex;
                .open-box-button {
                  display: inline-block;
                  height: 59px;
                  font-size: 2rem;
                  font-family: Slackey-Regular, Slackey;
                  font-weight: 400;
                  color: #aa6d1d;
                  text-align: center;
                  user-select: none;
                  background: url("../../assets/image/pc/buttonBack.png");
                  background-size: 100% 100%;
                }
              }
            }
            .split-line {
              width: 1px;
              height: 190px;
              background: #ffffff;
            }
            .open-line {
              margin-right: 40px;
            }
          }
        }
      }
      .single-pack {
      }
      .more-pack {
        .gift-box {
          width: 32%;
          height: 380px;
        }
      }
    }
  }
}
</style>
