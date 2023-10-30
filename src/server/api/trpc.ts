import { initTRPC, TRPCError } from '@trpc/server';
import { type NextRequest } from 'next/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { db } from '~/server/db';
import { getSession } from '~/session/getSession';

interface CreateContextOptions {
	headers: Headers;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
	console.log(opts.headers);
	const session = getSession();

	return {
		session,
		headers: opts.headers,
		db
	};
};

export const createTRPCContext = (opts: { req: NextRequest }) => {
	return createInnerTRPCContext({
		headers: opts.req.headers
	});
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		};
	}
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
	if (!ctx.session?.username) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			// infers the `session` as non-nullable
			session: { ...ctx.session, user: ctx.session.username }
		}
	});
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
