import { eq, or, sql } from 'drizzle-orm';
import { z } from 'zod';
import { encryptPassword } from '~/server/utils/auth/password';
import { createSession } from '~/server/utils/auth/session';
import { getBody } from '~/server/utils/requestHelper';
import { Permission } from '~/utils/enum';

const bodySchema = z.object({
	username: z.string().min(4),
	password: z.string().min(8),
	email: z.string().email()
});

export default defineEventHandler(async (event) => {
	const input = await getBody(event, bodySchema);

	const userTest = await db
		.select()
		.from(users)
		.where(or(eq(users.email, input.email), eq(users.username, input.username)))
		.limit(1)
		.then((rows) => {
			return rows[0];
		});

	if (userTest) throw createError({ statusCode: 500, statusMessage: 'User already exsists!' });
	const { password, seed } = encryptPassword(input.password);

	const result = await db.select({ count: sql<number>`count(*)` }).from(users);
	const permissions = result[0]?.count && result[0]?.count > 0 ? [] : [Permission.ADMIN];

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

	if (!user) throw createError({ statusCode: 500, statusMessage: 'Something went wrong!' });

	if (permissions.length > 0) {
		await Promise.all(
			permissions.map((perm) => {
				return db.insert(permission).values({
					userId: user.id,
					permission: perm as Permission
				});
			})
		);
	}

	await createSession(event, user);

	return {
		success: true
	};
});
