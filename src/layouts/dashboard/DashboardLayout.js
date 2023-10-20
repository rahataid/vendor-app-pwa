import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
// auth
// components
//
import { ProjectProvider } from '@contexts/projects';
import AuthGuard from '@guards/AuthGuard';
import { Box } from '@mui/material';
import Main from './Main';
import FixedBottomNavigation from './footer';
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
      <ProjectProvider>
        <Header onOpenNav={handleOpen} pageTitle={pageTitle} />
        <Box
          sx={{
            display: { lg: 'flex', xs: 'flex', sm: 'flex' },
            minHeight: { lg: 1, xs: 1, sm: 1 },
            background: 'linear-gradient(180deg, #078DEE 0%, #fefefe 100%)',
          }}
        >
          {/* <BottomNavigation options={BOTTOM_NAVIGATION_OPTIONS} /> */}
          <FixedBottomNavigation />

          <Main sx={{ display: 'flex', flex: 1, minHeight: { lg: 1, xs: 1, sm: 1 }, maxWidth: 1 }}>{children}</Main>
        </Box>
      </ProjectProvider>
    </>
  );
  return <AuthGuard>{renderContent()}</AuthGuard>;
}
