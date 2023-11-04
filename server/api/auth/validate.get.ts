import { and, eq, not } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const session = parseSession(event, true);

	if (!session) {
		return {
			valid: false
		};
	}

	const userArray = await db
		.select()
		.from(users)
		.where(and(eq(users.id, session.id), not(eq(users.accountDisabled, true))));

	return {
		valid: !!userArray.length
	};
});
