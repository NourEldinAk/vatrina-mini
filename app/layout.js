import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar'
import theme from './theme';
import ReduxProvider from '@/utils/ReduxProvider';

export const metadata = {
  title: "Vatrina",
  description: "Libyan Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir='rtl'>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body>
            <ReduxProvider>
              <Navbar/>
            {children}
            </ReduxProvider>
            </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
