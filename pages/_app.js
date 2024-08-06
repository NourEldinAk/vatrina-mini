// pages/_app.js
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "../styles/globals.css";
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '@/pages/components/Navbar'; 
import theme from '../lib/theme'; 
import ReduxProvider from '@/utils/ReduxProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <Navbar />
          <Component {...pageProps} />
        </ReduxProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default MyApp;
