import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { hasPermission } from '~/server/utils/auth/session';
import { getBody } from '~/server/utils/requestHelper';
import { Permission } from '~/utils/enum';

const bodySchema = z.object({
	permission: z.nativeEnum(Permission)
});

export default defineEventHandler(async (event) => {
	hasPermission(event, Permission.UserManagementPermissions);
	const { permission: perm } = await getBody(event, bodySchema);
	const id = parseInt(event.context.params?.id ?? 'NaN');

	if (!Number.isInteger(id)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'ID should be an integer'
		});
	}

	const permissionExists = await db
		.select()
		.from(permission)
		.where(and(eq(permission.userId, id), eq(permission.permission, perm)))
		.limit(1)
		.then((rows) => {
			return !!rows[0];
		});

	let mode = 'add';
	if (permissionExists) {
		mode = 'remove';
		await db.delete(permission).where(and(eq(permission.userId, id), eq(permission.permission, perm)));
	} else {
		await db.insert(permission).values({
			userId: id,
			permission: perm
		});
	}

	return {
		success: true,
		mode
	};
});
