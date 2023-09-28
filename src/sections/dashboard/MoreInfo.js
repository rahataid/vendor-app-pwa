import { Card, CardContent, Stack, Typography } from '@mui/material';

const MoreInfo = () => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Typography>Offline Beneficiary</Typography>
          <Typography>4234</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Typography>Unconfirmed Txns</Typography>
          <Typography>4234</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MoreInfo;
