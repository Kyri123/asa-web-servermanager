import { TRPCError } from '@trpc/server';
import { eq, or, sql } from 'drizzle-orm';
import { z } from 'zod';
import { Permission } from '~/permissions';
import { createTRPCRouter } from '~/server/api/trpc';
import { db, permission, users } from '~/server/db';
import { comparePassword, encryptPassword } from '~/server/utils/auth';
import { createSession } from '~/session';
import { publicProcedure } from './../trpc';

export const authRouter = createTRPCRouter({
	signin: publicProcedure
		.input(
			z.object({
				username: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const user = await db
				.select()
				.from(users)
				.where(or(eq(users.email, input.username), eq(users.username, input.username)))
				.limit(1)
				.then((rows) => {
					return rows[0];
				});

			if (!user) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User not found!' });
			if (!comparePassword(input.password, user.password, user.seed))
				throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Password!' });

			await createSession(user);

			return {
				success: true
			};
		}),

	signup: publicProcedure
		.input(
			z.object({
				username: z.string().min(4),
				password: z.string().min(8),
				email: z.string().email()
			})
		)
		.mutation(async ({ input }) => {
			const userTest = await db
				.select()
				.from(users)
				.where(or(eq(users.email, input.email), eq(users.username, input.username)))
				.limit(1)
				.then((rows) => {
					return rows[0];
				});

			if (!userTest) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already exsists!' });
			const { password, seed } = encryptPassword(input.password);

			const result = await db.select({ count: sql<number>`count(*)` }).from(users);
			const permissions = result[0]?.count && result[0]?.count > 0 ? [] : [Permission.Super];

			await db.insert(users).values({
				username: input.username,
				password,
				seed,
				email: input.email
			});

			const user = await db
				.select()
				.from(users)
				.where(eq(users.email, input.email))
				.limit(1)
				.then((rows) => {
					return rows[0];
				});

			if (!user) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Something went wrong!' });

			if (permissions.length > 0) {
				await Promise.all(
					permissions.map((perm) => {
						return db.insert(permission).values({
							userId: user.id,
							permission: perm
						});
					})
				);
			}

			await createSession(user);

			return {
				success: true
			};
		})
});
