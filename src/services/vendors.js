import clientApi from '@utils/client';

export const VendorService = {
  addVendor(data) {
    return clientApi.post('/vendors', data);
  },
  register(data) {
    return clientApi.post('/vendors/register', data);
  },

  getVendorsList(params) {
    return clientApi.get('/vendors', {
      params,
    });
  },

  getVendorById(id) {
    return clientApi.get(`/vendors/${id}`);
  },

  checkIfBeneficiaryExists(walletAddress) {
    return clientApi.post(`/vendors/checkIfBeneficiaryExists`, {
      walletAddress,
    });
  },

  getVendorByWalletAddress(params) {
    return clientApi.get(`/vendors/${params.walletAddress}`);
  },

  checkIfPhoneNoExists(phone) {
    return clientApi.get(`/vendors`, {
      params: {
        phone,
      },
    });
  },
};
