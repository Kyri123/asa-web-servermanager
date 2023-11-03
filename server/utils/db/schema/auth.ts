import { relations } from 'drizzle-orm';
import { bigint, boolean, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import type { JwtPayload } from 'jsonwebtoken';
import type { Permission } from '~/types/enum';
import { serverActions } from './serverActions';

export const users = mysqlTable('user', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	username: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	seed: varchar('seed', { length: 255 }).notNull(),
	image: varchar('image', { length: 255 }),
	lastLogin: timestamp('last_login'),
	accountDisabled: boolean('account_disabled').default(false)
});

export const usersRelation = relations(users, ({ many }) => {
	return {
		permissions: many(permission),
		actions: many(serverActions)
	};
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SessionUser = Omit<User, 'password' | 'seed'> & { permissions: Permission[] } & JwtPayload;

export const permission = mysqlTable('permission', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	userId: bigint('user_id', { mode: 'number' }).notNull(),
	permission: varchar('permission', { length: 255 }).notNull().$type<Permission>()
});

export const permissionRelation = relations(permission, ({ one }) => {
	return {
		permissions: one(users, {
			fields: [permission.userId],
			references: [users.id]
		})
	};
});

export type PermissionData = typeof permission.$inferSelect;
export type NewPermission = typeof permission.$inferInsert;
