import type { Permission } from '~/utils/enum';

export function permissionMiddleware(permission: Permission, navTo?: string) {
	return () => {
		const { user, has } = useSession();
		if (!user) {
			return navigateTo('/auth/signin');
		}
		if (!has(permission)) {
			if (process.client) {
				useToastNotify().error('You do not have permission to access this page');
			}
			return navigateTo(navTo ?? '/');
		}
	};
}
