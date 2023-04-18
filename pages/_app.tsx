// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps, AppType } from 'next/app';
import { trpcNext } from '../services/utils/trpc/trpcNext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const TRPCApp = trpcNext.withTRPC(Component);

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCApp {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
