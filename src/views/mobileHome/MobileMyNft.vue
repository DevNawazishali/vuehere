<i18n>
  EN:
  JP:
</i18n>
<template>
  <div class="my-nft">
    <div class="first-screen">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="bottom-back"></div>
      <div class="my-nft-content">
        <div class="title">
          <img src="../../assets/image/mobile/prevPage.png" alt="" srcset="" />
          <span class="name">My NFT</span>
          <img src="../../assets/image/mobile/nextPage.png" alt="" srcset="" />
        </div>
        <div @click="showList" class="classification">
          <span class="current-type">{{
            filterNftLevel === "all" ? "All Cards" : levelList[Number(filterNftLevel)]
          }}</span>
          <div
            v-show="nftTypeList"
            class="nft-type-list"
            tabindex="-1"
            ref="nftTypeList"
            @blur="blurList"
          >
            <span @click="filterNft('all')" class="nft-item">All Cards</span>
            <span @click="filterNft('0')" class="nft-item">COMMON</span>
            <span @click="filterNft('1')" class="nft-item">RARE</span>
            <span @click="filterNft('2')" class="nft-item">SUPER RARE</span>
            <span @click="filterNft('3')" class="nft-item">EPIC</span>
            <span @click="filterNft('4')" class="nft-item">LEGEND</span>
            <span @click="filterNft('5')" class="nft-item">SUPER LEGEND</span>
          </div>
        </div>
        <div class="nft-card-panel">
          <template v-if="nftDetalStatus">
            <div class="detail-box">
              <div @click="backCardList" class="handle-line">
                <img src="../../assets/image/pc/backIcon.png" alt="" srcset="" />
                <span>back</span>
              </div>
              <div class="detail">
                <img class="card-img" :src="currentNftCard.urlSuf" alt="" srcset="" />
                <div class="field-handle">
                  <section class="item">
                    <span class="label">NFT ID</span>
                    <span class="value">{{ currentNftCard.id }}</span>
                  </section>
                  <section class="item">
                    <span class="label">Own</span>
                    <span class="value">{{ address }}</span>
                  </section>
                  <section class="item">
                    <span class="label">Stake</span>
                    <span class="value">NO</span>
                  </section>
                  <!-- <section class="item">
                    <span class="label">Mining Power</span>
                    <span class="value">0</span>
                  </section> -->
                  <section class="item">
                    <span class="label">level</span>
                    <span class="value">{{ getCardLevel }}</span>
                  </section>
                  <div class="handle-group">
                    <span @click="handleNft('earn')" class="button earn">Earn</span>
                    <span @click="handleNft('transfer')" class="button transfer">Transfer</span>
                    <span @click="handleNft('sell')" class="button sell">Sell</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="card-list">
              <img
                @click="nftDetail(item)"
                v-for="item in cuttentCardList"
                :key="item.id"
                :src="item.urlSuf"
                alt=""
              />
            </div>
          </template>
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
        <div :class="['content-wrap', modalFlag === 'sell' && 'sell-wrap']">
          <template v-if="modalFlag === 'transfer'">
            <span class="title">Transfer</span>
            <!-- <span class="item-line">
              <span class="label">Mining Power</span>
              <span class="value">0</span>
            </span> -->
            <span class="item-line">
              <span class="label">Address</span>
              <span class="value">
                <input type="text" class="address" v-model="userAddress" />
              </span>
            </span>
          </template>
          <template v-if="modalFlag === 'sell'">
            <span class="title">Sell</span>
            <span class="item-line">
              <span class="label">name</span>
              <span class="value">NFT NAME</span>
            </span>
            <span class="item-line">
              <span class="label">Mining Power</span>
              <span class="value">100</span>
            </span>
            <span class="item-line">
              <span class="label">Price</span>
              <span class="value">
                <input type="text" class="address sell-input" value="123" />
                <span>BUSD</span>
              </span>
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
import { tip } from "@/utils/utils";
import { onConnect } from "../../hooks/useWallte";
import { getUserTokens, transfer } from "../../hooks/nftContract";

const name = "home";

export default {
  name,
  components: {},
  data() {
    return {
      total: "0",
      phasesAcitive: 1,
      scrollTop: 0,
      modalStatus: false,
      nftDetalStatus: false,
      modalFlag: "",
      cardList: [],
      currentNftCard: null,
      address: "",
      filterNftLevel: "all",
      levelList: ["COMMON", "RARE", "SUPER RARE", "EPIC", "LEGEND", "SUPER LEGEND"],
      userAddress: "",
      nftTypeList: false,
    };
  },
  computed: {
    ...mapState(["account", "isWallet"]),
    activeName() {
      return this.$route.path;
    },
    getCardLevel() {
      const { currentNftCard, levelList } = this;
      return levelList[Number(currentNftCard.quality)];
    },
    cuttentCardList() {
      const { cardList, filterNftLevel, levelList } = this;
      if (filterNftLevel !== "all") {
        return cardList.filter((item) => item.quality === filterNftLevel);
      }
      return cardList;
    },
  },
  methods: {
    closeModal() {
      this.modalStatus = false;
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
    },
    nftDetail(item) {
      this.currentNftCard = item;
      this.nftDetalStatus = true;
    },
    handleNft(flag) {
      if (flag === "earn" || flag === "sell") return;
      this.modalStatus = true;
      this.modalFlag = flag;
    },
    backCardList() {
      this.nftDetalStatus = false;
    },
    async confirmModal() {
      const { currentNftCard, userAddress } = this;
      const testAddress = /^0[xX][0-9a-fA-F]{40}$/;
      if (testAddress.test(userAddress)) {
        await transfer(currentNftCard.id, userAddress);
        tip("Success");
      } else {
        tip("Address error");
      }
    },
    filterNft(type) {
      this.filterNftLevel = type;
      this.nftDetalStatus = false;
      this.blurList();
    },
    showList() {
      this.nftTypeList = true;
      this.$nextTick(() => {
        this.$refs.nftTypeList.focus();
      });
    },
    blurList() {
      this.nftTypeList = false;
    },
  },
  async mounted() {
    const userData = await getUserTokens();
    console.log("==============", userData);
    this.cardList = userData;
    this.address = await onConnect();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
};
</script>
<style scoped lang="less">
.my-nft {
  position: relative;
  width: 100%;
  font-size: 1.8rem;
  overflow: auto;
  .first-screen {
    width: 100%;
    padding-bottom: 70px;
    position: relative;
    background: url("../../assets/image/pc/firstBack.png") no-repeat;
    .mask-top {
      width: 100%;
      position: absolute;
      top: 0;
      height: 50%;
      background: linear-gradient(360deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
      z-index: 5;
    }
    .mask-bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 50%;
      background: linear-gradient(180deg, rgba(19, 13, 11, 0) 0%, #130d0b 100%);
      z-index: 5;
    }
    .bottom-back {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 280px;
      background: #2c1c17;
    }
    .my-nft-content {
      position: relative;
      z-index: 10;
      padding-top: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        display: flex;
        justify-content: center;
        margin-bottom: 18px;
        .name {
          display: inline-block;
          margin: 0 45px;
          font-size: 3rem;
          font-family: Playfair Display-Bold, Playfair Display;
          font-weight: bold;
          color: #ffffff;
        }
      }
      .classification {
        position: relative;
        width: 200px;
        height: 41px;
        background: linear-gradient(180deg, #280303 0%, #512f2f 51%, #280303 100%);
        border-radius: 5px 5px 5px 5px;
        opacity: 1;
        border: 3px solid #280303;
        font-size: 16px;
        font-family: Playfair Display-Bold, Playfair Display;
        font-weight: bold;
        color: #fabf56;
        line-height: 41px;
        margin-left: auto;
        margin-right: 20px;
        .current-type {
          width: 100%;
          display: inline-block;
          box-sizing: border-box;
          padding-left: 35px;
        }
        .nft-type-list {
          position: absolute;
          top: 50px;
          width: 100%;
          outline: none;
          border-radius: 4px;
          .nft-item {
            display: block;
            padding-left: 32px;
            height: 41px;
            line-height: 41px;
            font-weight: bold;
            font-size: 16px;
            font-family: Playfair Display-Bold, Playfair Display;
            background: linear-gradient(180deg, #280303 0%, #512f2f 51%, #280303 100%);
            color: #fabf56;
            border-bottom: 1px solid;
          }
        }
      }
      .nft-card-panel {
        display: flex;
        justify-content: center;
        width: 95%;
        height: 1113px;
        box-sizing: border-box;
        background: url("../../assets/image/mobile/nftBack.png") no-repeat;
        background-size: 100% 1113px;
        .detail-box {
          width: 90%;
          margin-top: 80px;
          .handle-line {
            display: flex;
            align-items: center;
            margin-left: 40px;
            height: 29px;
            font-size: 1.8rem;
            font-family: Poppins-Bold, Poppins;
            font-weight: bold;
            color: #5d311c;
            line-height: 29px;
            cursor: pointer;
            > img {
              display: inline-block;
              margin-right: 15px;
            }
          }
          .detail {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            > img {
              width: 60%;
            }
          }
          .field-handle {
            width: 100%;
            padding-top: 75px;
            box-sizing: border-box;
            padding-left: 40px;
            .item {
              margin-bottom: 18px;
              display: flex;
              align-items: center;
              .label {
                display: inline-block;
                width: 20%;
                font-size: 2rem;
                font-family: Playfair Display-Regular, Playfair Display;
                font-weight: 400;
                color: #5d311c;
              }
              .value {
                display: inline-block;
                width: 75%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 2rem;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #4a4a4a;
              }
            }
            .handle-group {
              margin-top: 20px;
              text-align: center;
              .button {
                display: inline-block;
                width: 200px;
                height: 52px;
                font-size: 2rem;
                font-family: Slackey-Regular, Slackey;
                font-weight: 400;
                color: #199aaa;
                text-align: center;
                line-height: 52px;
                cursor: pointer;
                user-select: none;
                background: url("../../assets/image/mobile/modalButton.png") no-repeat;
                background-size: contain;
                margin-right: 24px;
                margin-bottom: 12px;
              }
            }
          }
        }
        .card-list {
          width: 90%;
          max-height: calc(100% - 120px);
          margin-top: 80px;
          overflow-y: auto;
          box-sizing: border-box;
          padding: 0 6%;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: center;
          > img {
            display: inline-block;
            margin-right: 12%;
            margin-bottom: 36px;
            width: 44%;
            // max-height: 77px;
            cursor: pointer;
            &:nth-of-type(2n) {
              margin-right: 0;
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
      width: 90%;
      height: 755px;
      background: url("../../assets/image/mobile/modalBack.png") no-repeat;
      background-size: 100% 755px;
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
        display: flex;
        margin-top: 60px;
        flex-direction: column;
        align-items: center;
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
          width: 70%;
          margin-bottom: 8px;
          text-align: initial;
          .label {
            display: block;
            width: 50%;
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
            .address {
              width: 80%;
              height: 48px;
              background: #461f1f;
              border-radius: 8px 8px 8px 8px;
              opacity: 1;
              border: 1px solid #c79b34;
              font-family: Segoe UI-Regular, Segoe UI;
              font-weight: 400;
              color: #fff784;
              outline: none;
            }
            .sell-input {
              display: inline-block;
              width: 120px;
              margin-right: 12px;
            }
          }
        }
        .handle-button {
          width: 100%;
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .button-item {
            display: inline-block;
            width: 25%;
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
            background-size: 100% 51px;
          }
          .confirm-button {
            height: 52px;
            line-height: 52px;
            color: #199aaa;
            background: url("../../assets/image/pc/modalButton.png") no-repeat;
            background-size: 100% 51px;
          }
        }
      }
      .sell-wrap {
        .item-line {
          width: 50%;
          margin-left: 30%;
        }
      }
    }
  }
}
</style>
