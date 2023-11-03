import { sql } from 'drizzle-orm';
import { hasPermission } from '~/server/utils/auth/session';
import { Permission } from '~/utils/enum';

export default defineEventHandler(async (event) => {
	hasPermission(event, Permission.UserManagement);
	const id = parseInt(event.context.params?.id ?? 'NaN');

	if (!Number.isInteger(id)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'ID should be an integer'
		});
	}

	await db.execute(sql`UPDATE ${users} SET ${users.accountDisabled} = !${users.accountDisabled} WHERE ${users.id} = ${id}`);

	return {
		success: true
	};
});
