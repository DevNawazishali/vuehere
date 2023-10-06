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
          <img src="../../assets/image/mobile/gameBox.png" alt="" />
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
          <Button @click="buyPack" :loading="isPackBtn" :disabled="isPackBtn" class="buy-box-button">BUY PACK</Button>
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
          <div class="box-detail">
            <div class="box-and-des">
              <img class="red-box" src="../../assets/image/pc/redBox.png" alt="" srcset="" />
              <!-- <span class="des"
                >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor.</span
              > -->
            </div>
            <div class="box-type">
              <div class="item">
                <span class="type">Number of box's holdings</span>
                <span class="value">{{ boxNumber }}</span>
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
          <div class="box-detail">
            <div class="box-and-des">
              <img class="red-box" src="../../assets/image/pc/gift.png" alt="" srcset="" />
              <!-- <span class="des"
                >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor.</span
              > -->
            </div>
            <div class="box-type">
              <div class="item">
                <span class="type">Number of box's holdings</span>
                <span class="value">{{ boxNumber }}</span>
              </div>
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
import api from '../../api/api';

export default {
  name: '',
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
    padding-bottom: 150px;
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
      position: relative;
      z-index: 10;
      .box-img {
        width: 85%;
        text-align: center;
        margin: 0 auto;
        > img {
          width: 100%;
          position: relative;
        }
      }
      .box-des {
        width: 80%;
        margin: 0 auto;
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
          display: inline-block;
          width: 100%;
          height: 75px;
          margin-top: 75px;
          font-size: 2rem;
          font-family: Slackey-Regular, Slackey;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
          user-select: none;
          background: url("../../assets/image/mobile/buttonLarg2.png") no-repeat;
          background-size: 100% 75px;
        }
      }
    }
  }
  .open-pack {
    width: 100%;
    position: relative;
    background: url("../../assets/image/pc/metric.png") no-repeat;
    background-position-y: -230px;
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
      padding-top: 170px;
      padding-bottom: 80px;
      z-index: 10;
      .title {
        width: 100%;
        text-align: center;
        display: inline-block;
        margin-bottom: 50px;
        font-size: 2.8rem;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffac1a;
        text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
        -webkit-text-stroke: 2px #b7790c;
      }
      .pack-wrap {
        position: relative;
        display: flex;
        width: 90%;
        height: 551px;
        margin: 0 auto;
        background: linear-gradient(
          90deg,
          rgba(250, 191, 86, 0.3) 0%,
          rgba(250, 191, 86, 0.1) 100%
        );
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        border: 2px solid #fabf56;
        .mark-icon {
          position: absolute;
          right: 40px;
          top: 40px;
        }
        .box-detail {
          width: 100%;
          display: inline-block;
          box-sizing: border-box;
          .box-and-des {
            display: flex;
            margin-bottom: 40px;
            .red-box {
              width: 208px;
              margin-right: 30px;
            }
            .des {
              display: block;
              font-size: 1.5rem;
              font-family: Poppins-Light, Poppins;
              font-weight: 300;
              color: rgba(255, 243, 203, 0.7);
              line-height: 21px;
              padding-top: 120px;
            }
          }
          .box-type {
            margin-left: 10px;
            .item {
              .type {
                display: block;
                font-size: 18px;
                font-family: Playfair Display-Regular, Playfair Display;
                font-weight: 400;
                color: rgba(255, 243, 203, 0.7);
              }
              .value {
                display: block;
                width: 140px;
                font-size: 21px;
                font-family: Poppins-Medium, Poppins;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
              }
              .handle-area {
                display: inline-flex;
                align-items: center;
                .number {
                  width: 98px;
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
                  width: 180px;
                  height: 53px;
                  font-size: 2rem;
                  font-family: Slackey-Regular, Slackey;
                  font-weight: 400;
                  color: #ffffff;
                  text-align: center;
                  text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
                  user-select: none;
                  background: url("../../assets/image/pc/buttonBack.png") no-repeat;
                  background-size: contain;
                }
              }
              .form-item {
                margin-bottom: 15px;
                .label {
                  width: 120px;
                  text-align: left;
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
                text-align: center;
                font-size: 15px;
                outline: none;
                background: #461f1f;
                color: #fff784;
                border-radius: 8px 8px 8px 8px;
                opacity: 1;
                border: 1px solid #c79b34;
              }
            }
          }
        }
      }
      .single-pack {
        margin-bottom: 80px;
      }
      .more-pack {
      }
    }
  }
}
</style>
