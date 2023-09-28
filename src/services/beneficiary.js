import clientApi from '@utils/client';

export const BeneficiaryService = {
  getBeneficiary(params) {
    return clientApi.get(`/beneficiaries`, {
      params,
    });
  },

  getBeneficiaryByWalletAddress(walletAddress) {
    return clientApi.get(`/beneficiaries?walletAddress=${walletAddress}`);
  },
};
