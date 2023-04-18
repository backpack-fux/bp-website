import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../../routers/_app';
import superjson from 'superjson';

function getUrl() {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : "http://localhost:3000/api/trpc/";

  return url;
}

export const trpcNext = createTRPCNext<AppRouter>({
  config({ ctx }) {
    console.log('trpcNext config', ctx);

    if (typeof window !== 'undefined') {
      return {
        transformer: superjson,
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === 'development' ||
              (opts.direction === 'down' && opts.result instanceof Error),
          }),
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      };
    }

    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
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
  ssr: true,
});
