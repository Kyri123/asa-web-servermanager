import { eq, or } from 'drizzle-orm';
import { z } from 'zod';
import { comparePassword } from '~/server/utils/auth/password';
import { createSession } from '~/server/utils/auth/session';

export default defineEventHandler(async (event) => {
	console.log('event');
	const input = z
		.object({
			username: z.string(),
			password: z.string()
		})
		.parse(await readBody(event));

	const user = await db
		.select()
		.from(users)
		.where(or(eq(users.email, input.username), eq(users.username, input.username)))
		.limit(1)
		.then((rows) => {
			return rows[0];
		});

	if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found!' });
	if (!comparePassword(input.password, user.password, user.seed)) throw createError({ statusCode: 401, statusMessage: 'Invalid Password!' });

	await createSession(event, user);

	return {
		success: true
	};
});
