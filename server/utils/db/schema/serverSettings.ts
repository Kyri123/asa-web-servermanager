import { relations } from 'drizzle-orm';
import { bigint, mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';
import { server } from './server';

export const serverSettings = mysqlTable('server_settings', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	serverId: bigint('server_id', { mode: 'number' })
		.notNull()
		.unique()
		.references(() => server.id, { onDelete: 'cascade' }),
	map: varchar('map', { length: 255 }),
	maxPlayers: smallint('max_players')
});

export const serverSettingsRelation = relations(serverSettings, ({ one }) => ({
	server: one(server, {
		fields: [serverSettings.serverId],
		references: [server.id]
	})
}));
