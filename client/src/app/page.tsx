'use client';

import Navbar from './components/Navbvar';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function Home({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
