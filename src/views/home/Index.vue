<i18n>
  EN:
    btnText:
      - 'BUY TOKEN'
      - 'BUY BOX'
      - 'Coming Soon!'
      - 'coming soon!'
      - 'Go Swap'
      - 'ADD TO METAMASK'
      - 'BUY NFT ON MARKET'
    text:
      - 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.'
      - 'Manage heroes, explore the world together, defeat monsters and bosses to free kingdoms under attack by monsters, and get tokens.'
      - 'token is the main in-game currency.It will be used to buy Bomber hero, Upgrade Bomber level, mainly in the first phase.'
      - 'Token Official Contract Address:'
      - '0x0c5915972759b37E5902E236AfcBC55EB68522d0'
      - 'COPY 10% REFERRAL LINK'
    title:
      - 'What is Bomb?'
      - 'Play To Earn'
      - 'What is $BBQ'
      - 'NFT Information'
      - 'Token Metric'
    nftDetailLabel:
      - 'NFT Contract:'
      - 'NFT Total Sells:'
      - 'NFT Price:'
    nftDetailValue:
      - '0x000'
      - '0'
      - '80 USDC'
  JP:
</i18n>
<template>
  <div class="home" id="home">
    <div class="first-screen">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <img class="banner" src="../../assets/image/pc/banner.png" alt="" srcset="" />
      <div v-if="!isNft" class="handle-button">
        <span
          @click="openPage('https://app.arthswap.org/#/swap')"
          class="button-item token-button"
          >{{ $t("btnText[0]") }}</span
        >
        <span @click="comeBuyBox" class="button-item box-button">{{ $t("btnText[1]") }}</span>
      </div>
      <div class="wallet">
        <span v-if="isWallet" @mouseenter="enterAddress" class="address-name">{{
          addressHandle
        }}</span>
        <template v-else>
          <img @click="ConnectWallet" src="../../assets/image/pc/wallet.png" alt="" srcset="" />
          <!-- <span class="line"></span> -->
        </template>
        <div
          class="wallet-list"
          @blur="blurWalletList"
          tabindex="-1"
          ref="walletList"
          v-show="walletList"
          @mouseleave="blurWalletList"
        >
          <span @click="exitWallet" class="item">Disconnect</span>
          <span @click="copyAddress" class="item">Copy</span>
        </div>
      </div>
    </div>
    <template v-if="isNft">
      <BoxPack :address="account" />
    </template>
    <template v-else>
      <div class="what-bomb">
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
        <div class="bomb-content">
          <img class="bomb" src="../../assets/image/pc/bomb.png" alt="" srcset="" />
          <div class="bomb-introduce">
            <span class="title">{{ $t("title[0]") }}</span>
            <span class="introduce"
              >Bomber Quest is a P2E game that allows users to generate a lot of revenue. Gamers can
              put their energy into successfully completing adventures in the game, fight to the
              death to survive in the crypto world, and earn an income from playing the game.</span
            >
            <span class="button-item token-button">{{ $t("btnText[2]") }}</span>
          </div>
        </div>
      </div>
      <div class="earn">
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
        <div class="earn-content">
          <span class="title">{{ $t("title[1]") }}</span>
          <span class="introduce"
            >Manage heroes, explore the world together, defeat monsters and bosses to free kingdoms
            under attack by monsters, and get tokens.</span
          >
          <span class="button-item token-button">{{ $t("btnText[3]") }}</span>
        </div>
      </div>
      <div class="token-nft">
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
        <div class="token">
          <div class="token-introduce">
            <span class="title">{{ $t("title[2]") }}</span>
            <pre class="introduce">
Token is the main in-game currency.
It will be used to buy Bomber hero at Market Place,
Items of Upgrade Bomber level, buy House, mainly
in the first phase.
            </pre>
            <span class="label">{{ $t("text[3]") }}</span>
            <span class="value">{{ $t("text[4]") }}</span>
            <div class="handle-button">
              <span class="button-item token-button">{{ $t("btnText[4]") }}</span>
              <span @click="addMetaToken" class="button-item large-button">{{
                $t("btnText[5]")
              }}</span>
            </div>
          </div>
          <img class="game-box" src="../../assets/image/pc/gameBox.png" alt="" srcset="" />
        </div>
        <div class="nft">
          <span class="title">{{ $t("title[3]") }}</span>
          <div class="nft-information">
            <div class="card">
              <img src="../../assets/image/pc/boy.png" alt="" srcset="" />
              <img src="../../assets/image/pc/girl.png" alt="" srcset="" />
            </div>
            <div class="nft-detail">
              <div class="item contract">
                <img class="mark" src="../../assets/image/pc/markIcon.png" alt="" srcset="" />
                <span class="label">{{ $t("nftDetailLabel[0]") }}</span>
                <span class="value">{{ nftAddress }}</span>
              </div>
              <div class="item sell">
                <img class="mark" src="../../assets/image/pc/markIcon.png" alt="" srcset="" />
                <span class="label">{{ $t("nftDetailLabel[1]") }}</span>
                <span class="value">{{ $t("nftDetailValue[1]") }}</span>
              </div>
              <div class="item price">
                <img class="mark" src="../../assets/image/pc/markIcon.png" alt="" srcset="" />
                <span class="label">{{ $t("nftDetailLabel[2]") }}</span>
                <span class="value">
                  <span>{{ $t("nftDetailValue[2]") }}</span>
                  <img class="ball" src="../../assets/image/pc/ball.png" alt="" srcset="" />
                </span>
              </div>
              <div class="handle-button">
                <span @click="comeBuyBox" class="button-item token-button">{{
                  $t("btnText[1]")
                }}</span>
                <span class="button-item large-button">{{ $t("btnText[6]") }}</span>
              </div>
              <!-- <span class="link">
                <span>{{ $t("text[5]") }}</span>
                <img class="icon" src="../../assets/image/pc/linkIcon.png" alt="" srcset="" />
              </span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="token-metric">
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
        <div class="metric-content">
          <span class="title">{{ $t("title[4]") }}</span>
          <span class="total-supply">
            <img src="../../assets/image/pc/money.png" alt="" srcset="" />
            <div class="supply">
              <span class="number">1,000,000,000</span>
              <span class="label">total-supply</span>
            </div>
          </span>
          <div class="chart-box">
            <img src="../../assets/image/pc/chart.png" alt="" srcset="" />
            <div class="chart-legend">
              <span class="legend-item blue">Private Sale - 6%</span>
              <span class="legend-item red">IDO - 2%</span>
              <span class="legend-item yellow">DEX Liquidity - 1%</span>
              <span class="legend-item green">Play to Earn - 20%</span>
              <span class="legend-item orange">Staking Reward - 20%</span>
              <span class="legend-item Cyan">Ecosystem Fund - 6%</span>
              <span class="legend-item deepBlue">Team - 25%</span>
              <span class="legend-item pink">Advisor - 3%</span>
              <span class="legend-item purple">Reserves - 12%</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <Partners /> -->
    </template>
    <Footer />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { tip } from '@/utils/utils';
import { nftAddress } from '@/setup/address';
import Partners from '../../components/Partners.vue';
import Footer from '../../components/Footer.vue';
import BoxPack from './BoxPack.vue';
import { addToken } from '@/hooks/nftContract';
import api from '../../api/api';

const name = 'home';

export default {
  name,
  components: { Partners, BoxPack, Footer },
  data() {
    return {
      total: '0',
      phasesAcitive: 1,
      scrollTop: 0,
      isNft: false,
      walletList: false,
      nftAddress,
    };
  },
  computed: {
    ...mapState(['account', 'isWallet']),
    activeName() {
      return this.$route.path;
    },
    addressHandle() {
      const { account } = this;
      if (account) {
        const firstStr = account.slice(0, 6);
        const endStr = account.slice(-4);
        return `${firstStr}...${endStr}`;
      }
      return '';
    },
  },
  watch: {
    $route: {
      handler(n, o) {
        if (n.name === 'nft') {
          const _code = n.query.code;
          sessionStorage.setItem('code', _code);
          api.checkCode({ code: _code }).then((res) => {
            if (res) {
              this.isNft = true;
            } else {
              this.isNft = false;
            }
          });
        } else {
          this.isNft = false;
        }
      },
      immediate: true,
    },
  },
  methods: {
    async addMetaToken() {
      await addToken('0x0c5915972759b37E5902E236AfcBC55EB68522d0', 'BBQ');
    },
    openPage(url) {
      window.open(url);
    },
    comeBuyBox() {
      // this.$router.push("/buyNft");
    },
    PlayNow() {
      // this.$router.push('/nft');
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
    },
    blurWalletList() {
      this.walletList = false;
    },
    enterAddress() {
      this.walletList = true;
      this.$nextTick(() => {
        this.$refs.walletList.focus();
      });
    },
    copyAddress() {
      const textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', 'readonly');
      textarea.value = this.account;
      document.body.appendChild(textarea);
      textarea.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        tip('Copy successfully');
      }
      document.body.removeChild(textarea);
    },
    exitWallet() {
      this.DisconnectWallet();
      this.$refs.walletList.blur();
    },
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  font-size: 1.8rem;
  overflow: auto;
  .button-item {
    display: inline-block;
    width: 201px;
    height: 59px;
    font-size: 2rem;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 59px;
    text-shadow: 0 2px 3px rgba(34, 25, 5, 0.52);
    cursor: pointer;
    user-select: none;
  }
  .token-button {
    background: url("../../assets/image/pc/buttonBack.png");
    margin-right: 24px;
  }
  .box-button {
    background: url("../../assets/image/pc/buttonBack2.png");
  }
  .title {
    display: block;
    font-size: 60px;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffac1a;
    text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
    -webkit-text-stroke: 2px #b7790c;
  }
  .introduce {
    display: block;
    width: 375px;
    font-size: 18px;
    font-family: Montserrat-Medium, Montserrat;
    font-weight: 500;
    color: #ffffff;
    line-height: 29px;
  }
  .first-screen {
    width: 100%;
    height: 1200px;
    position: relative;
    background: url("../../assets/image/pc/firstBack.png") no-repeat;
    background-size: cover;
    .wallet {
      position: absolute;
      width: 138px;
      right: 50px;
      top: 150px;
      display: flex;
      align-items: center;
      > img {
        position: absolute;
        right: 100px;
      }
      .address-name {
        width: 100%;
        height: 52px;
        line-height: 52px;
        background: url("../../assets/image/pc/menuBack.png") no-repeat;
        background-size: 100%;
        text-align: center;
        font-size: 1.6rem;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffac1a;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .line {
        display: inline-block;
        width: 294px;
        height: 5px;
        background: linear-gradient(270deg, rgba(255, 144, 29, 0) 0%, #ff901d 100%);
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
      }
      .wallet-list {
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        outline: none;
        z-index: 10;
        .item {
          width: 100%;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          border-radius: 4px;
          border: 1px solid #ffac1a;
          border-color: transparent;
          font-weight: 400;
          color: #ffac1a;
          &:hover {
            border-color: #ffac1a;
          }
        }
      }
    }
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
    .banner {
      position: absolute;
      width: 60%;
      top: 150px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
    .handle-button {
      position: absolute;
      bottom: 200px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .what-bomb {
    width: 100%;
    height: 1080px;
    background: #2c1c17;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    position: relative;
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 450px;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 450px;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .bomb-content {
      display: flex;
      justify-content: center;
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      .bomb {
        width: 36%;
      }
      .bomb-introduce {
        margin-left: 121px;
        .title {
          margin-bottom: 40px;
        }
        .introduce {
          margin-bottom: 60px;
        }
      }
    }
  }
  .earn {
    width: 100%;
    height: 1312px;
    background: url("../../assets/image/pc/earnBack.png") no-repeat;
    background-size: cover;
    position: relative;
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
    .earn-content {
      position: absolute;
      top: 58%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 10;
      .title {
        margin-bottom: 24px;
      }
      .introduce {
        margin-bottom: 50px;
        width: 500px;
        text-align: center;
      }
    }
  }
  .token-nft {
    width: 100%;
    height: 2078px;
    background: #2c1c17;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    position: relative;
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 450px;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 711px;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
    }
    .token {
      position: relative;
      display: flex;
      justify-content: center;
      padding-top: 160px;
      z-index: 10;
      .token-introduce {
        margin-right: 12px;
        .title {
          margin-bottom: 38px;
        }
        .introduce {
          margin-bottom: 20px;
        }
        .label {
          display: block;
          margin-bottom: 10px;
          font-size: 18px;
          font-family: Montserrat-Medium, Montserrat;
          font-weight: 500;
          color: #ffffff;
          line-height: 29px;
          opacity: 0.6;
        }
        .value {
          display: block;
          margin-bottom: 50px;
          font-size: 24px;
          font-family: Montserrat-Bold, Montserrat;
          font-weight: bold;
          color: #ffffff;
          line-height: 29px;
        }
        .large-button {
          width: 281px;
          background: url("../../assets/image/pc/buttonBack.png");
          background-size: 100% 100%;
        }
      }
      .game-box {
        width: 36%;
      }
    }
    .nft {
      position: relative;
      width: 100%;
      margin-top: 155px;
      z-index: 10;
      .title {
        margin-left: 14%;
        margin-bottom: 78px;
      }
      .nft-information {
        display: flex;
        justify-content: center;
        width: 100%;
        .card {
          display: flex;
          flex-direction: column;
          margin-right: 4%;
          > img:first-child {
            margin-bottom: 46px;
          }
        }
        .nft-detail {
          width: 56%;
          .item {
            position: relative;
            width: 100%;
            height: 187px;
            padding: 48px 2rem 0 75px;
            margin-top: 32px;
            box-sizing: border-box;
            background: linear-gradient(
              90deg,
              rgba(250, 191, 86, 0.2) 0%,
              rgba(250, 191, 86, 0.1) 100%
            );
            border-radius: 0px 0px 0px 0px;
            opacity: 1;
            border: 2px solid #fabf56;
            .mark {
              position: absolute;
              top: 30px;
              right: 30px;
            }
            .label {
              display: block;
              margin-bottom: 25px;
              font-size: 18px;
              font-family: Montserrat-Medium, Montserrat;
              font-weight: 500;
              color: #ffffff;
              line-height: 29px;
              opacity: 0.6;
            }
            .value {
              font-size: 24px;
              font-family: Montserrat-Bold, Montserrat;
              font-weight: bold;
              color: #ffffff;
              line-height: 29px;
              word-wrap: break-word;
              .ball {
                display: inline-block;
                margin-left: 30px;
                position: relative;
                top: 20px;
                width: 60px;
                height: 60px;
              }
            }
          }
          .price {
            margin-bottom: 45px;
            .label {
              margin-bottom: 5px;
            }
          }
          .handle-button {
            float: right;
            margin-bottom: 24px;
            .large-button {
              width: 281px;
              background: url("../../assets/image/pc/buttonLarg.png");
            }
          }
          .link {
            position: relative;
            display: block;
            clear: both;
            float: right;
            width: 498px;
            height: 63px;
            background: url("../../assets/image/pc/linkBack.png");
            font-size: 20px;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #471320;
            text-align: center;
            line-height: 63px;
            .icon {
              position: absolute;
              width: 69px;
              height: 45px;
              bottom: 4px;
              right: 9px;
            }
          }
        }
      }
    }
  }
  .token-metric {
    width: 100%;
    height: 2048px;
    position: relative;
    background: url("../../assets/image/pc/metric.png") no-repeat;
    background-size: cover;
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
    .metric-content {
      position: relative;
      padding-top: 156px;
      z-index: 10;
      .title {
        text-align: center;
      }
      .total-supply {
        display: flex;
        width: 40%;
        height: 174px;
        margin-top: 136px;
        margin-left: 370px;
        background: url("../../assets/image/pc/total.png") no-repeat;
        background-size: contain;
        > img {
          position: relative;
          top: -57px;
          left: -175px;
          width: 261px;
          height: 244px;
        }
        .supply {
          position: relative;
          left: -165px;
          top: 30px;
          .number {
            display: block;
            font-size: 5rem;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #ffffff;
            text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.4);
            -webkit-text-stroke: 2px rgba(40, 3, 3, 0.1);
          }
          .label {
            display: block;
            margin-left: 40px;
            font-size: 2rem;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #280303;
            opacity: 0.6;
          }
        }
      }
      .chart-box {
        display: flex;
        justify-content: center;
        margin-top: 90px;
        > img {
          display: inline-block;
          width: 39%;
          height: 50%;
        }
        .chart-legend {
          display: inline-flex;
          flex-direction: column;
          width: 35%;
          height: 1172px;
          margin-left: 3%;
          background: linear-gradient(
            90deg,
            rgba(250, 191, 86, 0.2) 0%,
            rgba(250, 191, 86, 0.1) 100%
          );
          border-radius: 0px 0px 0px 0px;
          opacity: 1;
          border: 2px solid #fabf56;
          .legend-item {
            height: 132px;
            border-bottom: 2px solid #fabf56;
            width: 100%;
            box-sizing: border-box;
            font-size: 30px;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #5383ec;
            padding-left: 45px;
            line-height: 132px;
            &:last-child {
              border: none;
            }
          }
          .red {
            color: #d85140;
          }
          .yellow {
            color: #f1bf42;
          }
          .green {
            color: #58a65c;
          }
          .orange {
            color: #ed762f;
          }
          .Cyan {
            color: #69bbc4;
          }
          .deepBlue {
            color: #85a9f1;
          }
          .pink {
            color: #e18176;
          }
          .purple {
            color: #7e52f3;
          }
        }
      }
    }
  }
}
</style>
