import { z } from 'zod';
import { hasPermission } from '~/server/utils/auth/session';
import { Permission } from '~/utils/enum';

const bodySchema = z.object({
	id: z.number().optional(),
	serverName: z.string(),
	queryPort: z.number(),
	gamePort: z.number(),
	rconPort: z.number()
});

export default defineEventHandler(async (event) => {
	hasPermission(event, Permission.ServerManagementCreate);
	const body = await getBody(event, bodySchema);

	await db.insert(server).values(body);
	const srv = await db.query.server.findFirst({
		where: (s, { eq }) => {
			return eq(s.serverName, body.serverName);
		}
	});

	if (!srv) {
		throw new Error('Failed to create server');
	}

	await db.insert(serverScheduleSettings).values({
		serverId: srv.id
	});

	await db.insert(serverSettings).values({
		serverId: srv.id
	});

	return {
		success: true
	};
});
