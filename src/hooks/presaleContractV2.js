/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-await */
import {
  web3Contract, getAccounts, getChainId, chainId,
} from '@/hooks/useWallte';
import Decimal from 'decimal.js';
import { truncation, tip } from '@/utils/utils';
import presale from '@/abi/Presale.json';
import ERC20 from '@/abi/erc20abi.json';
import { presaleBuyV2, presaleReleaseV2 } from '@/setup/address';
import api from '@/api/api';

const pow18 = Decimal.pow(10, 18);

const isWallet = () => store.state.isWallet;

export const ownContract = (add) => {
  const contract = web3Contract();
  return new contract.eth.Contract(ERC20, add);
};

const presaleContract = () => {
  const contract = web3Contract();
  return new contract.eth.Contract(presale, presaleBuyV2);
};

const releaseContract = () => {
  const contract = web3Contract();
  return new contract.eth.Contract(presale, presaleReleaseV2);
};

export const isApproveContract = async (add, contractAddress) => {
  const contract = ownContract(add);
  const Accounts = await getAccounts();
  if (!Accounts) return false;
  const allowance = await contract.methods.allowance(Accounts, contractAddress).call();
  const allow = new Decimal(allowance).div(pow18).toFixed();
  return Number(allow) > 0;
};

export const Approve = async (tokenAddress, contractAddress) => {
  const contract = ownContract(tokenAddress);
  const Accounts = await getAccounts();
  if (!Accounts) return false;
  await contract.methods.approve(contractAddress, '0xffffffffffffffffffffffffffffffffffffffff').send({
    from: Accounts,
  });
  return true;
};


// 获取时间
export const getTime = async () => {
  const contract = presaleContract();
  const startTime = await contract.methods.startTime().call();
  const endTime = await contract.methods.endTime().call();
  return {
    startTime,
    endTime,
  };
};

// 获取当前用户bnb
export const getBNBbalance = async () => {
  const contract = new web3Contract();
  const Accounts = await getAccounts();
  if (!Accounts) return 0;
  const balance = await contract.eth.getBalance(Accounts);
  return new Decimal(balance).div(pow18).toFixed(4);
};

// 获取支付币种
export const getCurrency = async () => {
  const contract = presaleContract();
  const length = await contract.methods.paycoinLength().call();
  const arr = [...new Array(Number(length)).keys()];
  // const BNBChangeScale_ = await contract.methods.BNBChangeScale().call(); // BNB 购买比例
  // const BNBChangeScale = new Decimal(BNBChangeScale_).div(pow18).toFixed();
  // const BNBminBuyAmount_ = await contract.methods.BNBminBuyAmount().call(); // BNB 最小购买量
  // const BNBminBuyAmount = new Decimal(BNBminBuyAmount_).div(pow18).toFixed();
  // const BNBmaxBuyAmount_ = await contract.methods.BNBmaxBuyAmount().call(); // BNB 最大购买量
  // const BNBmaxBuyAmount = new Decimal(BNBmaxBuyAmount_).div(pow18).toFixed();
  // const BNBbalance = await getBNBbalance(); // 获取当前用户bnb;
  // const tokens = [
  //   {
  //     index: null,
  //     symbol: 'BNB',
  //     token: '',
  //     balance: BNBbalance,
  //     minBuyAmount: BNBminBuyAmount,
  //     maxBuyAmount: BNBmaxBuyAmount,
  //     isNeedApprove: false,
  //     changeScale: BNBChangeScale,
  //   },
  // ];
  const tokens = [];
  for (let i = 0; i < arr.length; i++) {
    // const index = arr[i];
    const token = await contract.methods.paycoins(i).call();
    const tokenContract = ownContract(token.payToken);
    const symbol = await tokenContract.methods.symbol().call();
    const Accounts = await getAccounts();
    let balance = 0;
    if (Accounts) {
      const balance_ = await tokenContract.methods.balanceOf(Accounts).call();
      balance = new Decimal(balance_).div(pow18).toFixed();
    }
    tokens.push({
      index: i,
      symbol,
      token: token.payToken,
      balance,
      minBuyAmount: new Decimal(token.minBuyAmount).div(pow18).toFixed(),
      maxBuyAmount: new Decimal(token.maxBuyAmount).div(pow18).toFixed(),
      changeScale: new Decimal(token.changeScale).div(pow18).toFixed(),
      isNeedApprove: true,
    });
  }
  return tokens;
};

// 是否已开启
export const isOpened = async () => {
  const contract = presaleContract();
  const is = await contract.methods.isOpened().call();
  return is;
};

// 获取领取时间
export const getClaimDate = async () => {
  const contract = presaleContract();
  const time = await contract.methods.rewardTime().call();
  return time;
};

export const buyMBT = async (amount, activeSymbol, code) => {
  const Accounts = await getAccounts();
  if (!Accounts) return;
  const contract = presaleContract();
  const value = new Decimal(amount).mul(pow18).toFixed();
  if (activeSymbol.symbol === 'BNB') {
    return await contract.methods.buyMBTByBNB().send({ from: Accounts, value }).once('transactionHash', tx => tx.transactionHash);
  }
  const isApprove_ = await isApproveContract(activeSymbol.token, presaleBuyV2);
  if (!isApprove_) {
    const is = await Approve(activeSymbol.token, presaleBuyV2);
  }
  return await contract.methods.buyMBT(value, activeSymbol.index).send({ from: Accounts }).once('transactionHash', (tx) => {
    const pram = {
      code,
      address: Accounts,
      amount,
      txHash: tx,
    };
    return api.agentRecordAdd(pram).then((r) => {}).catch(() => {
      throw TypeError('');
    });
  });
};

// 获取用户信息
export const getUserLocked = async () => {
  const user = {
    total: 0,
    Locked: 0,
    Unlocked: 0,
  };
  const Accounts = await getAccounts();
  if (Accounts) {
    const contract = releaseContract();
    const buyAmount_ = await contract.methods.buyAmount(Accounts).call();
    const buyAmount = new Decimal(buyAmount_).div(pow18);
    const rewardedAmount_ = await contract.methods.rewardedAmount(Accounts).call();
    const rewardedAmount = new Decimal(rewardedAmount_).div(pow18);
    const pending_ = await contract.methods.pending(Accounts).call();
    const pending = new Decimal(pending_).div(pow18);
    user.total = buyAmount.toFixed();
    user.Locked = buyAmount.sub(rewardedAmount).sub(pending).toFixed();
    user.Unlocked = pending.toFixed();
  }
  return user;
};

export const claim = async () => {
  const id = await getChainId();
  if (+id !== +chainId) {
    return tip('Please set up network to ASTAR');
  }
  const Accounts = await getAccounts();
  if (!Accounts) return;
  const contract = releaseContract();
  return await contract.methods.claim().send({ from: Accounts });
};
