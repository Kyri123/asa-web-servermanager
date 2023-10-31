import { relations } from 'drizzle-orm';
import { bigint, boolean, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { server } from './server';

export const serverScheduleSettings = mysqlTable('server_schedule_settings', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	serverId: bigint('server_id', { mode: 'number' })
		.notNull()
		.unique()
		.references(() => server.id, { onDelete: 'cascade' }),
	updateEnabled: boolean('update_enabled').default(true),
	updateCron: varchar('update_frequency', { length: 255 }).default('*/15 * * * *'),
	updateAlertEnabled: boolean('restart_alert_enabled').default(true),
	restartEnabled: boolean('restart_enabled').default(false),
	restartCron: varchar('restart_frequency', { length: 255 }).default('0 4 * * *'),
	restartAlertEnabled: boolean('restart_alert_enabled').default(true),
	backupsEnabled: boolean('backups_enabled').default(true),
	backupsCron: varchar('backups_frequency', { length: 255 }).default('0 */2 * * *'),
	backupsAlertEnabled: boolean('backups_alert_enabled').default(true)
});

export const serverScheduleSettingsRelation = relations(serverScheduleSettings, ({ one }) => ({
	server: one(server, {
		fields: [serverScheduleSettings.serverId],
		references: [server.id]
	})
}));
