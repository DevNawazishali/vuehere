<i18n>
  EN:
  JP:
</i18n>
<template>
  <div class="my-nft">
    <div class="first-screen">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
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
      <div class="my-nft-content">
        <div class="title">
          <img src="../../assets/image/pc/prevPage.png" alt="" srcset="" />
          <span class="name">My NFT</span>
          <img src="../../assets/image/pc/nextPage.png" alt="" srcset="" />
        </div>
        <div class="classification">
          <span
            @click="filterNft('all')"
            :class="['nft-item', filterNftLevel === 'all' && 'active-nft-type']"
            >All Cards</span
          >
          <span
            @click="filterNft('0')"
            :class="['nft-item', filterNftLevel === '0' && 'active-nft-type']"
            >COMMON</span
          >
          <span
            @click="filterNft('1')"
            :class="['nft-item', filterNftLevel === '1' && 'active-nft-type']"
            >RARE</span
          >
          <span
            @click="filterNft('2')"
            :class="['nft-item', filterNftLevel === '2' && 'active-nft-type']"
            >SUPER RARE</span
          >
          <span
            @click="filterNft('3')"
            :class="['nft-item', filterNftLevel === '3' && 'active-nft-type']"
            >EPIC</span
          >
          <span
            @click="filterNft('4')"
            :class="['nft-item', filterNftLevel === '4' && 'active-nft-type']"
            >LEGEND</span
          >
          <span
            @click="filterNft('5')"
            :class="['nft-item', filterNftLevel === '5' && 'active-nft-type']"
            >SUPER LEGEND</span
          >
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
    <div class="modal" v-show="compoundNft">
      <div class="modal-content modal-content-big">
        <img
          @click="closeCompoundModal"
          class="close-icon"
          src="../../assets/image/pc/modalClose.png"
          alt=""
          srcset=""
        />
        <div class="content-wrap">
          <span class="title">Compound</span>
          <div class="compound-card">
            <div class="nft-card-item">
              <img src="../../assets/image/pc/NFTCard1.png" alt="" />
              <span class="name">NFT Name</span>
            </div>
            <img class="plus-icon" src="../../assets/image/pc/plus.png" alt="" />
            <div class="nft-card-item">
              <img src="../../assets/image/pc/NFTCard2.png" alt="" />
              <span class="name">NFT Name</span>
            </div>
            <img class="plus-icon" src="../../assets/image/pc/plus.png" alt="" />
            <div class="nft-card-item">
              <img src="../../assets/image/pc/NFTCard3.png" alt="" />
              <span class="name">NFT Name</span>
            </div>
            <img class="plus-icon" src="../../assets/image/pc/plus.png" alt="" />
            <div class="nft-card-item">
              <img src="../../assets/image/pc/NFTCard4.png" alt="" />
              <span class="name">NFT Name</span>
            </div>
            <img class="plus-icon" src="../../assets/image/pc/equalIcon.png" alt="" />
            <div class="nft-card-item">
              <img src="../../assets/image/pc/NFTCard5.png" alt="" />
              <span class="name">NFT Name</span>
            </div>
          </div>
          <div class="handle-button">
            <span class="button-item confirm-button">Compound</span>
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
      compoundNft: false,
      modalFlag: "",
      cardList: [],
      currentNftCard: null,
      address: "",
      filterNftLevel: "all",
      levelList: ["COMMON", "RARE", "SUPER RARE", "EPIC", "LEGEND", "SUPER LEGEND"],
      userAddress: "",
      walletList: false,
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
    addressHandle() {
      const { account } = this;
      if (account) {
        const firstStr = account.slice(0, 6);
        const endStr = account.slice(-4);
        return `${firstStr}...${endStr}`;
      }
      return "";
    },
  },
  methods: {
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
      const textarea = document.createElement("textarea");
      textarea.setAttribute("readonly", "readonly");
      textarea.value = this.account;
      document.body.appendChild(textarea);
      textarea.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        tip("Copy successfully");
      }
      document.body.removeChild(textarea);
    },
    exitWallet() {
      this.DisconnectWallet();
      this.$refs.walletList.blur();
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
    },
    handleNft(flag) {
      if (flag === "earn" || flag === "sell") return;
      this.modalStatus = true;
      this.modalFlag = flag;
    },
    closeModal() {
      this.modalStatus = false;
    },
    nftDetail(item) {
      this.currentNftCard = item;
      this.nftDetalStatus = true;
    },
    backCardList() {
      this.nftDetalStatus = false;
    },
    closeCompoundModal() {
      this.compoundNft = false;
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
      await transfer(currentNftCard.id, userAddress);
    },
    filterNft(type) {
      this.nftDetalStatus = false;
      this.filterNftLevel = type;
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
    height: 1150px;
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
      z-index: 20;
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
          font-size: 6rem;
          font-family: Playfair Display-Bold, Playfair Display;
          font-weight: bold;
          color: #ffffff;
        }
      }
      .classification {
        display: flex;
        height: 38px;
        margin-bottom: 25px;
        background: linear-gradient(180deg, #280303 0%, #512f2f 51%, #280303 100%);
        border-radius: 5px 5px 5px 5px;
        opacity: 1;
        border: 3px solid #280303;
        .nft-item {
          width: 190px;
          height: 38px;
          font-size: 1.6rem;
          font-family: Playfair Display-Bold, Playfair Display;
          font-weight: bold;
          color: #fabf56;
          line-height: 38px;
          text-align: center;
          border-right: 1px solid rgba(255, 243, 203, 0.7);
          cursor: pointer;
          &:last-child {
            border: none;
          }
        }
        .active-nft-type {
          background: #130404;
        }
      }
      .nft-card-panel {
        width: 1315px;
        height: 695px;
        padding: 76px 16px 104px 73px;
        box-sizing: border-box;
        background: url("../../assets/image/pc/nftBack.png") no-repeat;
        background-size: contain;
        .detail-box {
          margin-left: 70px;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          .handle-line {
            display: flex;
            align-items: center;
            margin-bottom: 70px;
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
            align-items: center;
            margin-top: 20px;
            > .card-img {
              width: 371px;
              height: 297px;
            }
          }
          .field-handle {
            margin-left: 47px;
            .item {
              margin-bottom: 18px;
              display: flex;
              align-items: center;
              .label {
                display: inline-block;
                width: calc(20% - 20px);
                margin-right: 20px;
                font-size: 2rem;
                font-family: Playfair Display-Regular, Playfair Display;
                font-weight: 400;
                color: #5d311c;
              }
              .value {
                display: inline-block;
                width: 80%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 2rem;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #4a4a4a;
              }
            }
            .handle-group {
              margin-top: 60px;
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
                text-shadow: 0px 2px 3px rgba(34, 25, 5, 0.52);
                cursor: pointer;
                user-select: none;
                background: url("../../assets/image/pc/modalButton.png") no-repeat;
                background-size: contain;
                margin-right: 24px;
              }
            }
          }
        }
        .card-list {
          display: flex;
          flex-wrap: wrap;
          max-height: 100%;
          overflow-y: auto;
          > img {
            display: inline-block;
            margin-right: 51px;
            margin-bottom: 76px;
            width: 190px;
            cursor: pointer;
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
      width: 945px;
      height: 420px;
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
          margin-left: 30%;
          margin-bottom: 8px;
          text-align: initial;
          .label {
            display: inline-block;
            width: 150px;
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
              width: 383px;
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
          margin-top: 30px;
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
      .sell-wrap {
        .item-line {
          width: 50%;
          margin-left: 30%;
        }
      }
    }
    .modal-content-big {
      position: relative;
      width: 1211px;
      height: 630px;
      background: url("../../assets/image/pc/compoundBack.png") no-repeat;
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
          display: inline-block;
          font-size: 3rem;
          font-family: Playfair Display-Bold, Playfair Display;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 63px;
        }
        .compound-card {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 90px;
          .plus-icon {
            display: inline-block;
            margin: 0 10px;
            width: 36px;
          }
          .nft-card-item {
            display: flex;
            flex-direction: column;
            > img {
              width: 162px;
            }
            .name {
              display: inline-block;
              margin-top: 10px;
              font-size: 1.6rem;
              font-family: Playfair Display-Bold, Playfair Display;
              font-weight: bold;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>
