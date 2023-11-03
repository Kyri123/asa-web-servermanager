import { relations } from 'drizzle-orm';
import { bigint, boolean, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { users } from './auth';
import { server } from './server';

export enum ServerActionState {
	Running = 'running',
	Pending = 'pending',
	Failed = 'failed',
	Success = 'success'
}

export enum ServerAction {
	Start = 'start',
	Stop = 'stop',
	Restart = 'restart',
	Backup = 'backup',
	Update = 'update',
	Kill = 'kill'
}

export const serverActions = mysqlTable('server_actions', {
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
	action: varchar('action', { length: 255 }).$type<ServerAction>(),
	state: varchar('state', { length: 255 }).$type<ServerActionState>(),
	message: varchar('message', { length: 255 }).default('Waiting for next execution and free runner...'),
	parameters: varchar('parameters', { length: 255 }).default('[]'),
	canceled: boolean('canceled').default(false),
	userId: bigint('user_id', { mode: 'number' }).references(
		() => {
			return users.id;
		},
		{ onDelete: 'set null' }
	)
});

export const serverSettingsRelation = relations(serverActions, ({ one }) => {
	return {
		server: one(server, {
			fields: [serverActions.serverId],
			references: [server.id]
		}),
		user: one(users, {
			fields: [serverActions.userId],
			references: [users.id]
		})
	};
});
