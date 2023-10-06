<template>
  <div class="presale">
    <WalletButton />
    <div class="flex-direction-column flex-align-items-center banner">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <img class="presale-banner" src="../../assets/image/pc/presale.png"  alt=""/>
    </div>
    <div class="flex-direction-column flex-align-items-center content">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="sale-btn">{{ !isClaim ? 'Private Sale' : 'Claim Your $BBQ' }}</div>
      <div class="flex-justify-content-center flex-align-items-center flex-wrap-wrap bbq-layout">
        <img class="bbq-img" src="../../assets/image/pc/bbq-img.png" alt=""/>
        <p class="text">$BBQ</p>
        <Divider direction="vertical" />
        <p class="desc">$BBQ is the main token in the BOMBER QUEST.
          The token can be used in various aspects of the game.
          For example, Purchase Item, House, Scholarship</p>
      </div>
    </div>
    <div v-if="!isClaim" class="flex-direction-column flex-align-items-center round-layout">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="flex-direction-column flex-align-items-center round-content">
        <div class="flex-justify-content-space-between flex-align-items-center round-title">
          <p class="title">Private Round</p>
          <div class="flex-direction-column desc">
            <div class="flex-justify-content-space-between flex-align-items-center">
              <div class="flex-direction-column flex-align-items-flex-start">
                <span class="time-desc">Start in</span>
                <span class="time-desc">To End</span>
              </div>
              <div class="flex-direction-column flex-align-items-flex-end">
                <span class="time-text">{{ time.startTime | timeStampToDate("MMM DD, YYYY HH:mm") }}</span>
                <span class="time-text">{{ time.endTime | timeStampToDate("MMM DD, YYYY HH:mm") }}</span>
              </div>
            </div>
          </div>
        </div>
        <img class="line" src="../../assets/image/pc/splitLine.png" alt=""/>
        <ul class="rate-layout">
          <li class="flex-justify-content-space-between flex-align-items-center">
            <span class="text">Rate</span>
            <span>1 BBQ = {{ rateValue }}</span>
          </li>
          <li class="flex-justify-content-space-between flex-align-items-center">
            <span class="text">Minimum Purchase</span>
            <span>{{ minimumPurchase }}</span>
          </li>
          <li class="flex-justify-content-space-between flex-align-items-center">
            <span class="text">Maximum Purchase</span>
            <span>{{ maximamPurchase }}</span>
          </li>
<!--          <li class="flex-justify-content-space-between flex-align-items-center">-->
<!--            <span class="text">Claim Date</span>-->
<!--            <span>{{ claimDate | timeStampToDate("MMM DD, YYYY HH:mm") }}</span>-->
<!--          </li>-->
          <li class="flex-justify-content-space-between flex-align-items-center Vesting">
            <span class="text">Vesting</span>
            <p class="text_r ">
              5% released with the start of project release.
              <br />
              From the 2nd month to the 10th month, 10% will be released each month.
              <br />
              5% is released in the 11th month.
            </p>
          </li>
        </ul>
        <img class="line ul-line" src="../../assets/image/pc/splitLine.png" alt=""/>
        <p class="balance">Your Balance {{ activeSymbol.balance | toFixed(4) | numberFormat }} {{ activeSymbol.symbol }}</p>
        <div class="flex-direction-column flex-align-items-center input-layout">
          <p class="max-text"><span class="pointer" @click="inputMax">MAX</span></p>
          <Input v-only-number:4="buyValue" placeholder="" v-model="buyValue" @input="buyValueInput" @change="buyValueChange" class="input-with-select">
            <Select slot="append" v-model="selectCurrency" @change="currencyChange">
              <SelectOption :label="item.symbol" :value="item.symbol" v-for="(item,index) in currency"></SelectOption>
            </Select>
          </Input>
          <p class="arrow">&#8595;</p>
          <div class="coin" v-if="calcBuyAmountValue">{{ calcBuyAmountValue | toFixed(4) | numberFormat }} BBQ</div>
          <div class="coin" v-else>{{ calcBuyAmountValue }} BBQ</div>
          <p class="note-text">Note: Please set up network to BSC</p>
          <button class="buy-btn th-btn font3" :disabled="buyDisabled || !isOpen || buyValue <= 0" @click="buyClick">Buy BBQ</button>
<!--          <p class="bbq-desc">$BBQ claim page will live in {{ claimCountdown }}</p>-->
        </div>
      </div>
      <div class="mask-bottom"></div>
      <span class="footer-text font3">© Bomber Quest | 2022</span>
    </div>
    <div v-else class="flex-direction-column flex-align-items-center chaim-layout">
      <div class="mask-top"></div>
      <div class="flex-direction-column flex-align-items-center chaim-content">
        <div class="flex-justify-content-center flex-align-items-flex-end">
          <img class="money-img" src="../../assets/image/pc/money.png" alt=""/>
          <span class="claim-title font3">Claim $BBQ</span>
          <img class="money-img" src="../../assets/image/pc/money.png" alt=""/>
        </div>
        <div class="flex-justify-content-center flex-align-items-center">
          <div class="flex-direction-column font3">
            <span class="num margin-top-40">{{ userLocked.total | toFixed(4) | numberFormat }}</span>
            <span class="num margin-top-40">{{ userLocked.Locked | toFixed(4) | numberFormat }}</span>
            <span class="num text-black">{{ userLocked.Unlocked | toFixed(4)  | numberFormat }}</span>
          </div>
          <div class="flex-direction-column font3 unit-desc">
            <div class="flex-direction-row flex-align-items-center margin-top-40">
              <span class="unit">BBQ</span>
              <span class="text">(Your Balance)</span>
            </div>
            <div class="flex-direction-row flex-align-items-center margin-top-40">
              <span class="unit">BBQ</span>
              <span class="text">(Locked)</span>
            </div>
            <div class="flex-direction-row flex-align-items-center">
              <span class="unit text-black">BBQ</span>
              <span class="text">(Unlocked)</span>
            </div>
          </div>
        </div>
        <button class="chaim-btn font3 th-btn" :disabled="claimDisabled" @click="claimClick">Claim</button>
        <p class="note-text font3">Note: Please set up network to ASTAR</p>
      </div>
      <span class="footer-text">© Bomber Quest | 2022</span>
    </div>
  </div>
</template>

<script>
import {
  Input, Divider, Select, Option,
} from 'element-ui';
import presaleMixin from '@/plugins/presaleMixin';
import WalletButton from '../../components/walletButton.vue';

export default {
  name: 'Presale',
  components: {
    Input, Select, SelectOption: Option, Divider, WalletButton,
  },
  mixins: [presaleMixin],
};
</script>

<style lang="less" scoped>
.presale {
  width: 100%;
  height: 100%;
  position: relative;
  background: #2c1c17;
  font-family: PlayfairDisplay-Bold,serif;
}

.padding-left-30 { padding-left: 3.2rem; }

.padding-left-18 { padding-left: 1.6rem; }

.unit-desc {
  line-height: 6rem;
  box-sizing: border-box
}

.wallet {
  position: fixed;
  right: 24.2rem;
  top: 15.6rem;
  z-index: 10;
  cursor: pointer;
}

.banner {
  width: 100%;
  height: 120rem;
  position: relative;
  background: url("../../assets/image/pc/firstBack.png") no-repeat;
  background-size: 100% 100%;
}

.presale-banner {
  width: 100%;
  margin-top: 8rem;
}

.content {
  width: 100%;
  height: 105rem;
  position: relative;
  font-family: PlayfairDisplay-Bold,serif;

  .sale-btn {
    z-index: 3;
    width: 39.06%;
    height: 17rem;
    font-size: 5rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 17rem;
    margin-top: 22.6rem;
    background: url("../../assets/image/pc/total.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}

.input-with-select {
  height: 8.6rem;

  /deep/ .el-input__inner {
    height: 8.6rem;
    font-size: 4rem;
    text-align: right;
    font-family: PlayfairDisplay-Bold,serif;
  }
}

.bbq-layout {
  z-index: 3;
  width: 100%;
  margin-top: 16.2rem;
  color: rgba(255, 243, 203, 0.7);
  font-family: PlayfairDisplay-Bold,serif;

  .text {
    font-size: 10rem;
    font-weight: bold;
    margin-left: 4.6rem;
  }

  .desc {
    font-size: 2.5rem;
    width: 62rem;
  }
}

.round-layout {
  width: 100%;
  z-index: 3;
  position: relative;
  background: url("../../assets/image/pc/metric.png") no-repeat;
  background-size: cover;
}

.chaim-layout {
  width: 100%;
  z-index: 3;
  //height: 100%;
  position: relative;
  background: url("../../assets/image/pc/metric.png") no-repeat;
  background-size: cover;
  font-family: PlayfairDisplay-Bold,serif;
}

.round-content {
  z-index: 3;
  width: 75%;
  color: #FFFFFF;
  margin-top: 11rem;
  padding: 13rem 10rem;
  box-sizing: border-box;
  font-family: PlayfairDisplay-Bold,serif;
  background: url("../../assets/image/pc/presale-round-img.png") no-repeat;
  background-size: 100% 100%;

  .round-title {
    width: 100%;

    .desc { font-size: 3rem; }

    .time-desc { text-align: left; }

    .time-text { margin-left: 3rem; text-align: right; }
  }

  .title { font-size: 6rem; }

  .line {
    width: 94%;
    margin-top: 6rem;

    &.ul-line {
      width: 85%;
      margin-top: 3rem;
    }
  }
}

.rate-layout {
  width: 80%;
  font-size: 3rem;
  margin-top: 10rem;
  font-family: PlayfairDisplay-Bold,serif;

  .text {
    color: rgba(255, 243, 203, 0.7);
  }
  span{
    &:nth-child(2){
      font-size: 2.4rem;
    }
  }
}

.balance {
  color: #BBBBBB;
  font-size: 4rem;
  margin-top: 5rem;
}

.input-layout {
  width: 58rem;

  .max-text {
    width: 100%;
    color: #0447F9;
    font-size: 4rem;
    margin-top: 1rem;
    text-align: right;
    padding-right: 2rem;
    text-decoration: underline;
  }

  .arrow {
    text-align: center;
    font-size: 3rem;
    margin: 2rem 0;
    font-family: "Microsoft YaHei", "微软雅黑",serif;
  }

  .coin {
    width: 100%;
    height: 8.6rem;
    font-size: 4rem;
    color: #FFFFFF;
    text-align: right;
    line-height: 8.6rem;
    background: #E68522;
    border-radius: .5rem;
    padding-right: 3rem;
    box-sizing: border-box;
    border: .2rem solid #BBBBBB;
  }

  .note-text {
    margin-top: 1rem;
    text-align: center;
    font-size: 2.5rem;
  }

  .buy-btn {
    width: 39.4rem;
    height: 5.6rem;
    margin-top: 7.5rem;
    font-size: 2.4rem;
    color: #AA6D1D;
    border-radius: .5rem;
    background: url("../../assets/image/pc/buttonBack.png") no-repeat;
    background-size: 100% 100%;
  }

  .bbq-desc {
    width: 34.2rem;
    text-align: center;
    margin-top: 10.7rem;
    font-size: 2.5rem;
    color: #BBBBBB;
  }
}

.footer-text {
  margin: 4.5rem 0;
  width: 100%;
  display: inline-block;
  position: relative;
  z-index: 3;
  font-size: 2.7rem;
  font-weight: 500;
  color: #ffffff;
  line-height: 42px;
  text-align: center;
  opacity: 0.4;
}

.chaim-content {
  z-index: 3;
  margin-top: 13rem;
  width: 121.6rem;
  // height: 85rem;
  padding-top: 10rem;
  padding-bottom: 5rem;
  box-sizing: border-box;
  background: url("../../assets/image/pc/presale-chaim.png") no-repeat;
  background-size: 100% 100%;

  .money-img { width: 15rem; }

  .claim-title {
    font-size: 6rem;
    margin: 0 2.5rem;
    color: rgba(255, 243, 203, 0.7);
  }

  .num {
    color: #A061B0;
    font-size: 6rem;
    font-weight: bold;
  }

  .unit {
    font-size: 4rem;
    color: #A061B0;
    font-weight: bold;
    margin-left: 1.4rem;
    margin-top: 1.3rem;
  }

  .text {
    color: #FFFFFF;
    font-size: 2rem;
    margin-left: 2.8rem;
    margin-top: 2rem;
  }

  .chaim-btn {
    width: 20.4rem;
    height: 5.6rem;
    color: #199AAA;
    margin-top: 9rem;
    font-size: 2.4rem;
    border-radius: .5rem;
    background: url("../../assets/image/pc/buttonBack2.png") no-repeat;
    background-size: 100% 100%;
  }

  .note-text {
    color: #FFFFFF;
    margin-top: 9rem;
    font-size: 2.5rem;
  }
}

.margin-top-40 {
  margin-top: 4rem;
}

/deep/ .el-divider--vertical {
  height: 5.6rem;
  margin: 0 2.6rem;
}

.Vesting{
  align-items: flex-start;
  margin-top: 1rem;
  p{
    flex: 1;
    font-size: 2rem;
  }
}

</style>
