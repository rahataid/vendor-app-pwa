import Head from 'next/head';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { APP_NAME } from '@config';
import { Box, Stack } from '@mui/material';
import Container from './Container';

// ----------------------------------------------------------------------

const Page = forwardRef(
  ({ children, title = '', meta, breadcrumbAction, breadcrumbLinks = [], nocard, ...other }, ref) => (
    <Stack style={{ flex: 1 }}>
      <Head>
        <title>{`${title ? title + ' |' : ''} ${APP_NAME}`}</title>
        {meta}
      </Head>

      <Box ref={ref} {...other} style={{ flex: 1 }}>
        <Container title={title} action={breadcrumbAction} breadcrumbLinks={breadcrumbLinks} nocard={nocard} {...other}>
          {children}
        </Container>
      </Box>
    </Stack>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
  breadcrumbAction: PropTypes.node,
  breadcrumbLinks: PropTypes.array,
  nocard: PropTypes.bool,
};

export default Page;
