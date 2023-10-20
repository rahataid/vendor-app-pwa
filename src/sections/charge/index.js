import TransparentCard from '@components/card/TransparentCard';
import { useProjectContext } from '@contexts/projects';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { LoadingButton } from '@mui/lab';
import { Button, CardContent, Divider, Stack, TextField, Typography } from '@mui/material';
import { BeneficiaryService } from '@services/beneficiary';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAppContext } from 'src/auth/useAppContext';

const ChargeBeneficiary = () => {
  const snackBar = useSnackbar();
  const router = useRouter();
  const { handleError, throwError } = useErrorHandler();
  const { user, setClaimId, wallet, addUser, hasEnoughEth } = useAppContext();
  const { requestTokenFromBeneficiary, getBeneficiaryBalance } = useProjectContext();
  // loading: chargingBeneficiary
  // disabled: !chainData?.isApproved || !hasEnoughEth;
  const [inputPhone, setInputPhone] = useState('');
  const [inputQr, setInputQr] = useState('');
  const [useQrCode, setUseQrCode] = useState(false);
  const [chargingBeneficiary, setChargingBeneficiary] = useState(false);

  const handleSubmit = async (chargeBeneficiaryInput) => {
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
  };

  const handleSubmitQr = async (chargeBeneficiaryInputQr) => {
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
  };

  const handleInput = (e) => {
    setInputPhone(e.target.value);
  };

  const handleInputQr = (e) => {
    setInputQr(e.target.value);
  };

  const PhoneComponent = (
    <Stack>
      <Divider sx={{ marginBottom: 2, border: 0 }} />
      <Typography variant="body2">
        You are about to send tokens to this beneficiary. Please enter phone number of the beneficiary.
      </Typography>
      <Divider sx={{ marginBottom: 2, border: 0 }} />
      <TextField
        autoFocus
        margin="dense"
        id="walletAddress"
        label="Beneficiary Phone Number"
        fullWidth
        variant="standard"
        value={inputPhone}
        onChange={handleInput}
        InputProps={{
          sx: {
            '& input': {
              '&::placeholder': {
                color: 'grey',
              },
            },
          },
        }}
      />
    </Stack>
  );

  const QRComponent = (
    <Stack>
      <Divider sx={{ marginBottom: 2, border: 0 }} />
      <Typography variant="body2">
        You are about to send tokens to this beneficiary. Please enter the QR code of the beneficiary.
      </Typography>
      <Divider sx={{ marginBottom: 2, border: 0 }} />
      <TextField
        autoFocus
        margin="dense"
        id="walletAddress2"
        label="Beneficiary QR Code"
        fullWidth
        variant="standard"
        value={inputQr}
        onChange={handleInputQr}
      />

      {/* <QRCode inputValue={inputValueQr} handleInput={handleInputQr} /> */}
      {/* <QRScanner loading={loading} onResult={handleQRScanner} scanData={inputValue} /> */}
    </Stack>
  );

  return (
    <TransparentCard style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Stack style={{ flex: 1 }}>
          <Typography variant="h6">Charge Beneficiary</Typography>
          {useQrCode && QRComponent}
          {!useQrCode && PhoneComponent}
        </Stack>
        <Stack style={{ alignSelf: 'flex-end', width: '100%' }}>
          <Stack style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%', gap: 5 }}>
            {useQrCode ? (
              <LoadingButton
                disabled={!inputQr}
                loading={chargingBeneficiary}
                variant={'contained'}
                onClick={() => handleSubmitQr(inputQr)}
              >
                Charge
              </LoadingButton>
            ) : (
              <LoadingButton
                disabled={!inputPhone}
                loading={chargingBeneficiary}
                variant={'contained'}
                onClick={() => handleSubmit(inputPhone)}
              >
                Charge
              </LoadingButton>
            )}

            <Button variant="outlined" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={() => setUseQrCode((prev) => !prev)}>
              {useQrCode ? 'Enter Phone Number' : 'Use QR Code'}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </TransparentCard>
  );
};

ChargeBeneficiary.propTypes = {
  fetchingChainData: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  footer: PropTypes.node,
  handleQRScanner: PropTypes.func.isRequired,
  inputValueQr: PropTypes.string.isRequired,
  handleInputQr: PropTypes.func.isRequired,
  handleSubmitQr: PropTypes.func.isRequired,
};

export default ChargeBeneficiary;
