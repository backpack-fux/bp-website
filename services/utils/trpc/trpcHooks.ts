//services/utils/trpc/trpcHooks.ts
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../../routers/_app';
import { Context } from './trpcContext';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com which is handled by Vercel package
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

type CreateTRPCNextWithCtx = typeof createTRPCNext & {
  ctx?: Context;
};

const createTRPCNextWithCtx: CreateTRPCNextWithCtx = (createTRPCNext as unknown) as CreateTRPCNextWithCtx;

export const trpc = createTRPCNextWithCtx<AppRouter>({
  config(ctx) {
    return {
      links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === 'development' ||
                (opts.direction === 'down' && opts.result instanceof Error), 
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
      ctx,
    };
  },
  ssr: false,
});