import { LoadingButton } from '@mui/lab';
import { Alert, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const AlertInformation = ({
  fetchingChainData,
  pendingTokens,
  isVendorApproved = true,
  acceptAllowance,
  acceptingAllowance,
  hasEnoughEth,
}) => {
  const router = useRouter();

  if (fetchingChainData) {
    return (
      // <Stack>
      //   <Skeleton variant="rounded" animation="wave" sx={{ bgcolor: '#e5e8eb', width: '100%', height: 72 }} />
      // </Stack>
      <></>
    );
  }

  if (!hasEnoughEth && isVendorApproved) {
    return (
      <Stack>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => router.reload()}>
              Reload
            </Button>
          }
        >
          You don't have enough ETH to pay for gas. Please add some ETH to your wallet.
        </Alert>
      </Stack>
    );
  }

  if (!isVendorApproved) {
    return (
      <Stack>
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={() => router.reload()}>
              Reload
            </Button>
          }
        >
          You have NOT been approved yet. Please contact admin.!
        </Alert>
      </Stack>
    );
  }

  if (pendingTokens > 0) {
    return (
      <Stack>
        <Alert
          severity="info"
          action={
            <LoadingButton
              loading={acceptingAllowance}
              loadingPosition="start"
              // startIcon={<SaveIcon />}
              color="inherit"
              size="small"
              onClick={() => acceptAllowance(pendingTokens)}
            >
              Accept
            </LoadingButton>
          }
        >
          You have {pendingTokens} pending tokens to be disbursed.
        </Alert>
      </Stack>
    );
  }

  return '';
};

AlertInformation.propTypes = {
  fetchingChainData: PropTypes.bool,
  pendingTokens: PropTypes.number,
  isVendorApproved: PropTypes.bool,
  acceptAllowance: PropTypes.func,
  acceptingAllowance: PropTypes.bool,
  hasEnoughEth: PropTypes.bool,
};

export default AlertInformation;
