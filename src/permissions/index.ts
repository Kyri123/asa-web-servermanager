import { type Permission } from '~/server/db';
import mainAdmin from './super';

export type PermissionElement = {
	name: string;
	description: string;
	permission: Permission;
};

export type Permissions = Record<string, PermissionElement[]>;

export const permissions: Permissions = { mainAdmin };
