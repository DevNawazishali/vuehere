import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueResource from 'vue-resource';
import directive from '@/plugins/directive';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import App from './App.vue';
import store from './store';
import i18n from './setup/i18n-setup';
import filter from './plugins/filters'; // 过滤
import mixins from './plugins/mixins'; // 混入
import router from './router/router-setup';
import './icons';
// eslint-disable-next-line import/order
import {
  Button, Pagination, Select, Option, Drawer, Dialog, Form, FormItem, Input, CheckboxGroup, Checkbox, Image,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.less';
import '@/assets/css/pageView.less';
import '@/assets/css/global.css';
import './assets/font/iconfont.css';
import './assets/css/media.less';


// 设置语言
locale.use(lang);

Vue.mixin(mixins);
Vue.use(filter);
Vue.use(directive);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Drawer);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Pagination);
Vue.use(CheckboxGroup);
Vue.use(Image);
Vue.config.productionTip = false;

Vue.use(VueResource);

// Vue.use(element, { i18n: (key, value) => i18n.t(key, value), size: 'small' });

router.afterEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
  if (next) next();
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
