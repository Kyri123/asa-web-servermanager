import { Permission } from '~/server/db';
import { type PermissionElement } from './index';

const perms: PermissionElement[] = [
	{
		name: 'Super',
		description: 'Super User with all permissions',
		permission: Permission.SuperAdmin
	}
];

export default perms;
