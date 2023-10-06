import { cardGrade } from '@/plugins/nftidsMap';

export {
  default as cookies,
} from 'cookies-js';

export const imgLink = 'https://bomb-won.s3.ap-northeast-1.amazonaws.com';

// 时间戳转换方法
export function formatDate(date) {
  const nowDate = new Date(Number(date));
  const YY = `${nowDate.getFullYear()}-`;
  const MM = `${nowDate.getMonth() + 1 < 10 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1}-`;
  const DD = (nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate());
  const hh = `${nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()}:`;
  const mm = `${nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes()}:`;
  const ss = (nowDate.getSeconds() < 10 ? `0${nowDate.getSeconds()}` : nowDate.getSeconds());
  return `${YY + MM + DD} ${hh}${mm}${ss}`;
}

// 格林时间转换方法
export function formatDateGT(date) {
  const nowDate = new Date(date);
  const YY = `${nowDate.getFullYear()}-`;
  const MM = `${nowDate.getMonth() + 1 < 10 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1}-`;
  const DD = (nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate());
  const hh = `${nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()}:`;
  const mm = `${nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes()}:`;
  const ss = (nowDate.getSeconds() < 10 ? `0${nowDate.getSeconds()}` : nowDate.getSeconds());
  return `${YY + MM + DD} ${hh}${mm}${ss}`;
}


// 判断终端函数
export function isMobile() { // PC端
  return !!window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

// 弹窗提示
export function tip(txt) {
  const div = document.createElement('div');
  // eslint-disable-next-line no-shadow
  const tip = document.createElement('span');
  div.classList.add('alertDiv');
  tip.classList.add('alertTXT');
  tip.innerText = txt;
  div.appendChild(tip);
  document.body.appendChild(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 1800);
}

// 跳转到焦点
export function toFocus(id) {
  // if (router.history.current.fullPath == '/') {
  document.documentElement.scrollTop = document.getElementById(id).offsetTop;
  // } else {
  //     router.push('/')
  // }
  // chrome
  document.body.scrollTop = document.getElementById(id).offsetTop;
  // firefox

  // safari
  window.pageYOffset = document.getElementById(id).offsetTop;
}

// 颜色随机
export function generateColor() {
  let col = '#';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) col += parseInt(Math.random() * 16, 10).toString(16);
  return col;
}

// 字符串截取
/**
 * @return {string}
 */
export function ProcessingText(val, l) {
  const length = l || 60;
  if (val && val.length > length) {
    return `${val.slice(0, length)}...`;
  }
  return val || '';
}

// 复制文案
export function copyToClipboard(text) {
  const input = document.createElement('input');
  const commandName = 'copy';
  input.value = text;
  Object.entries({
    opacity: 0,
    position: 'fixed',
    zIndex: -1,
  }).forEach(([key, value]) => {
    input.style[key] = value;
  });
  input.setAttribute('readonly', 'readonly');
  document.body.appendChild(input);
  input.focus();
  input.setSelectionRange(0, input.value.length);
  if (!document.execCommand(commandName, false, null)) throw new Error('在调用`document.execCommand`复制时发生错误');
  input.blur();
  document.body.removeChild(input);
  tip('Copy successfully');
}

// 倒计时 转换
export function formatCountDown(time) {
  let t = '';
  if (time >= 0) {
    const d = Math.floor(time / (60 * 60 * 24));
    const h = Math.floor((time / (60 * 60)) % 24);
    // const m = Math.floor((time / 60) % 60);
    // const s = Math.floor(time % 60);
    t = `${d} days ${h} hours`;
  } else {
    t = '0 days 0 hours';
  }
  return t;
}

// 截取数字
export function truncation(num, decimal) {
  const a = String(num);
  if (a.indexOf('.') > 0) {
    return a.substring(0, a.indexOf('.') + (decimal ? decimal + 1 : 7));
  }
  return a;
}


export const interceptAdd = (add) => {
  const l = 5;
  return add
    ? `${add.substr(0, l)
    }...${add.substring(add.length - l)}`
    : 'Connect Wallet';
};


// 根据code获取稀有度
export const getRarity = (code) => {
  const letter = code.charAt(0);
  return cardGrade.find(({ name }) => (letter === name.charAt(0).toUpperCase())).name;
};

// 返回图片地址
export const syntheticImgAddress = (code) => {
  const RARITY = getRarity(code);
  return `${imgLink}/${RARITY}/${code}.png`;
};


export const getCodeId = id => Number(id) % 65536;


const powerMap = {
  1: 1,
  2: 3,
  3: 10,
  4: 32,
  5: 586,
  1536: 602,
  1537: 604,
  1538: 632,
  1539: 604,
  1540: 610,
  1541: 632,
};


// 计算卡牌算力
// tokenId:卡牌id
export const nftPower = (tokenId) => {
  const id1 = getCodeId(tokenId);
  const quality = Math.floor(id1 / 256);
  if (quality < 6) {
    return powerMap[quality];
  }
  return powerMap[id1];
};
