import { BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Iconify from '@components/iconify';
import PropTypes from 'prop-types';

const BottomNavigationBar = ({ options }) => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(newValue);
        }}
      >
        {options.map((option, index) => (
          <BottomNavigationAction
            icon={
              option.icon ? (
                <Iconify sx={{ transform: 'scale(1.1)', mb: 0.09 }} {...option?.iconStyle} icon={option.icon} />
              ) : (
                ''
              )
            }
            key={index}
            label={<Typography sx={{ typography: 'body1' }}>{option.label}</Typography>}
            value={option.path}
            sx={option?.sx}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

BottomNavigationBar.propTypes = {
  options: PropTypes.array.isRequired,
};

export default BottomNavigationBar;
