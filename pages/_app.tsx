// pages/_app.tsx
import type { AppType } from 'next/app';
import { trpcNext } from '../services/utils/trpc/trpcNext';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpcNext.withTRPC(MyApp);

