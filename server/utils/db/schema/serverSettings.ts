import { relations } from 'drizzle-orm';
import { bigint, mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';
import { server } from './server';

export const serverSettings = mysqlTable('server_settings', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	serverId: bigint('server_id', { mode: 'number' })
		.notNull()
		.unique()
		.references(
			() => {
				return server.id;
			},
			{ onDelete: 'cascade' }
		),
	map: varchar('map', { length: 255 }).default('TheIsland_WP'),
	maxPlayers: smallint('max_players').default(70)
});

export const serverSettingsRelation = relations(serverSettings, ({ one }) => {
	return {
		server: one(server, {
			fields: [serverSettings.serverId],
			references: [server.id]
		})
	};
});
