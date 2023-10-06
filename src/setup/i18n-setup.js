import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueI18n from 'vue-i18n';
import store from '@/store/index';
import EN from '@/lang/EN.yml';
import JA from '@/lang/JA.yml';
import cookies from 'cookies-js';

// const { language } = store.state;
const language = 'EN';
Vue.use(VueI18n);
const [
  // eslint-disable-next-line no-unused-vars
  isProduction,
  localeDefault,
] = [
  process.env.NODE_ENV === 'production',
  cookies.get('language') || language || window.navigator.language,
];
const messages = {
  EN,
  JA,
};
const languages = Object.keys(messages);
const fallbackLocale = languages.includes(localeDefault)
  ? localeDefault
  : languages.find(lan => lan.indexOf(localeDefault.split('-')[0]) > -1) || localeDefault;

const i18n = new VueI18n({
  locale: fallbackLocale,
  fallbackLocale,
  silentTranslationWarn: true,
  messages,
});

export function setI18nLanguage(lang = fallbackLocale) { // 设置规则：完全匹配 -> 模糊匹配 -> 默认语言
  const { locale, availableLocales } = i18n;
  if (locale === lang) return lang;
  // eslint-disable-next-line no-shadow
  const language = availableLocales.includes(lang)
    ? lang
    : availableLocales.find(lan => lan.indexOf(lang.split('-')[0]) > -1) || localeDefault;
  [
    i18n.locale,
  ] = new Array(2).fill(language);

  document.querySelector('html').setAttribute('lang', language);
  return language;
}

export default i18n;
