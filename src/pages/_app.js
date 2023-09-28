// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import { MotionLazyContainer } from '../components/animate';
import ProgressBar from '../components/progress-bar';
import { SettingsProvider, ThemeSettings } from '../components/settings';
import SnackbarProvider from '../components/snackbar';

// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AppProvider } from '../auth/AppContext';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
  emotionCache: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppProvider>
        <SettingsProvider>
          <MotionLazyContainer>
            <ThemeProvider>
              <ThemeSettings>
                <ThemeLocalization>
                  <SnackbarProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </ThemeLocalization>
              </ThemeSettings>
            </ThemeProvider>
          </MotionLazyContainer>
        </SettingsProvider>
      </AppProvider>
    </CacheProvider>
  );
}
