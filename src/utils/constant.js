export const languages = [
  {
    name: 'English',
    val: 'EN',
  },
  {
    name: 'Japanese',
    val: 'JA',
  },
];

export const menus = [
  {
    path: '/',
    icon: '&#xeb99;',
  },
  {
    path: '/nft',
    icon: '&#xeb9a;',
  },
  {
    path: '/MARKET',
    icon: '&#xea70;',
  },
  {
    path: 'GAME',
    icon: '&#xeb99;',
  },
  {
    path: 'EARN',
    icon: '&#xeb9a;',
  },
  {
    path: 'LAUNCHPAD',
    icon: '&#xea70;',
  },
  {
    path: 'INFO',
    icon: '&#xeb99;',
  },
];

export const PagingDefaultConf = {
  pageIndex: 1,
  pageSize: 12,
};

export const Regex = {
  CHINA_PHONE: /^1[3-9]{1}\d{9}$/,
  PHONE: /^\d{5,20}$/, // 国际
  EMAIL: /^[\S]+@[\w|\d]+\.[\w|\d]+$/,
  ACCOUNT: /(^\d{5,20}$)|(^[\S]+@[\w|\d]+\.[\w|\d]+$)/,
  QR_CODE_FIX: /^commission:\/\//,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/,
  CODE: /^\d{6}$/,
  SPECIAL_CHARACTERS: new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"), // 特殊字符匹配(无法识别)
  SECURITY_PWD: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  ID_CARD: /^[\uFF08-\uFF09()A-Za-z0-9]{15,18}$/,
  IS_DECIMAL: /^\d+\.\d+$/, // 是否是小数
  NUMBER: /^(1|[1-9][0-9]*)$/, // 只能输入1和非零开头的数字
  THOUSANDS_REGULAR: /\B(?=(\d{3})+(?!\d))/g, // 千分符
  IS_URL: /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, // 判断是否是域名链接
  ETHaddress: /^(0x)?[0-9a-fA-F]{40}$/,
};

export const TITLE = window.document.title;
