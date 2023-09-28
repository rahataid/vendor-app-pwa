import { DashboardProvider } from '@contexts/dashboard';
import { Stack } from '@mui/material';
import { OTPView } from '@sections/claim/otp';
import React from 'react';

const OTPScreen = () => (
  <DashboardProvider>
    <Stack>
      <OTPView />
    </Stack>
  </DashboardProvider>
);

export default OTPScreen;
