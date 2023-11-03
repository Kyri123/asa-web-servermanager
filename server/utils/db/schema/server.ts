import { relations } from 'drizzle-orm';
import { bigint, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { serverActions } from './serverActions';
import { serverMods } from './serverMods';
import { serverScheduleSettings } from './serverScheduleSettings';
import { serverSettings } from './serverSettings';

export const server = mysqlTable('server', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	serverName: varchar('name', { length: 255 }),
	queryPort: int('query_port').notNull().unique(),
	gamePort: int('game_port').notNull().unique(),
	rconPort: int('rcon_port').notNull().unique()
});

export const serverRelation = relations(server, ({ one }) => {
	return {
		settings: one(serverSettings, {
			fields: [server.id],
			references: [serverSettings.serverId]
		}),
		schedule: one(serverScheduleSettings, {
			fields: [server.id],
			references: [serverScheduleSettings.serverId]
		}),
		actions: one(serverActions, {
			fields: [server.id],
			references: [serverActions.serverId]
		}),
		mods: one(serverMods, {
			fields: [server.id],
			references: [serverMods.serverId]
		})
	};
});
