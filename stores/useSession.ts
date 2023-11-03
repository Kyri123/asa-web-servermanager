export type LoginOptions = {
	username: string;
	password: string;
};

export type RegisterOptions = {
	email: string;
	username: string;
	password: string;
};

export const useSession = defineStore('darkMode', () => {
	const token = useCookie('token');
	const router = useRouter();

	const user = computed(() => {
		return getSession(token.value);
	});

	function logout() {
		destorySession();
		return router.push('/auth/signin');
	}

	async function login(body: LoginOptions) {
		if (user.value) return;
		return await $fetch('/api/auth/signin', {
			method: 'POST',
			body
		});
	}

	function register(body: RegisterOptions) {
		if (user.value) return;
		return $fetch('/api/auth/signup', {
			method: 'POST',
			body
		});
	}

	return { token, user, logout, login, register };
});
