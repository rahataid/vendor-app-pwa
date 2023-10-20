import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function FixedBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7, zIndex: 1101 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{
            height: 64,
            boxShadow: '0px 0px 18px -6px rgba(0,0,0,0.75)',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 1101,
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(249, 250, 251, 0.8)',
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => router.push('/dashboard')} />
          <BottomNavigationAction label="Charge" icon={<QrCodeScannerIcon />} onClick={() => router.push('/charge')} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} onClick={() => router.push('/profile')} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
