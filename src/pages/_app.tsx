// _app.tsx
import '@bpwebsite/styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@bpwebsite/utils/trpcHooks';
import queryClient from '@bpwebsite/utils/queryClient';

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
        <div data-testid="app">
          <Component {...pageProps} />
        </div>
    </QueryClientProvider>
  );
}

export default App;

