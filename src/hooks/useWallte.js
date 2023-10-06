/* eslint-disable */
import Web3 from "web3";
import Decimal from "decimal.js";
import Web3Modal from "web3modal";
import { getChainData } from "@/web3/tools";
import { providerOptions } from "@/web3/config";

import { tip } from "@/utils/utils";

import store from "../store";

let Accounts = null;

export let chainId = 592; // 默认链，测试环境为BSC，正式环境为astar
const bscChainId = 56;  // BSC链，测试链97 正式链56
export const astarChainId = 592; // astar链

const isBSC = () => {
  if(window.location.href.indexOf("presale") > 0){
    chainId = bscChainId;
  }
}
isBSC();

const web3_ = new Web3(new Web3(getChainData(chainId).rpc_url));

let web3 = web3_;
let web3Provider;

const web3Modal = new Web3Modal({
  theme: "light",
  network: getChainData(chainId).network,
  cacheProvider: true,
  disableInjectedProvider: false,
  providerOptions,
});

const resetApp = async () => {
  if (web3Provider && web3Provider.close) {
    await web3Provider.close();
  }
  await web3Modal.clearCachedProvider();
  await web3.eth.clearSubscriptions();

  Accounts = null;
  web3Provider = undefined;
  web3 = web3_;
};

const subscribeProvider = async () => {
  if (!web3Provider.on) {
    return;
  }
  web3Provider.on("disconnect", async () => {
    await disconnect();
  });

  web3Provider.on("accountsChanged", async (accounts) => {
    // eslint-disable-next-line prefer-destructuring
    // Accounts = accounts[0];
    await disconnect();
  });
  web3Provider.on("chainChanged", async () => {
    await disconnect();
    // window.location.reload();
    // await onConnect();
  });
};

export const updateChainId = async () =>{
  chainId = astarChainId;
  const is = store.state.isWallet;
  if(is){
    await disconnect();
    // return tip("Please set up network to ASTAR");
  }
}

export const onConnect = async () => {
  // await resetApp();
  if (web3Modal.cachedProvider) {
    await web3Modal.connect();
  }
  web3Provider = await web3Modal.connect();
  await subscribeProvider();
  web3 = new Web3(web3Provider);
  // eslint-disable-next-line no-underscore-dangle
  const chainId_ = await web3.eth.getChainId();
  if (chainId_ != chainId && chainId_ != bscChainId && chainId_ != astarChainId) {
    return new Promise(() => tip("Please switch to the corresponding chain"));
  }
  // eslint-disable-next-line prefer-destructuring
  Accounts = (await web3.eth.getAccounts())[0];

  return Accounts;
};

export const getChainId = async ()=>{
  return await web3.eth.getChainId();
}

export const disconnect = async () => {
  store.commit("setAccount", null);
  store.commit("setisWallet", false);
  localStorage.removeItem("walletconnect");
  await resetApp();
};

export const getAccounts = async () => {
  return await (
    await web3.eth.getAccounts()
  )[0];
};


export const web3Contract = () => {
  return web3;
};
