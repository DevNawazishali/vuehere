// time stamp
import { moment } from '../utils/common';
import { Regex } from '../utils/constant';
import i18n from '../setup/i18n-setup';

const filters = {
  timeStampToDate(timeStamp, reg = 'YYYY.MM.DD HH:mm:ss') { // 时间戳转时间
    if (!timeStamp) return '--';
    return moment(timeStamp).format(reg);
  },
  timeDuration(start, end, key) { // 时间周期，支持单独获取一个key的时间周期
    const momentDiff = moment(start).diff(moment(end), key, true);
    const timeDuration = moment.duration(momentDiff);
    return key ? momentDiff : {
      years: timeDuration.get('years'),
      months: timeDuration.get('months'),
      weeks: timeDuration.get('weeks'),
      days: timeDuration.get('days'),
      hours: timeDuration.get('hours'),
      minutes: timeDuration.get('minutes'),
      seconds: timeDuration.get('seconds'),
      milliseconds: timeDuration.get('milliseconds'),
    };
  },
  numberFormat(value) { // 数字从右至左添加千分符,逗号隔断,负数、小数、0、不可使用
    const amountArr = String(value).split('.');
    if (Regex.NUMBER.test(amountArr[0])) {
      return amountArr.length > 1 ? `${String(amountArr[0]).replace(Regex.THOUSANDS_REGULAR, ',')}.${amountArr[1]}` : String(amountArr[0]).replace(Regex.THOUSANDS_REGULAR, ',');
    }
    return Number(value) > 0 ? value : '0.0000';
  },
  getZhang(value) {
    if (value > 10000) {
      const locale = i18n.locale === 'en-US' || i18n.locale === 'ko-KR' ? 1000000 : 10000;
      return `${filters.toFixed(value / locale, 2)}${i18n.t('emptyText[1]')}`/* 万 */;
    }
    return value;
  },
  getFullNum(num) {
    // 处理非数字
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(num)) { return num; }
    // 处理不需要转换的数字
    const str = `${num}`;
    if (!/e/i.test(str)) { return num; }

    return (num).toFixed(18).replace(/\.?0+$/, '');
  },
  currencyFormat(amount = 0, fix = 2) {
    // 法定货币
    const amountArr = String(filters.getFullNum(amount)).split('.');
    if ((amountArr.length === 2 && amountArr[0].length >= 2) || amountArr.length === 1) {
      return amountArr.length === 1 && amountArr[0] === '0' ? filters.toFixed(amount, fix) : amountArr[0].length === 1 && amountArr[0] !== '0' ? Number(filters.toFixed(amount, 4)) : Number(filters.toFixed(amount, fix));
    }
    // eslint-disable-next-line radix
    const length = amountArr[1].length - String(parseInt(String(amountArr[1]))).length;
    const newAmount = amountArr[0] >= 1 ? filters.toFixed(amount, 4) : filters.toFixed(amount, (4 + length) <= 8 ? (4 + length) : 8);
    return amount >= 0.00000001 ? filters.getFullNum(Number(newAmount)) : '＜0.00000001';
  },
  attrSort(array, attr, rev = 1) { // 数组排序，支持对象key键值排序
    /* eslint no-nested-ternary: 0 */
    return array.sort((a, b) => {
      const [old, cur] = [
        a.constructor === Object ? a[attr] : a,
        b.constructor === Object ? b[attr] : b,
      ];
      return (old - cur) * rev;
    });
  },

  toFixed(amount = 0, fix = 5) { // 保留小数
    const fixNum = Number(fix);
    // eslint-disable-next-line radix
    if (fixNum === 0) return parseInt(amount);
    const amountArr = String(filters.getFullNum(amount)).split('.');
    const newAmount = amountArr.length > 1 ? `0.${amountArr[1].substr(0, fixNum)}` : amount;
    const isPlus = amountArr.length > 1 && amountArr[0] === '-0' ? '-' : '';
    const data = fixNum ? Number(newAmount).toFixed(fixNum + 1).slice(0, -1) : Number(newAmount);
    return amountArr.length > 1 ? `${isPlus}${Number(amountArr[0])}.${String(data).split('.')[1]}` : data;
  },

  toFixedSize(amount = 0, fix = 5) { // 0.001保留小数
    const fixNum = filters.accuracyDigit(fix);
    // eslint-disable-next-line radix
    if (fixNum === 0) return parseInt(amount);
    const amountArr = String(filters.getFullNum(amount)).split('.');
    const newAmount = amountArr.length > 1 ? `0.${amountArr[1].substr(0, fixNum)}` : amount;
    const isPlus = amountArr.length > 1 && amountArr[0] === '-0' ? '-' : '';
    const data = fixNum ? Number(newAmount).toFixed(fixNum + 1).slice(0, -1) : Number(newAmount);
    return amountArr.length > 1 ? `${isPlus}${Number(amountArr[0])}.${data.split('.')[1]}` : data;
  },

  accuracyDigit(value) {
    const y = String(value).indexOf('.') + 1;// 获取小数点的位置
    const count = String(value).length - y;// 获取小数点后的个数
    return y > 0 ? count : 0;
  },

  typeWeek(value) {
    switch (value) { //  this_week,next_week,quarter
      case 'this_week':
        return '当周';
      case 'next_week':
        return '次周';
      default:
        return '季度';
    }
  },
  strReplace(str, status) { // 隐藏和显示数字
    const newStr = String(str);
    return status ? newStr.replace(/[0-9.]/ig, '*') : str;
    // return !status ? '****' : newStr;
  },
  strIntercept(str, length = 3) { // 过滤中间信息，不予展示
    const newStr = String(str);
    const prefix = newStr.match(new RegExp(`^[\\s\\S]{${length}}`));
    const suffix = newStr.match(new RegExp(`[\\s\\S]{${length}}$`));
    return `${prefix}****${suffix}`;
  },
  flowsGroup(flows, attr, key = 'day') { // 数据分组处理
    return this.attrSort(flows, attr, -1).reduce((acc, cur) => {
      const lastFlows = acc.slice(-1).flat();
      const lastFlow = lastFlows.slice(-1)[0] || {};
      /* [isoWeek[1-7],week[7-6]] */
      const condition = moment(lastFlow[attr]).isSame(cur[attr], key); // 按照时间进行分组
      if (condition) {
        acc.splice(-1, 1, lastFlows.concat(cur));
        return acc;
      }
      return [...acc, [cur]];
    }, []);
  },
};

const install = Vue => Object.entries(filters).forEach(([key, func]) => Vue.filter(key, func));

// !!window && window.Vue && install(window.Vue) // auto install

export default {
  filters,
  install,
};
