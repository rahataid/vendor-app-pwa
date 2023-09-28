import client from '@utils/client';

export const AppService = {
  getAppSettings(name) {
    return client.get('/app/settings', {
      params: { name },
    });
  },

  getContract(contractName) {
    return client.get(`/app/contracts/${contractName}`);
  },

  getAdmins() {
    return client.get(`/app/admins`);
  },
};
