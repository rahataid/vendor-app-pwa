import { QrScanner as CMPQrScanner } from '@yudiel/react-qr-scanner';
import PropTypes from 'prop-types';
import { Alert, Stack, Typography } from '@mui/material';

const QRScanner = ({ onResult, scanData = 'No result', loading }) => (
  <>
    {!loading && (
      <CMPQrScanner
        onResult={onResult}
        style={{ width: '100%' }}
        constraints={{
          facingMode: 'environment',
        }}
      />
    )}
    {scanData && (
      <Stack>
        <Alert severity="info">
          <Typography variant="h6">Beneficiary: {scanData}, Processing...</Typography>
        </Alert>
      </Stack>
    )}
  </>
);

QRScanner.propTypes = {
  onResult: PropTypes.func.isRequired,
  scanData: PropTypes.string,
  loading: PropTypes.bool,
};

export default QRScanner;
