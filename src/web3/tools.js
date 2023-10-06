// eslint-disable-next-line import/named
import { infuraId } from '@/setup/address';
import supportedChains from './chains';

// eslint-disable-next-line import/prefer-default-export
export function getChainData(chainId) {
  const chainData = supportedChains.filter(chain => chain.chain_id === chainId)[0];
  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = infuraId;

  if (
    chainData.rpc_url.includes('infura.io')
    && chainData.rpc_url.includes('%API_KEY%')
    && API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);
    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}
