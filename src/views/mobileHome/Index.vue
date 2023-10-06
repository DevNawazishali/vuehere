<i18n>
  EN:
    btnText:
      - 'BUY TOKEN'
      - 'BUY BOX'
      - 'Coming Soon!'
      - 'Coming Soon!'
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
      - 'Private Sale - 6%'
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
      <img class="banner" src="../../assets/image/mobile/banner.png" alt="" srcset="" />
      <div v-if="!isNft" class="handle-button">
        <span
          @click="openPage('https://app.arthswap.org/#/swap')"
          class="button-item token-button"
          >{{ $t("btnText[0]") }}</span
        >
        <span @click="comeBuyBox" class="button-item box-button">{{ $t("btnText[1]") }}</span>
      </div>
    </div>
    <template v-if="isNft">
      <MobileBoxPack />
    </template>
    <template v-else>
      <div class="what-bomb">
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
        <div class="bomb-content">
          <img src="../../assets/image/mobile/bomb.png" alt="" srcset="" />
          <div class="bomb-introduce">
            <span class="title">{{ $t("title[0]") }}</span>
            <span class="introduce"
              >Bomber Quest is a P2E game that allows users to generate a lot of revenue. Gamers can
              put their energy into successfully completing adventures in the game, fight to the
              death to survive in the crypto world, and earn an income from playing the game.
            </span>
            <span class="button-item token-button">{{ $t("btnText[2]") }}</span>
          </div>
        </div>
      </div>
      <div class="earn">
        <div class="all-mask"></div>
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
            <img src="../../assets/image/mobile/gameBox.png" alt="" srcset="" />
            <span class="title">{{ $t("title[2]") }}</span>
            <span class="introduce"
              >token is the main in-game currency. It will be used to buy Bomber hero at Market
              Place, Items of Upgrade Bomber level, buy House, mainly in the first phase.</span
            >
            <span class="label">{{ $t("text[3]") }}</span>
            <p class="value">{{ $t("text[4]") }}</p>
            <div class="handle-button">
              <span class="button swap-button">{{ $t("btnText[4]") }}</span>
              <span class="button swap-button" @click.stop="addMetaToken">{{ $t("btnText[5]") }}</span>
            </div>
          </div>
        </div>
        <div class="nft">
          <span class="title">{{ $t("title[3]") }}</span>
          <div class="nft-information">
            <div class="card">
              <img src="../../assets/image/mobile/boy.png" alt="" srcset="" />
              <img src="../../assets/image/mobile/girl.png" alt="" srcset="" />
            </div>
            <div class="nft-detail">
              <div class="item contract">
                <img class="mark" src="../../assets/image/mobile/markIcon.png" alt="" srcset="" />
                <span class="label">{{ $t("nftDetailLabel[0]") }}</span>
                <span class="value" style="word-break: break-all; font-size: 1.8rem">{{
                  nftAddress
                }}</span>
              </div>
              <div class="item sell">
                <img class="mark" src="../../assets/image/mobile/markIcon.png" alt="" srcset="" />
                <span class="label">{{ $t("nftDetailLabel[1]") }}</span>
                <span class="value">{{ $t("nftDetailValue[1]") }}</span>
              </div>
              <div class="item price">
                <img class="mark" src="../../assets/image/mobile/markIcon.png" alt="" srcset="" />
                <span class="label">{{ $t("nftDetailLabel[2]") }}</span>
                <span class="value">
                  <span>{{ $t("nftDetailValue[2]") }}</span>
                  <img class="ball" src="../../assets/image/mobile/ball.png" alt="" srcset="" />
                </span>
              </div>
              <div class="handle-button">
                <span @click="comeBuyBox" class="button swap-button">{{ $t("btnText[1]") }}</span>
                <span class="button metamask-button">{{ $t("btnText[6]") }}</span>
              </div>
              <!-- <span class="link">{{ $t("text[5]") }}</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="token-metric">
        <div class="all-mask"></div>
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
        <div class="metric-content">
          <span class="title">{{ $t("title[4]") }}</span>
          <span class="total-supply">
            <span class="number">1,000,000,000</span>
            <span class="label">total-supply</span>
          </span>
          <div class="chart-box">
            <img class="chart-img" src="../../assets/image/mobile/chart.png" alt="" srcset="" />
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
    <MobileFooter :isNft="isNft" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { nftAddress } from '@/setup/address';
import { addToken } from '@/hooks/nftContract';
import Partners from '../../components/Partners.vue';
import MobileFooter from '../../components/MobileFooter.vue';
import MobileBoxPack from './MobileBoxPack.vue';
import api from '../../api/api';

const name = 'home';

export default {
  name,
  components: { Partners, MobileBoxPack, MobileFooter },
  data() {
    return {
      total: '0',
      phasesAcitive: 1,
      scrollTop: 0,
      isNft: false,
      nftAddress,
    };
  },
  computed: {
    ...mapState(['account', 'isWallet']),
    activeName() {
      return this.$route.path;
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
    openPage(url) {
      window.open(url);
    },
    comeBuyBox() {
      // this.$router.push("/mobile/mobileBuyNft");
    },
    PlayNow() {
      // this.$router.push('/nft');
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
    },
    async addMetaToken() {
      await addToken('0x0c5915972759b37E5902E236AfcBC55EB68522d0', 'BBQ');
    },
  },
  mounted() {
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
  .button-item {
    display: inline-block;
    width: 300px;
    height: 75px;
    line-height: 75px;
    font-size: 1.8rem;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
  }
  .token-button {
    background: url("../../assets/image/mobile/buttonBack.png") no-repeat;
    background-size: contain;
    margin-bottom: 24px;
  }
  .box-button {
    background: url("../../assets/image/mobile/buttonBack2.png") no-repeat;
    background-size: contain;
  }
  .title {
    display: block;
    font-size: 3.2rem;
    font-family: Slackey-Regular, Slackey;
    font-weight: 400;
    color: #ffac1a;
    text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.15);
    -webkit-text-stroke: 2px #b7790c;
  }
  .introduce {
    display: block;
    font-size: 2.6rem;
    margin: 0 2rem;
    font-family: Montserrat-Medium, Montserrat;
    font-weight: 500;
    color: #ffffff;
  }

  .address-layout { width: 100% }

  .address-text {
    width: 90% !important;
    word-wrap:break-word;
    text-align: center;
  }

  .first-screen {
    width: 100%;
    height: 1334px;
    position: relative;
    background: url("../../assets/image/mobile/firstBack.png") no-repeat;
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
    .banner {
      width: 95%;
      position: absolute;
      top: 118px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
    .handle-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
  .what-bomb {
    width: 100%;
    padding-bottom: 150px;
    background: #2c1c17;
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
      text-align: center;
      position: relative;
      padding-top: 170px;
      z-index: 10;
      > img {
        width: 90%;
      }
      .bomb-introduce {
        text-align: center;
        margin-top: 60px;
        .title {
          margin-bottom: 30px;
        }
        .introduce {
          margin-bottom: 80px;
        }
      }
    }
  }
  .earn {
    width: 100%;
    height: 1334px;
    background: url("../../assets/image/mobile/earnBack.png") no-repeat;
    position: relative;
    .all-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #6e4819;
      opacity: 0.83;
    }
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 751px;
      background: linear-gradient(360deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
      z-index: 5;
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 450px;
      background: linear-gradient(180deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
      z-index: 5;
    }
    .earn-content {
      text-align: center;
      position: relative;
      padding-top: 453px;
      z-index: 10;
      .title {
        margin-bottom: 30px;
      }
      .introduce {
        margin-bottom: 85px;
      }
    }
  }
  .token-nft {
    width: 100%;
    background: #2d1600;
    padding-bottom: 150px;
    position: relative;
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 450px;
      background: linear-gradient(360deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 450px;
      background: linear-gradient(180deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
    }
    .handle-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      .button {
        width: 84%;
        height: 75px;
        line-height: 75px;
        font-size: 1.8rem;
        font-family: Slackey-Regular, Slackey;
        font-weight: 400;
        color: #ffffff;
        text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
      }
      .swap-button {
        background: url("../../assets/image/mobile/buttonLarg.png") no-repeat;
        background-size: 100% 75px;
        margin-bottom: 32px;
      }
      .metamask-button {
        background: url("../../assets/image/mobile/buttonLarg2.png") no-repeat;
        background-size: 100% 75px;
      }
    }
    .token {
      position: relative;
      padding-top: 160px;
      z-index: 10;
      .token-introduce {
        text-align: center;
        > img {
          width: 90%;
        }
        .title {
          margin-top: 60px;
          margin-bottom: 30px;
        }
        .introduce {
          margin-bottom: 30px;
        }
        .label {
          display: block;
          margin-bottom: 15px;
          font-size: 1.8rem;
          font-family: Montserrat-Medium, Montserrat;
          font-weight: 500;
          color: #ffffff;
        }
        .value {
          margin: 0 2rem 8rem 2rem;
          font-size: 2.4rem;
          font-family: Montserrat-Bold, Montserrat;
          font-weight: bold;
          color: #ffffff;
          line-height: 29px;
          word-wrap: break-word;
        }
      }
    }
    .nft {
      position: relative;
      margin-top: 155px;
      z-index: 10;
      .title {
        text-align: center;
      }
      .nft-information {
        .card {
          display: flex;
          justify-content: center;
          margin: 30px 0 30px 0;
          > img {
            width: 40%;
            &:first-child {
              margin-right: 32px;
            }
          }
        }
        .nft-detail {
          display: flex;
          flex-direction: column;
          align-items: center;
          .item {
            position: relative;
            width: 83%;
            height: 172px;
            padding: 40px;
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
              margin-bottom: 5px;
              font-size: 1.8rem;
              font-family: Montserrat-Medium, Montserrat;
              font-weight: 500;
              color: #ffffff;
              line-height: 29px;
            }
            .value {
              font-size: 2.4rem;
              font-family: Montserrat-Bold, Montserrat;
              font-weight: bold;
              color: #ffffff;
              line-height: 29px;
              .ball {
                display: inline-block;
                margin-left: 30px;
                position: relative;
                top: 5px;
                width: 30px;
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
            width: 100%;
            text-align: center;
            margin-bottom: 35px;
            .swap-button {
              margin-bottom: 30px;
            }
          }
          .link {
            display: inline-block;
            width: 631px;
            height: 140px;
            background: url("../../assets/image/mobile/link.png") no-repeat;
            background-size: contain;
            font-size: 2rem;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #471320;
            line-height: 140px;
          }
        }
      }
    }
  }
  .token-metric {
    width: 100%;
    height: 2536px;
    position: relative;
    background: url("../../assets/image/mobile/metric.png") no-repeat;
    .all-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #6e4819;
      opacity: 0.83;
    }
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 450px;
      background: linear-gradient(360deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
      z-index: 5;
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 450px;
      background: linear-gradient(180deg, rgba(15, 9, 2, 0) 0%, #0f0902 100%);
      z-index: 5;
    }
    .metric-content {
      position: relative;
      padding-top: 150px;
      z-index: 10;
      .title {
        text-align: center;
        margin-bottom: 40px;
      }
      .total-supply {
        display: block;
        padding-top: 1px;
        width: 65%;
        height: 157px;
        margin-left: 60px;
        margin-bottom: 50px;
        background: url("../../assets/image/mobile/money.png") no-repeat;
        background-size: 100% 157px;
        .number {
          display: block;
          margin-top: 40px;
          margin-left: 25%;
          font-size: 2.5rem;
          font-family: Slackey-Regular, Slackey;
          font-weight: 400;
          color: #ffffff;
          text-shadow: 3px 3px 1px rgba(255, 208, 126, 0.4);
          -webkit-text-stroke: 2px rgba(40, 3, 3, 0.1);
        }
        .label {
          display: block;
          margin-left: 30%;
          font-size: 2rem;
          font-family: Slackey-Regular, Slackey;
          font-weight: 400;
          color: #280303;
          opacity: 0.6;
        }
      }
      .chart-box {
        text-align: center;
        .chart-img {
          display: inline-block;
          width: 80%;
          margin-bottom: 50px;
        }
        .chart-legend {
          display: inline-flex;
          flex-direction: column;
          width: 84%;
          height: 1172px;
          background: linear-gradient(
            90deg,
            rgba(250, 191, 86, 0.2) 0%,
            rgba(250, 191, 86, 0.1) 100%
          );
          opacity: 1;
          border: 2px solid #fabf56;
          .legend-item {
            height: 132px;
            line-height: 132px;
            padding-left: 40px;
            border-bottom: 2px solid #fabf56;
            width: 100%;
            box-sizing: border-box;
            font-size: 2rem;
            font-family: Slackey-Regular, Slackey;
            font-weight: 400;
            color: #5383ec;
            text-align: initial;
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
