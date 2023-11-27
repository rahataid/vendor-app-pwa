import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box } from '@mui/material';
// auth
// components
//
import AuthGuard from '@guards/AuthGuard';
import Main from './Main';
import Header from './header';
// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string.isRequired,
};

export default function DashboardLayout({ pageTitle, children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderContent = () => (
    <>
      <Header onOpenNav={handleOpen} pageTitle={pageTitle} />

      <Box
        sx={{
          display: { lg: 'flex', xs: 'flex', sm: 'flex' },
          minHeight: { lg: 1, xs: 1, sm: 1 },
        }}
      >
        {/* <BottomNavigation options={BOTTOM_NAVIGATION_OPTIONS} /> */}

        <Main sx={{ display: 'flex', flex: 1, minHeight: { lg: 1, xs: 1, sm: 1 } }}>{children}</Main>
      </Box>
    </>
  );

  // return <> {renderContent()}</>;
  return <AuthGuard> {renderContent()}</AuthGuard>;
}
