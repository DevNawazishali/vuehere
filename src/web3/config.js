import WalletConnectProvider from '@walletconnect/web3-provider';
// eslint-disable-next-line import/named
import { infuraId } from '@/setup/address';

// import Torus from '@toruslabs/torus-embed';

// import { Bitski } from 'bitski';

// eslint-disable-next-line global-require
const { USDT_ADDRESS } = process.env.NODE_ENV === 'production'
  ? require('./constants')
  : require('./constants.dev');
//

const providerOptions = {
  // https://docs.walletconnect.org/
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId,
      rpc: {
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        56: 'https://bsc-dataseed.binance.org/',
        1: `https://mainnet.infura.io/v3/${infuraId}`,
        592: `https://rpc.astar.network:8545/`,
      },
    },
    // display: {
    //   description: "Scan with a wallet to connect",
    // },
  },
  // https://github.com/torusresearch/torus-embed#readme
  // torus: {
  //   package: Torus,
  // },
  //   // https://docs.fortmatic.com/
  // fortmatic: {
  //   package: Fortmatic,
  //   options: {
  //     key: 'xxxxxxxxxx', // TODO key
  //   },
  // },
  //   // https://docs.authereum.com/integration
  // authereum: {
  //   package: Authereum,
  // },
  //   //https://docs.bitski.com/
  // bitski: {
  //   package: Bitski,
  //   options: {
  //     clientId: 'xxxxxxxxxx', // TODO
  //     callbackUrl: `${window.location.href}bitski-callback.html`,
  //   },
  // },
};

export { USDT_ADDRESS, providerOptions };
