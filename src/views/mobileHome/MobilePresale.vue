<template>
  <div class="presale">
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
        <div class="flex-direction-column flex-align-items-center round-title">
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
            <span class="text">Maximam Purchase</span>
            <span>{{ maximamPurchase }}</span>
          </li>
<!--          <li class="flex-justify-content-space-between flex-align-items-center">-->
<!--            <span class="text">Clame Date</span>-->
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
      <span class="footer-text">© Bomber Quest | 2022</span>
    </div>
    <div v-else class="flex-direction-column flex-align-items-center round-layout chaim-layout">
      <div class="mask-top"></div>
      <div class="flex-direction-column chaim-content">
        <div class="flex-justify-content-center flex-align-items-flex-end">
          <img class="money-img" src="../../assets/image/pc/money.png" alt=""/>
          <span class="claim-title font3">Claim $BBQ</span>
          <img class="money-img" src="../../assets/image/pc/money.png" alt=""/>
        </div>
        <div class="flex-justify-content-center">
          <div class="flex-direction-column flex-align-items-flex-start">
            <div class="margin-top-40">
              <span class="text">Your Balance</span>
              <div class="flex-justify-content-center flex-align-items-center">
                <div class="num">{{ userLocked.total | toFixed(4) | numberFormat }}</div>
                <span class="unit">BBQ</span>
              </div>
            </div>
            <div class="margin-top-40">
              <span class="text">Locked</span>
              <div class="flex-justify-content-center flex-align-items-center">
                <div class="num">{{ userLocked.Locked | toFixed(4) | numberFormat }}</div>
                <span class="unit">BBQ</span>
              </div>
            </div>
            <div>
              <span class="text">Unlocked</span>
              <div class="flex-justify-content-center flex-align-items-center">
                <div class="num text-black">{{ userLocked.Unlocked | toFixed(4) | numberFormat }}</div>
                <span class="unit text-black">BBQ</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-justify-content-center">
          <button class="chaim-btn th-btn font3" :disabled="claimDisabled" @click="claimClick">Claim</button>
        </div>
        <p class="note-text">Note: Please set up network to ASTAR</p>
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

export default {
  name: 'Presale',
  components: {
    Input, Select, SelectOption: Option, Divider,
  },
  mixins: [presaleMixin],
  data() {
    return {
      select: '1',
    };
  },
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

.banner {
  width: 100%;
  position: relative;
  background: url("../../assets/image/mobile/firstBack.png") no-repeat;
  background-size: 100% 100%;
}

.presale-banner {
  width: 100%;
  z-index: 3;
  margin-top: 8rem;
}

.content {
  width: 100%;
  height: 30rem;
  position: relative;
  font-family: PlayfairDisplay-Bold,serif;

  .sale-btn {
    z-index: 3;
    width: 24rem;
    height: 5rem;
    font-size: 1.4rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 5rem;
    margin-top: 3.8rem;
    background: url("../../assets/image/pc/total.png") no-repeat;
    background-size: 100% 100%;
  }
}

.bbq-layout {
  z-index: 3;
  width: 100%;
  margin-top: 5rem;
  color: rgba(255, 243, 203, 0.7);
  font-family: PlayfairDisplay-Bold,serif;

  .bbq-img {
    width: 5rem;
  }

  .text {
    font-size: 2.2rem;
    font-weight: bold;
    margin-left: 1.5rem;
  }

  .desc {
    font-size: 1.2rem;
    width: 26rem;
  }
}

.round-layout {
  width: 100%;
  z-index: 3;
  // height: 75rem;
  position: relative;
  background: url("../../assets/image/pc/metric.png") no-repeat;
  background-size: 100% 100%;
}

.round-content {
  z-index: 3;
  width: 75%;
  // height: 62rem;
  color: #FFFFFF;
  margin-top: 4rem;
  padding: 3.2rem 3.5rem;
  box-sizing: border-box;
  background: url("../../assets/image/pc/presale-round-img.png") no-repeat;
  background-size: 100% 100%;

  .round-title {
    width: 100%;

    .desc { font-size: 1.2rem; }

    .time-desc { text-align: left; }

    .time-text { margin-left: 2rem; text-align: right; }
  }

  .title { font-size: 2rem; margin-top: 1.2rem; margin-bottom: 2rem; }

  .line {
    width: 94%;
    margin-top: 1.5rem;

    &.ul-line {
      width: 85%;
      margin-top: 1.5rem;
    }
  }
}

.rate-layout {
  width: 100%;
  font-size: 1.2rem;
  margin-top: 1.5rem;

  .text {
    color: rgba(255, 243, 203, 0.7);
  }
}

.balance {
  color: #BBBBBB;
  font-size: 1.2rem;
  margin-top: 1.6rem;
}

.input-layout {
  width: 24rem;

  .max-text {
    width: 100%;
    color: #0447F9;
    font-size: 1.4rem;
    margin-top: 1rem;
    text-align: right;
    padding-right: 2rem;
    text-decoration: underline;
  }

  .arrow {
    text-align: center;
    font-size: 2rem;
    margin: 1.5rem 0;
    font-family: "Microsoft YaHei", "微软雅黑",serif;
  }

  .coin {
    width: 100%;
    height: 3.2rem;
    font-size: 1.2rem;
    color: #FFFFFF;
    text-align: right;
    line-height: 3.2rem;
    background: #E68522;
    border-radius: .5rem;
    padding-right: 3rem;
    box-sizing: border-box;
    border: .2rem solid #BBBBBB;
  }

  .note-text {
    margin-top: 1rem;
    text-align: center;
    font-size: 1.2rem;
  }

  .buy-btn {
    width: 10rem;
    height: 3.2rem;
    margin-top: 2.2rem;
    font-size: 1.2rem;
    color: #AA6D1D;
    border-radius: .5rem;
    background: url("../../assets/image/pc/buttonBack.png") no-repeat;
    background-size: 100% 100%;
  }

  .bbq-desc {
    width: 20rem;
    text-align: center;
    margin-top: 1.8rem;
    font-size: 1.2rem;
    color: #BBBBBB;
  }
}

.input-with-select {
  height: 3.2rem;
  width: 24rem;
  font-size: 1.3rem;

  /deep/ .el-input__inner {
    height: 3.2rem;
    text-align: right;
    line-height: 3.2rem;
  }
}

.footer-text {
  margin: 4.5rem 0;
  width: 100%;
  display: inline-block;
  position: relative;
  z-index: 3;
  font-size: 1.2rem;
  font-weight: 500;
  color: #ffffff;
  line-height: 42px;
  text-align: center;
  opacity: 0.4;
}

.chaim-content {
  z-index: 3;
  margin-top: 2.5rem;
  width: 90%;
  padding: 7rem 5rem 4.2rem 5rem;
  box-sizing: border-box;
  background: url("../../assets/image/mobile/modalBack.png") no-repeat;
  background-size: 100% 100%;

  .money-img {
    width: 4rem;
  }

  .claim-title {
    font-size: 2.2rem;
    margin: 0 2.5rem;
    font-weight: bold;
    color: rgba(255, 243, 203, 0.7);
  }

  .num {
    color: #A061B0;
    font-size: 2.6rem;
    font-weight: bold;
  }

  .unit {
    font-size: 1.6rem;
    color: #A061B0;
    font-weight: bold;
    margin-left: 1rem;
    margin-top: .5rem;
  }

  .text {
    color: #FFFFFF;
    font-size: 1.2rem;
    margin-top: .5rem;
  }

  .chaim-btn {
    width: 15rem;
    height: 3.2rem;
    color: #199AAA;
    margin-top: 5rem;
    font-size: 1.2rem;
    border-radius: .5rem;
    background: url("../../assets/image/pc/buttonBack2.png") no-repeat;
    background-size: 100% 100%;
  }

  .note-text {
    color: #FFFFFF;
    margin-top: 4rem;
    font-size: 1.5rem;
    text-align: center;
  }
}

.margin-top-40 {
  margin-top: 4rem;
}

/deep/ .el-divider--vertical {
  height: 4rem;
  margin: 0 1.5rem;
}

.Vesting{
  align-items: flex-start;
  margin-top: 1rem;
  p{
    flex: 1;
    margin-left: 1rem;
    font-size: 1.4rem;
  }
}
</style>
