import { CONTRACTS } from '@config';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { ethers } from 'ethers';
import { useAppContext } from 'src/auth/useAppContext';

export const useProject = () => {
  // let { serverAddress } = useAppContext();
  const {contractsFn, contracts} = useAppContext();
  const contract = contractsFn?.[CONTRACTS.CVAPROJECT];
  const communityContract = contractsFn?.[CONTRACTS.COMMUNITY];
  const RahatToken = contractsFn?.[CONTRACTS.RAHATTOKEN];
  const RahatClaim = contractsFn?.[CONTRACTS.CLAIM];

  const { handleContractError } = useErrorHandler();

  const allContractsLoaded = contract && communityContract && RahatToken ? true : false;
  return {
    contract,
    communityContract,
    RahatToken,
    allContractsLoaded,

    // project functions
    isProjectLocked: () => contract?.isLocked(),

    getProjectBalance: async () => {
      let balance = await RahatToken?.balanceOf(contracts[CONTRACTS.CVAPROJECT]);
      return balance?.toString();
    },

    getBalance: async (walletAddress) => {
      // (await RahatToken?.balanceOf(walletAddress))?.toNumber();
      let balance = await RahatToken?.balanceOf(walletAddress);
      balance = balance?.toNumber();
      return balance;
    },

    getBeneficiaryBalance: async (walletAddress) => {
      let balance = await contract?.beneficiaryClaims(walletAddress).catch(handleContractError);
      balance = balance?.toString();
      return balance;
    },

    // should transfer allowances to vendor
    // transferAllowanceToVendor
    sendH2OWheelsToVendor(vendorAddress, amount) {
      return contract?.createAllowanceToVendor(vendorAddress, amount).catch(handleContractError);
    },

    // vendorAllowancePending
    pendingWheelsToAccept: async (vendorAddress) => (await contract?.vendorAllowancePending(vendorAddress))?.toNumber(),

    //Should accept allowance from project
    acceptH2OByVendors: async (numberOfTokens) => await contract?.acceptAllowanceByVendor(numberOfTokens.toString()),
    getVendorAllowance: async (vendorAddress) => (await contract?.vendorAllowance(vendorAddress))?.toNumber(),
    isVendorApproved: async (vendorAddress) => {
      const vendorRole = await communityContract?.VENDOR_ROLE();
      // return communityContract?.hasRole(vendorRole, vendorAddress);
      const casess = await communityContract?.hasRole(vendorRole, vendorAddress);
      return casess;
    },

    //   Beneficiaries
    requestTokenFromBeneficiary: async (to, amount) => {
      try {
        const transaction = await contract['requestTokenFromBeneficiary(address,uint256)'](
          to,
          amount?.toString()
          // TODO: change this to the actual address
          // '0xc0ECad507A3adC91076Df1D482e3D2423F9a9EF9'
        );

        const receipt = await transaction.wait();
        const event = receipt.events[0];
        const decodedEventArgs = RahatClaim?.interface.decodeEventLog('ClaimCreated', event.data, event.topics);
        return decodedEventArgs?.claimId?.toNumber();
      } catch (err) {
        console.log('err', err);
        handleContractError(err);
      }
    },
    addOtpToClaim: async (claimId, otp) => {
      try {
        const otpHash = ethers.utils.id(otp);
        const expiryDate = Math.floor(Date.now() / 1000) + 86400;
        await RahatClaim?.addOtpToClaim(claimId, otpHash, expiryDate);

        const finalClaim = await RahatClaim?.claims(claimId);
        return finalClaim;
      } catch (err) {
        console.log('err', err);
        handleContractError(err);
      }
    },
    processTokenRequest: (beneficiary, otp) =>
      contract?.processTokenRequest(beneficiary, otp).catch(handleContractError),
    beneficiaryBalance: (walletAddress) => contract?.beneficiaryClaims(walletAddress),
    beneficiaryCounts: () => contract?.beneficiaryCount(),
  };
};
