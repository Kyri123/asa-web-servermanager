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

	const user = await db.query.users.findFirst({
		where: (u, { eq }) => {
			return eq(u.id, id);
		},
		columns: {
			password: false,
			seed: false
		},
		with: {
			permissions: true
		}
	});

	return user;
});
