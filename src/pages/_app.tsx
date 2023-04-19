// pages/_app.tsx
import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { trpcNext } from '../services/utils/trpc/trpcNext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from 'next/app';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Wrap the Component with tRPC HOC
  const TRPCApp = trpcNext.withTRPC(Component);
  console.log('TRPCApp', TRPCApp);

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCApp {...pageProps} />
    </QueryClientProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
