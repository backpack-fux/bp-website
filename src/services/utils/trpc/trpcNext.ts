import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../../routers/_app';
import superjson from 'superjson';
import { createContext } from './trpcContext';
import { NextApiRequest, NextApiResponse } from 'next';

function getUrl() {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : "http://localhost:3000/api/trpc/";
    console.log("url", url);

  return url;
}

console.log("createContext 2", createContext);
export const trpcNext = createTRPCNext<AppRouter>({
  config({ ctx }) {
    console.log("ctx", ctx);
    console.log("ctx.req", ctx?.req);
    console.log("ctx.res", ctx?.res);

    const headers = ctx?.req?.headers || {};

    const createdContext = createContext({ req: ctx?.req as NextApiRequest | null, res: ctx?.res as NextApiResponse | null });
    console.log("createdContext", createdContext);

    const commonConfig = {
      transformer: superjson,
      ctx: createdContext,
    };

    if (typeof window !== 'undefined') {
      return {
        ...commonConfig,
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
      ...commonConfig,
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
              ...headers,
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  ssr: true,
});

console.log("trpcNext", trpcNext);
