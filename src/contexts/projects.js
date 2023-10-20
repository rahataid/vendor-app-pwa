import { useProject } from '@services/contracts/useProject';
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const initialState = {
  contractWS: null,
  contract: null,
  communityContract: null,
  RahatToken: null,
  allContractsLoaded: null,
};

const ProjectsContext = createContext(initialState);

export const ProjectProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const {
    contractWS,
    contract,
    communityContract,
    RahatToken,
    allContractsLoaded,
    isProjectLocked,
    getBalance,
    getBeneficiaryBalance,
    sendH2OWheelsToVendor,
    pendingWheelsToAccept,
    acceptH2OByVendors,
    getVendorAllowance,
    isVendorApproved,
    requestTokenFromBeneficiary,
    addOtpToClaim,
    processTokenRequest,
    beneficiaryBalance,
    beneficiaryCounts,
  } = useProject();

  const contextValue = {
    ...state,
    contractWS,
    contract,
    communityContract,
    RahatToken,
    allContractsLoaded,
    isProjectLocked,
    getBalance,
    getBeneficiaryBalance,
    sendH2OWheelsToVendor,
    pendingWheelsToAccept,
    acceptH2OByVendors,
    getVendorAllowance,
    isVendorApproved,
    requestTokenFromBeneficiary,
    addOtpToClaim,
    processTokenRequest,
    beneficiaryBalance,
    beneficiaryCounts,
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProjectContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
