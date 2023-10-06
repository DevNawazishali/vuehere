import { getAccounts, web3Contract } from '@/hooks/useWallte';
import Decimal from 'decimal.js';
import store from '@/store';
import nftabi from '@/abi/nftabi.json';
import erc20abi from '@/abi/erc20abi.json';
import { bombAddress, nftAddress, usdtAddress } from '@/setup/address';
import api from '@/api/api';

const Accounts = null;
const pow18 = Decimal.pow(10, 18);

const isWallet = () => store.state.isWallet;

export const bagPrice = '1050'; // 礼包价格
export const boxPrice = '80'; // 单个卡牌价格
export const propPrice = '80'; // 角色价格
export const homePrice = '450'; // 家的价格
export const multiPrice = '1570'; // 角色+家 组合

const usdtContract = () => {
  const contract = web3Contract();
  return new contract.eth.Contract(erc20abi, usdtAddress);
};

const nftContract = () => {
  const contract = web3Contract();
  return new contract.eth.Contract(nftabi, nftAddress);
};

// 查询usdt 是否授权
export const checkApprove = async () => {
  const contract = await usdtContract();
  const Accounts = await getAccounts();
  const result = await contract.methods.allowance(Accounts, nftAddress).call();
  return new Decimal(result).div(pow18).cmp('1000000') > 0;
};

// usdt 授权
export const usdtApprove = async () => {
  const contract = await usdtContract();
  const Accounts = await getAccounts();
  await contract.methods.approve(nftAddress, '0xfffffffffffffffffffffffffffffffffffffffffff').send({
    from: Accounts,
  });
};

// usdt 余额
export const usdtBalance = async () => {
  const contract = await usdtContract();
  const Accounts = await getAccounts();
  const result = await contract.methods.balanceOf(Accounts).call();
  return new Decimal(result).div(pow18).toFixed(2);
};

// 买盒子
// type:
// 0 -礼包  当买礼包是 num只能==1
// 1 角色
// 2 道具
// 3 home
// 4 角色+home
// num 要买的数量
export const buyBoxNew = async (type, num, code) => {
  const contract = await nftContract();
  const Accounts = await getAccounts();
  return await contract.methods.buyBox(type, num).send({ from: Accounts });
// .once('transactionHash', (tx) => {
//     const pram = {
//       code,
//       address: Accounts,
//       amount,
//       txHash: tx,
//     };
//     // return api.agentRecordAdd(pram).then((r) => { }).catch(() => {
//     //   throw TypeError('');
//     // });
//   });
};

// 批量开普通盒子
// type:
// 0 -礼包  当买礼包是 num只能==1
// 1 角色
// 2 道具
// 3 home
// 4 角色+home
// num 要买的数量
// 返回事件，事件里面包含了开出来的卡牌id
export const openBox = async (type, num) => {
  const contract = nftContract();
  const Accounts = await getAccounts();
  const gas = await contract.methods.openBox(type, num).estimateGas({ from: Accounts });
  const tx = await contract.methods.openBox(type, num).send({
    from: Accounts,
    gasLimit: Math.floor(gas * 1.2),
  });
  const infos = tx.events.Transfer.map(log => getTokenInfoByid(log.returnValues.tokenId));
  return infos;
};

// type:
// 0 -礼包  当买礼包是 num只能==1
// 1 角色
// 2 道具
// 3 home
// 4 角色+home
export const typeInfos = async (type) => {
  const contract = nftContract();
  return await contract.methods.typeInfos(type).call();
};

// 查询礼包数量
// type:
// 0 -礼包  当买礼包是 num只能==1
// 1 角色
// 2 道具
// 3 home
// 4 角色+home
export const boxNum = async (type) => {
  const contract = nftContract();
  const Accounts = await getAccounts();
  if (Accounts) {
    return await contract.methods.users(Accounts, type).call();
  }
  return 0;
};

// 查询是否第二阶段
export const is2ndStage = async (type, num) => {
  const contract = nftContract();
  const Accounts = await getAccounts();
  return (await contract.methods.is2ndStage(type, num)) == 1;
};

// 转卡
export const transfer = async (id, to) => {
  const contract = nftContract();
  const Accounts = await getAccounts();
  await contract.methods.batchTransfer(to, [id]).send({
    from: Accounts,
  });
};

// 转盒子
// type 类型
// num 数量
// to 接受地址
export const transferBox = async (type, num, to) => {
  const contract = nftContract();
  const Accounts = await getAccounts();
  await contract.methods.transferBox(to, type, num).send({
    from: Accounts,
  });
};

export const addToken = async (address = '', symbol = 'BOMB', decimals = 18, image = 'url') => {
  await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address, // The address that the token is at.
        symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals, // The number of decimals in the token
        image, // A string url of the token logo
      },
    },
  });
};

const typeMeta = {
  1: 'char/',
  2: 'prop/',
  3: 'home/',
};

const typeMeta1 = {
  1: 'C',
  2: 'I',
  3: 'H',
};
const quaMeta = {
  0: '1-COMMON/',
  1: '2-RARE/',
  2: '3-SUPER_RARE/',
  3: '4-EPIC/',
  4: '5-LEGEND/',
  5: '6-SUPER_LEGEND/',
};
const colorMeta = {
  0: 'W',
  1: 'B',
  2: 'Y',
  3: 'V',
  4: 'P',
  5: 'R',
};

const preFix = 'https://metabomber.s3.ap-northeast-1.amazonaws.com/';

function getUrlSuf(type, quality, level, index) {
  if (quality == 5) {
    return `${preFix}${typeMeta[type]}${quaMeta[quality]}${typeMeta1[type]}${+level + 1}A6.jpg`;
  }
  if (quality == 4) {
    return `${preFix}${typeMeta[type]}${quaMeta[quality]}${typeMeta1[type]}${+level + 1}S5.jpg`;
  }
  if (quality == 3) {
    return `${preFix}${typeMeta[type]}${quaMeta[quality]}${typeMeta1[type]}${+level + 1}C4.jpg`;
  }
  if (quality == 2) {
    return `${preFix}${typeMeta[type]}${quaMeta[quality]}${typeMeta1[type]}${+level + 1}G3.jpg`;
  }
  if (quality == 1) {
    return `${preFix}${typeMeta[type]}${quaMeta[quality]}${typeMeta1[type]}${+level + 1}${colorMeta[(index % 2) + 4]
    }2.jpg`;
  }
  return `${preFix}${typeMeta[type]}${quaMeta[quality]}${typeMeta1[type]}${+level + 1}${colorMeta[index % 4]
  }1.jpg`;
}

function getName(type, quality, level, index) {
  if (type == 1 && quality == 5) {
    return `C${+level + 1}A6`;
  }
  if (type == 1 && quality == 4) {
    return `C${+level + 1}S5`;
  }
  if (type == 1 && quality == 3) {
    return `C${+level + 1}C4`;
  }
  if (type == 1 && quality == 2) {
    return `C${+level + 1}G3`;
  }
  if (type == 1 && quality == 1) {
    return `C${+level + 1}${colorMeta[(index % 2) + 4]}2`;
  }
  if (type == 1 && quality == 0) {
    return `C${+level + 1}${colorMeta[index % 4]}1`;
  }
}

const getTokenInfoByid = (id) => {
  id = new Decimal(id);
  const index = id.mod(16777216);
  id = id.sub(index).divToInt(16777216);
  const level = id.mod(256);
  id = id.sub(level).divToInt(256);
  const quality = id.mod(256);
  id = id.sub(quality).divToInt(256);
  const type = id.mod(256);
  return getTokenInfo(id, type, quality, level, index);
};

const getTokenInfo = (id, type, quality, level, index) => ({
  urlSuf: getUrlSuf(type, quality, level, index),
  name: getName(type, quality, level, index),
  key: `${type}-${quality}-${level}-${index % 4}`,
  id,
  type,
  quality,
  level,
  index,
});

// 查询用户拥有的nft
export const getUserTokens = async () => {
  const contract = nftContract();
  const Accounts = await getAccounts();
  if (!Accounts) return { ids: [] };
  const {
    ids, _typeEnums, qualities, levels, indexs,
  } = await contract.methods
    .getUserTokens(Accounts, 50000, 1)
    .call();
  const cards = [];
  for (let i = 0; i < ids.length; i++) {
    cards.push(getTokenInfo(ids[i], _typeEnums[i], qualities[i], levels[i], indexs[i]));
  }
  return cards;
};
