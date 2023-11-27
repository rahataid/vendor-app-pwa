// import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import TokenInfo from './TokenInfo';
// import MoreInfo from './MoreInfo';
import { SPACING } from '@config';
import { useDashboardContext } from '@contexts/dashboard';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from 'src/auth/useAppContext';
import AlertInformation from './AlertInformation';
import ChargeDialog from './ChargeDialog';
// import Transactions from './Transactions';
import { useDataCacher } from '@hooks/contracts/useDataCacher';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { BeneficiaryService } from '@services/beneficiary';
import { useProject } from '@services/contracts/useProject';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Transactions from './Transactions';

const DashboardView = () => {
  const snackBar = useSnackbar();
  const router = useRouter();
  const { getVendorInfo, vendorInfo } = useDashboardContext();
  const { user, setClaimId, wallet, addUser, hasEnoughEth } = useAppContext();
  const { handleError, throwError } = useErrorHandler();

  const {
    getVendorAllowance,
    pendingWheelsToAccept,
    getBalance,
    acceptH2OByVendors,
    contract: CVAProjectContract,
    communityContract,
    RahatToken,
    isProjectLocked,
    requestTokenFromBeneficiary,
    isVendorApproved,
    getBeneficiaryBalance,
    getProjectBalance
  } = useProject();

  const [chargeBeneficiaryModal, setChargeBeneficiaryModal] = useState(false);
  // const [chargeBeneficiaryInput, setChargeBeneficiaryInput] = useState('');
  // const [chargeBeneficiaryInputQr, setChargeBeneficiaryInputQr] = useState('');
  const [chargingBeneficiary, setChargingBeneficiary] = useState(false);

  const [acceptingAllowance, setAcceptingAllowance] = useState(false);
  const [fetchingChainData, setFetchingChainData] = useState(false);
  const [transactions, setTransactions] = useState([]);
  
  const dataCacherOptions = {loadbyDefault:false};

  const [allowance, getAllowance] = useDataCacher("CVAProject-getVendorAllowance", getVendorAllowance, [user?.walletAddress], {loadbyDefault:false});
  const [pendingWheels, getPendingWheels] = useDataCacher("CVAProject-pendingWheelsToAccept", pendingWheelsToAccept, [user?.walletAddress], dataCacherOptions);
  const [balance, getVendorBalance] = useDataCacher("CVAProject-getBalance", getBalance, [user?.walletAddress], dataCacherOptions);
  const [projectLocked, getProjectStatus] = useDataCacher("CVAProject-isProjectLocked", isProjectLocked, [], dataCacherOptions);
  const [isApproved, checkVendorStatus] = useDataCacher("CVAProject-isVendorApproved", isVendorApproved, [user?.walletAddress], dataCacherOptions);

  const refreshChainData = useCallback(async () => {
    setFetchingChainData(true);
    Promise.all([
      getAllowance(),
      getPendingWheels(),
      getVendorBalance(),
      getProjectStatus(),
      checkVendorStatus(),
    ]).then(() => setFetchingChainData(false));
  }, [user?.walletAddress]);

//    setChainData({ pendingWheelsToAccept: pendingWheels, disbursed: balance, projectLocked, isApproved });
  const getVendorTransactions = useCallback(async () => {
    // const transactions = await ChainCacheService.listTransactionsByVendor(
    //   contracts[CONTRACTS.CVAPROJECT],
    //   user?.walletAddress,
    //   {
    //     limit: 4,
    //   }
    // );
    // const formatted = transactions.map((t) => ({
    //   ...t,
    //   amount: t.params.find((param) => param.name === 'amount')?.value,
    // }));

    setTransactions([]);
    // setTransactions(formatted);
  }, []);

  useEffect(() => {
    refreshChainData();
    getVendorTransactions();
  }, [user?.walletAddress]);

  useEffect(() => {
    if (!wallet?.address) return;
    getVendorInfo({
      walletAddress: wallet?.address,
    });
  }, [wallet]);

  useEffect(() => {
    if (!user && vendorInfo?.walletAddress) {
      addUser(vendorInfo);
    }
  }, [user, vendorInfo?.walletAddress]);

  const AlertInformationProps = {
    fetchingChainData,
    hasEnoughEth,
    acceptAllowance: async () => {
      try {
        setAcceptingAllowance(true);
        await acceptH2OByVendors(pendingWheels);
        setAcceptingAllowance(false);
        refreshChainData();
      } catch (err) {
        handleError(err);
        setAcceptingAllowance(false);
      }
    },
    pendingTokens: pendingWheels,
    isVendorApproved: isApproved,
    acceptingAllowance,
  };

  const TokenInfoProps = {
    fetchingChainData,
    chainData : {allowance, disbursed: balance},
    allowance,
    vendorInfo,
  };

  const ChargeBeneficiaryModal = {
    fetchingChainData,
    hasEnoughEth,
    open: chargeBeneficiaryModal,
    handleModal: () => {
      // if (!chainData.projectLocked) {
      //   snackBar.enqueueSnackbar('Project is not locked', { variant: 'error' });
      //   return;
      // }
      setChargeBeneficiaryModal((prev) => !prev);
    },
    // load the charging beneficiary component
    loading: chargingBeneficiary,
    // disable the component if the vendor is not approved or the project is locked
    // disabled: false,
    disabled: !isApproved || !hasEnoughEth,
    // set the input value to the charge beneficiary input
    // inputValue: chargeBeneficiaryInput,
    // set the input to the charge beneficiary input
    // handleInput: (e) => setChargeBeneficiaryInput(e.target.value),

    // set the input to the charge beneficiary QR CODE
    // inputValueQr: chargeBeneficiaryInputQr,
    // handleInputQr: (e) => setChargeBeneficiaryInputQr(e.target.value),
    // handle the QR scanner
    // handleQRScanner: async (result) => {
    //   if (result?.text && !chargingBeneficiary) {
    //     // && chargeBeneficiaryInput.length === 0
    //     // const address = result.text.trim();
    //     // Check if the address is a valid ethereum address
    //     setChargingBeneficiary(true);

    //     const phoneNumber = extractNumber(result?.text);

    //     if (phoneNumber) {
    //       setChargeBeneficiaryInput(phoneNumber);
    //       const {
    //         data: { rows: beneficiaryData },
    //       } = await BeneficiaryService.getBeneficiary({ phone: phoneNumber });
    //       if (beneficiaryData) {
    //         const walletAddress = beneficiaryData[0]?.walletAddress;
    //         // Check if the address is registered as a beneficiary
    //         // const isBeneficiary = await VendorService.checkIfBeneficiaryExists(walletAddress);
    //         if (!walletAddress) {
    //           // If the address is not registered as a beneficiary, display an error message
    //           snackBar.enqueueSnackbar('Beneficiary does not exist', { variant: 'error' });
    //           setChargingBeneficiary(false);

    //           return;
    //         } else {
    //           // If the address is registered as a beneficiary, request a claim token from the beneficiary
    //           const claimId = await requestTokenFromBeneficiary(walletAddress, 1);

    //           if (claimId) {
    //             // If the claim token is successfully requested, save the claim token in the session storage
    //             await setClaimId(walletAddress, claimId);
    //             // Redirect to the OTP page
    //             router.push(`/claim/otp`);
    //           }
    //         }
    //       } else {
    //         // If the address is not a valid ethereum address, display an error message
    //         snackBar.enqueueSnackbar('Invalid address. Use a valid one.', { variant: 'error' });
    //         setChargingBeneficiary(false);
    //         setChargeBeneficiaryInput('');
    //       }
    //     }
    //     setChargeBeneficiaryInput('');
    //     setChargingBeneficiary(false);
    //   }
    // },
    // handle phone number submit
    handleSubmit: async (chargeBeneficiaryInput) => {
      // This code is used to charge a beneficiary
      // The beneficiary is the one who will be charged
      // The claimId is the claimId of the beneficiary

      try {
        // 1. Set charging beneficiary to true
        setChargingBeneficiary(true);

        // 2. Get beneficiary details
        const {
          data: { rows: beneficiaryData },
        } = await BeneficiaryService.getBeneficiary({ phone: chargeBeneficiaryInput });

        // 3. Check if beneficiary exists
        if (beneficiaryData.length === 0) {
          setChargingBeneficiary(false);
          snackBar.enqueueSnackbar('Beneficiary does not exist', { variant: 'error' });
          return;
        }

        // 4. Get wallet address
        const walletAddress = beneficiaryData[0].walletAddress;

        // 5. Get beneficiary balance
        const beneficiaryBalance = await getBeneficiaryBalance(walletAddress);
        if (beneficiaryBalance == 0) throwError('Not enough balance');

        // 6. Request token from beneficiary
        const claimId = await requestTokenFromBeneficiary(walletAddress, 1);
        console.log(claimId);

        // 7. Check if claimId is returned
        if (claimId) {
          setClaimId(walletAddress, claimId);
          router.push(`/claim/otp`);
        }

        // 8. Set charging beneficiary to false
        setChargingBeneficiary(false);

        // 9. Close beneficiary modal
        // setChargeBeneficiaryModal(!chargeBeneficiaryModal);
      } catch (err) {
        handleError(err);
        setChargingBeneficiary(false);
      }
    },
    handleSubmitQr: async (chargeBeneficiaryInputQr) => {
      try {
        // 1. Set charging beneficiary to true
        setChargingBeneficiary(true);
        const walletAddress = chargeBeneficiaryInputQr;

        // 2. Check if the address is registered as a beneficiary
        const allBeneficiary = await BeneficiaryService.getBeneficiaryByWalletAddress(walletAddress);
        const {
          data: { rows: BeneficiaryData },
        } = allBeneficiary;
        if (!BeneficiaryData?.length) {
          setChargingBeneficiary(false);
          snackBar.enqueueSnackbar('Beneficiary does not exist', { variant: 'error' });
          return;
        }

        // 3. Get beneficiary balance
        let beneficiaryBalance = await getBeneficiaryBalance(walletAddress);
        if (beneficiaryBalance == 0) throwError('Not enough balance');

        // 4. Request token from beneficiary
        const claimId = await requestTokenFromBeneficiary(walletAddress, beneficiaryBalance);

        // 5. Check if claimId is returned
        if (claimId) {
          setClaimId(walletAddress, claimId);
          router.push(`/claim/otp`);
        }

        // 6. Set charging beneficiary to false
        setChargingBeneficiary(false);

        // 7. Close beneficiary modal
        // setChargeBeneficiaryModal(!chargeBeneficiaryModal);
      } catch (err) {
        handleError(err);
        setChargingBeneficiary(false);
      }
    },
  };

  // if (fetchingChainData) return <LoadingScreen />;

  return (
    <Stack style={{ display: 'flex', flex: 1 }}>
      <Stack spacing={SPACING.GRID_SPACING} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Stack style={{ flex: 1 }}>
          <AlertInformation {...AlertInformationProps} />
          <TokenInfo {...TokenInfoProps} />
        </Stack>
        {/* <MoreInfo /> */}
        <Stack style={{ alignSelf: 'flex-end', width: '100%' }}>
          <ChargeDialog {...ChargeBeneficiaryModal} />
        </Stack>

        {transactions.length ? <Transactions transactions={transactions} /> : ''}
      </Stack>
    </Stack>
  );
};

DashboardView.propTypes = {};

export default DashboardView;
