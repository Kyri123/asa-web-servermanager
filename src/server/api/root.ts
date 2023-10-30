import { authRouter } from '~/server/api/routers/authRouter';
import { createTRPCRouter } from '~/server/api/trpc';

export const appRouter = createTRPCRouter({
	auth: authRouter
});

export type AppRouter = typeof appRouter;
