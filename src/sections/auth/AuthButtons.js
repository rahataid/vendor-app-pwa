import { SPACING } from '@config';
import { Box, Button, Stack } from '@mui/material';
import { PATH_AUTH } from '@routes/paths';
import { useRouter } from 'next/router';

const AuthButtons = () => {
  const router = useRouter();

  return (
    <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={SPACING.GRID_SPACING}>
      <Button
        sx={{ p: 1 }}
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => router.push(PATH_AUTH.registration)}
      >
        Create New Account
      </Button>
      <Button
        fullWidth
        sx={{ p: 1 }}
        variant="contained"
        color="secondary"
        onClick={() => router.push(PATH_AUTH.restoreWallet)}
      >
        Restore Account
      </Button>
    </Stack>
  );
};

export default AuthButtons;
