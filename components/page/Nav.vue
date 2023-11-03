<script setup lang="ts">
	const { user, logout } = useSession();

	const general = [
		{
			label: 'Dashboard',
			icon: 'i-heroicons-home',
			to: '/'
		},
		{
			label: 'User Management',
			icon: 'i-heroicons-users',
			to: '/users'
		}
	];

	const server = [
		{
			label: 'Server Management',
			icon: 'i-heroicons-server',
			to: '/servers'
		}
	];

	const ui /*ui*/ = {
		wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
		base: 'group border-s -ms-px lg:leading-6 before:hidden items-center flex hover:dark:bg-opacity-25 hover:bg-opacity-[0.02] hover:bg-black',
		padding: 'p-1 ps-4',
		rounded: '',
		font: '',
		ring: '',
		icon: {
			base: 'w-5 h-5',
			active: 'text-primary-500 dark:text-primary-400'
		},
		active: 'text-primary-500 dark:text-primary-400 border-current font-semibold dark:bg-opacity-25 bg-opacity-[0.02] bg-black',
		inactive:
			'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
	};
</script>

<template>
	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-3 p-3">
			<UAvatar :alt="user.username" size="sm" />
			<span div class="block flex-1 px-2 font-semibold">{{ user.username }}</span>
			<UButton variant="ghost" size="sm" icon="i-heroicons-arrow-right-on-rectangle" @click="logout" />
		</div>

		<div class="font-semibold">General</div>
		<UVerticalNavigation :links="general" :ui="ui" />

		<div class="font-semibold">Server</div>
		<UVerticalNavigation :links="server" :ui="ui" />
	</div>
</template>
