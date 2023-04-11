// pages/_app.tsx

// pages/_app.tsx
import type { AppType } from 'next/app';
import { trpc } from '../lib/trpc/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);

