<script setup lang="ts">
	const { register } = useSession();
	const darkmode = useDarkMode();
	const router = useRouter();
	const toast = useToast();

	useHead({
		title: 'ASA-WM | Sign In'
	});

	definePageMeta({
		layout: 'auth'
	});

	const busy = ref(false);
	const input = reactive<RegisterOptions>({
		email: '',
		username: '',
		password: ''
	});

	const checking = reactive({
		repeatPassword: ''
	});

	const alert = ref<AlertData>({
		type: null
	});

	const passwordOk = computed(() => {
		if (input.password.length < 8) return false;
		if (input.password !== checking.repeatPassword) return false;
		return true;
	});

	async function doLogin() {
		busy.value = true;
		try {
			const result = await register(toRaw(input));
			if (result === undefined) {
				alert.value = {
					type: 'red',
					title: 'Registration Failed',
					message: 'You are already logged in!'
				};
			}
			alert.value = { type: null };
			toast.add({ title: 'Account created successfully' });
			router.push('/');
		} catch (error: any) {
			alert.value = {
				type: 'red',
				title: 'Registration Failed',
				message: error.data.message
			};
		} finally {
			busy.value = false;
		}
	}

	const allowToSend = computed(() => {
		if (!passwordOk.value) return false;
		if (input.username.length < 4) return false;
		if (input.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) return false;
		return true;
	});
</script>

<template>
	<form class="w-96 rounded border bg-slate-100 p-5 dark:border-slate-600 dark:bg-slate-700" @submit.prevent="doLogin">
		<span class="text-2xl font-semibold">Sign Up</span>
		<UButton
			class="float-right"
			variant="ghost"
			:icon="darkmode ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
			@click="darkmode = !darkmode" />
		<UDivider class="my-3" />

		<div class="space-y-4">
			<UAlert
				v-if="alert.type"
				icon="i-heroicons-exclamation-triangle-20-solid"
				:title="alert.title"
				:description="alert.message"
				:color="alert.type"
				variant="solid" />

			<div class="block">
				<label for="email" class="flex content-center items-center justify-between text-sm">Email</label>
				<UInput id="email" v-model="input.email" icon="i-heroicons-envelope" placeholder="Email" type="email" />
			</div>
			<div class="block">
				<label for="username" class="flex content-center items-center justify-between text-sm">Username</label>
				<UInput id="username" v-model="input.username" icon="i-heroicons-user" placeholder="Username" type="text" />
			</div>
			<div class="block">
				<label for="password" class="flex content-center items-center justify-between text-sm">Password</label>
				<UInput
					id="password"
					v-model="input.password"
					:color="passwordOk ? undefined : 'red'"
					icon="i-heroicons-lock-closed"
					placeholder="Password"
					type="password" />
			</div>
			<div class="block">
				<label for="password" class="flex content-center items-center justify-between text-sm">Repeat Password</label>
				<UInput
					id="password"
					v-model="checking.repeatPassword"
					:color="passwordOk ? undefined : 'red'"
					icon="i-heroicons-lock-closed"
					placeholder="Repeat Password"
					type="password" />
			</div>
			<UButton :loading="busy" :disabled="!allowToSend" type="submit" block icon="i-heroicons-arrow-left-on-rectangle">
				Create Account
			</UButton>
		</div>

		<UDivider class="my-3" label="OR" />
		<NuxtLink to="/auth/signin">
			<UButton color="white" block icon="i-heroicons-user-plus-solid"> Sign In </UButton>
		</NuxtLink>
	</form>
</template>
