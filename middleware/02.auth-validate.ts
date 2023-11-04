import { testSession } from '~/utils/session/functions';

export default defineNuxtRouteMiddleware(async () => {
	const session = getSession();
	if (session && !(await testSession())) {
		destorySession();
		return navigateTo('/auth/signin');
	}
});
