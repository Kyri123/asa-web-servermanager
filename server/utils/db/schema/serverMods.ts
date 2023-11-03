import { relations } from 'drizzle-orm';
import { bigint, boolean, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { server } from './server';

export const serverMods = mysqlTable('server_mods', {
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
	modId: int('mod_id').notNull(),
	isMapMod: boolean('is_map_mod').notNull().default(false),
	modName: varchar('mod_name', { length: 255 }),
	needUpdate: boolean('need_update').notNull().default(false),
	lastUpdate: timestamp('last_update')
});

export const serverModsRelation = relations(serverMods, ({ one }) => {
	return {
		server: one(server, {
			fields: [serverMods.serverId],
			references: [server.id]
		})
	};
});
