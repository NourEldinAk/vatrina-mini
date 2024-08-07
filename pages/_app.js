import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "../styles/globals.css";
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../stores/index"; 
import theme from '../lib/theme'; 
import ReduxProvider from '@/utils/ReduxProvider';

function MyApp({ Component, pageProps }) {
  return (
    
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </ReduxProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default MyApp;
