import { DEFAULT_PASSCODE } from '@config';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { VendorService } from '@services/vendors';
import { saveWalletInfo } from '@utils/sessionManager';
import Web3Utils from '@utils/web3Utils';
import { createContext, useContext, useState } from 'react';
import { useAppContext } from 'src/auth/useAppContext';

const initialState = {
  handleRegisterForm: () => {},
  formValues: {},
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { loadWallet, addUser } = useAppContext();
  const { handleError } = useErrorHandler();

  const handleRegisterForm = async (data) => {
    try {
      const walletValue = Web3Utils.createRandomWallet(data?.phone);
      const createData = {
        ...data,
        walletAddress: walletValue?.address,
      };
      const vendor = await VendorService.addVendor(createData);
      saveWalletInfo(await walletValue.encrypt(DEFAULT_PASSCODE, { scrypt: { N: 2 } }));

      addUser(vendor.data);
      await loadWallet(walletValue);
      return walletValue;
    } catch (err) {
      console.log('Error:', err);
    }

    // try {
    //   const signPayload = await AuthService.getWalletSignPayload(walletValue?.address);
    //   const signature = await walletValue?.signMessage(signPayload.data.data);

    //   if (signature) {
    //     const vendorRegistration = await VendorService.register({
    //       vendorData: data,
    //       signData: {
    //         signature,
    //         signPayload: signPayload.data.data,
    //       },
    //     });
    //     saveWalletInfo(
    //       await walletValue.encrypt(DEFAULT_PASSCODE, {
    //         scrypt: {
    //           N: 2,
    //         },
    //       })
    //     );
    //     addUser(vendorRegistration.data.data.data);
    //     await loadWallet(walletValue);
    //     return walletValue;
    //   }
    // } catch (err) {
    //   handleError(err);
    // }
  };

  const contextValue = {
    ...state,
    handleRegisterForm,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
