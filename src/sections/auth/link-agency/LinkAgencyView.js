import { SPACING } from '@config';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { PATH_AUTH } from '@routes/paths';
import { useRouter } from 'next/router';
import React from 'react';

const LinkAgencyView = () => {
  const router = useRouter();

  return (
    <Box p={2}>
      <Stack>
        <Typography variant="h3">Link Agency</Typography>
      </Stack>
      <Stack mt={SPACING.GRID_SPACING * 2}>
        <TextField label="Enter agency using code" placeholder="Enter Code" />
      </Stack>
      <Stack mt={SPACING.GRID_SPACING * 2}>
        <Button size="large" variant="contained">
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default LinkAgencyView;
