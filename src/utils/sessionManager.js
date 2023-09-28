import { DEFAULT_PASSCODE } from '@config';
import jwtDecode from 'jwt-decode';
import Web3Utils from './web3Utils';

export const getCurrentUser = () => {
  let user = null;
  const data = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : '';
  if (data) user = JSON.parse(data);
  return user;
};

export const saveCurrentUser = (userData) =>
  typeof window !== 'undefined' ? localStorage.setItem('currentUser', JSON.stringify(userData)) : '';

export const saveKey = (key) => (typeof window !== 'undefined' ? localStorage.setItem('key', JSON.stringify(key)) : '');
export const getKey = () => (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('key')) : '');

export const getWalletAddressFromPrivateKey = () => {
  const privateKey = getKey();

  return Web3Utils.getWallet(privateKey);
};

export const getAccessToken = () => (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '');

export const saveAccessToken = (accessToken) =>
  typeof window !== 'undefined' ? localStorage.setItem('accessToken', accessToken) : null;

export const deleteAccessToken = () => (typeof window !== 'undefined' ? localStorage.removeItem('accessToken') : null);

export const clearStorage = () => {
  typeof window !== 'undefined' ? localStorage.clear() : null;
};

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const saveWalletInfo = (wallet) => (typeof window !== 'undefined' ? localStorage.setItem('wallet', wallet) : '');

export const getWallet = () => {
  const data = typeof window !== 'undefined' ? localStorage.getItem('wallet') : '';
  return Web3Utils.getWalletFromJson(data, DEFAULT_PASSCODE);
};
