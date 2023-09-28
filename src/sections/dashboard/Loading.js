import { Skeleton, Stack } from '@mui/material';

export const LoadingBalance = () => (
  <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
    <Skeleton variant="text" width={100} height={150} />
    <Skeleton variant="text" width={100} height={150} />
  </Stack>
);
