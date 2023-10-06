import { isMobile } from '@/utils/utils';
import Index from './views/home/Index.vue';
import mobileIndex from './views/mobileHome/Index.vue';
import BuyNft from './views/home/BuyNft.vue';
import MobileBuyNft from './views/mobileHome/MobileBuyNft.vue';
import MyNft from './views/home/MyNft.vue';
import MobileMyNft from './views/mobileHome/MobileMyNft.vue';
import Presale from './views/home/Presale.vue'; // 预售页面
import MobilePresale from './views/mobileHome/MobilePresale.vue'; // 预售h5页面
import PresaleV2 from './views/home/PresaleV2.vue'; // 预售页面
import MobilePresaleV2 from './views/mobileHome/MobilePresaleV2.vue'; // 预售h5页面

export default [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ './Main.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: isMobile() ? mobileIndex : Index,
        // component: () => import(/* webpackChunkName: "home" */ './views/home/Index.vue'),
      },
      {
        path: '/nft',
        name: 'nft',
        // component: () => import(/* webpackChunkName: "nft" */ './views/home/Index.vue'),
        component: isMobile() ? mobileIndex : Index,
      },
      {
        path: 'buyNft',
        name: 'buyNft',
        component: isMobile() ? MobileBuyNft : BuyNft,
        // component: () => import(/* webpackChunkName: "buyNft" */ './views/home/BuyNft.vue'),
      },
      {
        path: 'myNft',
        name: 'myNft',
        component: isMobile() ? MobileMyNft : MyNft,
        // component: () => import(/* webpackChunkName: "myNft" */ './views/home/MyNft.vue'),
      },
      {
        path: 'presale',
        name: 'presale',
        component: isMobile() ? MobilePresale : Presale,
        // component: () => import(/* webpackChunkName: "invite" */ 'components/Presale.vue'),
      }, {
        path: 'presalev2',
        name: 'presalev2',
        component: isMobile() ? MobilePresaleV2 : PresaleV2,
        // component: () => import(/* webpackChunkName: "invite" */ 'components/Presale.vue'),
      },
    ], // presalev2
  },
  {
    path: '/mobileMenu',
    name: 'mobileMenu',
    component: () => import('./components/MobileMenu.vue'),
  },
  {
    path: '/mobile',
    name: 'mobileMain',
    component: () => import(/* webpackChunkName: "main" */ './MobileMain.vue'),
    children: [
      {
        path: '',
        name: 'mobileHome',
        component: () => import(/* webpackChunkName: "home" */ './views/mobileHome/Index.vue'),
      },
      {
        path: 'mobileNft',
        name: 'mobileNft',
        component: () => import(/* webpackChunkName: "mobileNft" */ './views/mobileHome/Index.vue'),
      },
      {
        path: 'mobileBuyNft',
        name: 'mobileBuyNft',
        component: () => import(/* webpackChunkName: "mobileBuyNft" */ './views/mobileHome/MobileBuyNft.vue'),
      },
      {
        path: 'mobileMyNft',
        name: 'mobileMyNft',
        component: () => import(/* webpackChunkName: "mobileMyNft" */ './views/mobileHome/MobileMyNft.vue'),
      },
    ],
  },
];
