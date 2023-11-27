import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
// utils
// import { isValidToken, setSession } from '../utils/jwt';
import { DEBUG_MODE, MINIMUM_ETH_BALANCE_TO_CLAIM, ROLES } from '@config';
import { AppService } from '@services';
import IdxDb from '@utils/indexdb';
import {
  clearStorage,
  getCurrentUser,
  getKey,
  getWallet,
  saveAccessToken,
  saveCurrentUser,
  saveKey,
} from '@utils/sessionManager';
import { Contract, ethers, providers } from 'ethers';

// ----------------------------------------------------------------------

const initialState = {
  isDebug: DEBUG_MODE,
  isAuthenticated: false, // should be false by default,
  isInitialized: false,
  token: null,
  user: null,
  keyData: null,
  chainUrl: null,
  chainId: null,
  chainWebSocket: null,
  claimToken: null,
  contracts: null,
  contractsFn: null,
  serverAddress: null,
  addresses: null,
  wallet: null,
  startBlockNumber: 0,
  roles: {
    isAdmin: false,
    isUser: false,
    isDonor: false,
  },
  claimId: null,
  beneficiary: null,
  ethBalance: null,
  hasEnoughEth: null,
  addToken: () => {},
  resetAuthState: () => {},
  addUser: () => {},
  addKey: () => {},
  logout: () => {},
  loadWallet: () => {},
  setClaimId: (beneficiary, claimId) => {},
};

const AppContext = createContext({
  ...initialState,
  method: 'jwt',
});

// ----------------------------------------------------------------------

AppProvider.propTypes = {
  children: PropTypes.node,
};

const localUser = getCurrentUser();

const localKey = getKey();

function AppProvider({ children }) {
  const [appState, setAppState] = useState(initialState);

  const setClaimId = (beneficiary, claimId) => {
    setAppState((prevState) => ({ ...prevState, beneficiary, claimId }));
  };

  const getAppSettings = async () => {
    try {
      const contractAddress = await AppService.getAppSettings('CONTRACT_ADDRESS');
      const blockchain = await AppService.getAppSettings('BLOCKCHAIN');

      const contractAddresses = Object.entries(contractAddress.data.rows[0].value).reduce((acc, [r, i]) => {
        acc[r] = i.address;
        return acc;
      }, {});

      const blockchainSettings = blockchain?.data?.rows[0]?.value;
      const contractDetails = Object.entries(contractAddress.data.rows[0].value).map(([acc, d], i) => ({name: acc, address: d.address, abi: d.abi}));

      return {
        contractDetails,
        contractAddresses,
        blockchainSettings,
      };
    } catch (err) {
      console.error('Unable to Load App Setting from Server', err);
    }
  };

  const loadWallet = async (wallet) => {
    if (!wallet) wallet = await getWallet();
    setAppState((prev) => ({ ...prev, wallet }));
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        let wallet = await getWallet();

        if (wallet) {
          const { blockchainSettings, contractAddresses, contractDetails } = await getAppSettings();
          wallet = wallet?.connect(
            new providers.StaticJsonRpcProvider(blockchainSettings?.rpcUrl, {
              chainId: blockchainSettings?.chainId,
            })
          );

          const contractsFn =  contractDetails.reduce((acc, d) => {
            acc[d.name] = new Contract(d.address, d.abi, wallet);
            return acc;
          }, {});
          
          const wei = await wallet?.provider?.getBalance(wallet?.address);
          const ethBalance = +ethers.utils.formatEther(wei);
          const hasEnoughEth = ethBalance >= +MINIMUM_ETH_BALANCE_TO_CLAIM;

          setAppState((prev) => ({
            ...prev,
            contractsFn,
            isAuthenticated: true,
            isInitialized: true,
            user: localUser,
            keyData: localKey,
            chainUrl: blockchainSettings.rpcUrl,
            chainId: blockchainSettings.chainId,
            chainWebSocket: blockchainSettings.chainWebSocket,

            contracts: contractAddresses,
            wallet,
            hasEnoughEth,
            ethBalance,
          }));
        } else {
          setAppState((prev) => ({ ...prev, isAuthenticated: false, isInitialized: true, wallet: null }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, []);

  const addToken = (payload) => {
    if (payload) {
      setAppState((prev) => ({ ...prev, token: payload }));
      saveAccessToken(payload);
    }
  };

  const addKey = (payload) => {
    if (payload) {
      setAppState((prev) => ({ ...prev, keyData: payload }));
      saveKey(payload);
    }
  };

  const addUser = (user) => {
    setAppState((prev) => ({ ...prev, user }));
    saveCurrentUser(user);
  };

  const resetAuthState = async () => {
    clearStorage();
    await IdxDb.resetDb();
    setAppState((prev) => ({
      ...prev,
      isInitialized: true,
      token: '',
      user: null,
      keyData: null,
      wallet: null,
      isAuthenticated: false,
    }));
  };

  const logout = async () => {
    await resetAuthState();
  };

  const roles = useMemo(
    () => ({
      isTayaba: appState.user?.roles?.includes(ROLES.TAYABA) || false,
      isSRSO: appState.user?.roles?.includes(ROLES.SRSO) || false,
      isUser: appState.user?.roles?.includes(ROLES.USER) || false,
    }),
    [appState.user]
  );

  const contextProps = useMemo(
    () => ({
      ...appState,
      resetAuthState,
      addToken,
      addUser,
      addKey,
      logout,
      roles,
      loadWallet,
      setClaimId,
    }),
    [appState, roles]
  );

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };

