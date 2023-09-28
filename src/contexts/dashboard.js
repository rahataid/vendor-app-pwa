import { VendorService } from '@services';
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useState } from 'react';

const initialState = {
  vendorInfo: null,
  getVendorInfo: () => {},
};

const DashboardContext = createContext(initialState);

export const DashboardProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getVendorInfo = useCallback(async (params) => {
    const { data } = await VendorService.getVendorByWalletAddress(params);

    setState((prevState) => ({ ...prevState, vendorInfo: data }));
  }, []);

  const contextValue = {
    ...state,
    getVendorInfo,
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardContext');
  }
  return context;
};
