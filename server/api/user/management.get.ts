import { hasPermission } from '~/server/utils/auth/session';
import { Permission } from '~/utils/enum';

export default defineEventHandler(async (event) => {
	hasPermission(event, Permission.UserManagement);

	const users = await db.query.users.findMany({
		columns: {
			password: false,
			seed: false
		},
		with: {
			permissions: true
		},
		orderBy({ id, username }, { asc }) {
			return [asc(username), asc(id)];
		}
	});

	return users;
});
