import { CHAINCACHE_APPID, CHAINCACHE_URL } from '@config';
import axios from 'axios';

let chainCacher = axios.create({
  baseURL: `${CHAINCACHE_URL}`,
  timeout: 10000,
  headers: { 'app-uuid': CHAINCACHE_APPID },
});

export const ChainCacheService = {
  listContractTransactions: async (address) => {
    let response = await chainCacher.get(`/contracts/${address}/events?names=ClaimAssigned,ClaimProcessed`);
    return response.data;
  },

  listTransactionsByVendor: async (contractAddress, vendorAddress, params) => {
    let response = await chainCacher.get(`/contracts/${contractAddress}/events`, {
      params: {
        ...params,
        names: 'ClaimProcessed',
      },
    });
    //

    const rows = response.data.data.rows.filter(
      (row) => row.params.find((param) => param.name === 'vendor')?.value === vendorAddress.toLowerCase()
    );
    return rows;
  },

  listTransactions: async (params) => {
    let response = await chainCacher.get(`/transactions`, {
      params,
    });
    return response.data;
  },

  getTransaction: async (txHash) => {
    let response = await chainCacher.get(`/transactions/${txHash}`);
    return response.data;
  },
};
