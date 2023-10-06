import { cookies } from '../utils/common';

export default {
  isWallet: false, // 是否链接钱包
  language: cookies.get('language') || 'EN',
  account: null,
  isMobileActive: false,
  walletDialog: false,

  // cacheConnect: cookies.get('cacheConnect'),
  cacheConnect: sessionStorage.getItem('cacheConnect'),

  normalBoxPrice: 0.0005, // 目前一个普通盒子 0.0005 bnb
  premiumPackage: 0.05, // 礼包，目前一个高级 0.05 bnb

  nfttotal: 500100, // NFT 总量
  bagtotal: 500, // 礼包总量

  users: {
    pendingBoxes: 0, // 没有开的普通nft
    pendingHighBoxes: 0, // 没有开的高级礼包
    totalBuy: 0, // 总共买的nft，包括没有开的
  },
  userOpened: [],
  userOpenedCodeId: [],
};
