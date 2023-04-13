
// pages/_app.tsx
import type { AppType } from 'next/app';
import { trpc } from '../services/utils/trpc/trpcHooks';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);

