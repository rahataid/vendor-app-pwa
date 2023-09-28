import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const MnemonicDialog = ({ open, onClose, mnemonic }) => {
  const router = useRouter();
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle>12 Word mnemonic</DialogTitle>
      <DialogContent>
        <p>Write down your 12 word mnemonic and keep it safe.</p>
        <code>{mnemonic?.phrase}</code>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => router.reload()}>I have written it down.</Button>
      </DialogActions>
    </Dialog>
  );
};

MnemonicDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mnemonic: PropTypes.string.isRequired,
};

export default MnemonicDialog;
