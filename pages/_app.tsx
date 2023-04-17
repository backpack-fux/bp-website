// pages/_app.tsx
import type { AppProps, AppType } from 'next/app';
import { trpcNext } from '../services/utils/trpc/trpcNext';

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpcNext.withTRPC(MyApp);

