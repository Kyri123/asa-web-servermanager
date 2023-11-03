<script setup lang="ts">
	const { login } = useSession();
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
	const input = reactive<LoginOptions>({
		username: '',
		password: ''
	});

	const alert = ref<AlertData>({
		type: null
	});

	async function doLogin() {
		busy.value = true;
		try {
			const result = await login(toRaw(input));
			if (result === undefined) {
				throw new Error('You are already logged in!');
			}
			alert.value = { type: null };
			toast.add({ title: 'Successfully logged in' });
			router.push('/');
		} catch (error: any) {
			alert.value = {
				type: 'red',
				title: 'Login Failed',
				message: error.data.message
			};
		} finally {
			busy.value = false;
		}
	}

	const allowToSend = computed(() => {
		if (input.username.length < 4) return false;
		if (input.password.length < 8) return false;
		return true;
	});
</script>

<template>
	<form class="w-96 rounded border bg-gray-100 p-5 dark:border-gray-800 dark:bg-gray-900" @submit.prevent="doLogin">
		<span class="text-2xl font-semibold">Sign In</span>
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
				<label for="username" class="flex content-center items-center justify-between text-sm">Email or Username</label>
				<UInput id="username" v-model="input.username" icon="i-heroicons-user" placeholder="Email or Username" type="text" />
			</div>
			<div class="block">
				<label for="password" class="flex content-center items-center justify-between text-sm">Password</label>
				<UInput id="password" v-model="input.password" icon="i-heroicons-lock-closed" placeholder="Password" type="password" />
			</div>
			<UButton :loading="busy" :disabled="!allowToSend" type="submit" block icon="i-heroicons-arrow-left-on-rectangle"> Login </UButton>
		</div>

		<UDivider class="my-3" label="OR" />
		<NuxtLink to="/auth/signup">
			<UButton color="white" block icon="i-heroicons-user-plus-solid"> Sign Up </UButton>
		</NuxtLink>
	</form>
</template>
