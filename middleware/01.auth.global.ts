const authRoutes = ['/auth/signin', '/auth/signup' /*, '/auth/forgot-password', '/auth/reset-password'*/];

export default defineNuxtRouteMiddleware((to) => {
	const session = getSession();

	if (!session && !authRoutes.includes(to.path)) {
		return navigateTo('/auth/signin');
	}

	if (
		session &&
		authRoutes.some((e) => {
			return to.path.startsWith(e);
		})
	) {
		return navigateTo('/');
	}
});
