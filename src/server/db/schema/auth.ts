import { relations, sql } from 'drizzle-orm';
import { bigint, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { type Permission } from '~/permissions';

export const users = mysqlTable('user', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	username: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	seed: varchar('seed', { length: 255 }).notNull(),
	image: varchar('image', { length: 255 }),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updatedAt').onUpdateNow(),
	lastLogin: timestamp('lastLogin')
});

export const usersRelation = relations(users, ({ many }) => ({
	permissions: many(permission)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SessionUser = Omit<User, 'password' | 'seed'> & { permissions: Permission[] };

export const permission = mysqlTable('permission', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	userId: bigint('user_id', { mode: 'number' }).notNull(),
	permission: varchar('permission', { length: 255 }).notNull().$type<Permission>()
});

export const permissionRelation = relations(permission, ({ one }) => ({
	permissions: one(users, {
		fields: [permission.userId],
		references: [users.id]
	})
}));

export type PermissionData = typeof permission.$inferSelect;
export type NewPermission = typeof permission.$inferInsert;
