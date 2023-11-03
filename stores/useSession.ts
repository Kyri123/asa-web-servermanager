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
	const tokenCookie = useCookie('token');
	const token = ref(tokenCookie.value);
	const router = useRouter();
	const confirmModal = useConfirm();

	const user = computed(() => {
		return getSession(token.value)!;
	});

	async function logout() {
		const confirmed = await confirmModal({
			title: null,
			text: 'Are you sure you want to logout?',
			confirmText: 'Logout',
			closeButton: false
		});
		if (!confirmed) {
			return;
		}
		destorySession();
		token.value = null;
		return router.push('/auth/signin');
	}

	async function login(body: LoginOptions) {
		if (user.value) return;
		return await $fetch('/api/auth/signin', {
			method: 'POST',
			body
		}).then((res) => {
			if (res.success) {
				const newTokenCookie = useCookie('token');
				token.value = newTokenCookie.value;
			}
			return res;
		});
	}

	function register(body: RegisterOptions) {
		if (user.value) return;
		return $fetch('/api/auth/signup', {
			method: 'POST',
			body
		}).then((res) => {
			if (res.success) {
				const newTokenCookie = useCookie('token');
				token.value = newTokenCookie.value;
			}
			return res;
		});
	}

	return { token, user, logout, login, register };
});
