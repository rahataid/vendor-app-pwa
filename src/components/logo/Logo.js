import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box component="img" src="/logo/rahat-logo.png" sx={{ width: 164, height: 68, cursor: 'pointer', ...sx }} />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <NextLink href="/" passHref>
      <Link sx={{ display: 'contents' }}>{logo}</Link>
    </NextLink>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
