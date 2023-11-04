<script setup lang="ts">
	import { permissionMiddleware } from '~/middleware/permission';

	useHead({
		title: 'ASA-WM | User Management'
	});

	definePageMeta({
		middleware: permissionMiddleware(Permission.UserManagementPermissions, '/user/management')
	});

	const { user } = useSession();
	const toast = useToastNotify();
	const router = useRouter();

	const { params } = useParams({ id: '0' });
	if (!Number.isInteger(parseInt(params.id))) {
		toast.error('Invalid user id');
		router.push('/user/management');
	}

	if (parseInt(params.id) === user.id) {
		toast.error('You cannot edit your own user');
		router.push('/user/management');
	}

	const { data, refresh, status } = useFetch(`/api/user/management/${parseInt(params.id)}/data`);

	function makePermission(key: string, name: string, description: string) {
		return {
			name,
			description,
			key,
			checked: ref(
				data.value?.permissions.some((e) => {
					return e.permission === key;
				})
			)
		};
	}

	const tabs = computed(() => {
		return {
			general: {
				label: 'General',
				permissions: [makePermission(Permission.ADMIN, 'Super Admin', 'Can do anything')]
			},
			user: {
				label: 'User Management',
				permissions: [
					makePermission(Permission.UserManagement, 'View User Management', 'Can open the user management page'),
					makePermission(Permission.UserManagementPermissions, 'Manage Permissions', 'Allow to manage permissions of other users'),
					makePermission(Permission.UserManagementToggle, 'Manage Account State', 'Allow to manage the account state of other users')
				]
			},
			server: {
				label: 'Server Management',
				permissions: [makePermission(Permission.UserManagement, 'View Server Management', 'Can open the server management page')]
			}
		};
	});

	const { params: query, setParams } = useQueryParams({ tab: 'general' as keyof (typeof tabs)['value'] });

	watch(
		status,
		() => {
			if (status.value === 'error') {
				toast.error('Failed to load user data');
				router.push('/user/management');
			}
		},
		{ deep: true }
	);

	const items = Object.entries(tabs.value).map(([k, v]) => {
		return {
			key: k,
			...v
		};
	});

	const hasSuper = computed(() => {
		return !!data.value?.permissions.some((e) => {
			return e.permission === Permission.ADMIN;
		});
	});

	const busy = ref(false);
	function toggleKey(permission: string) {
		if (busy.value) return;
		busy.value = true;
		return $fetch(`/api/user/management/${params.id}/toggle-permission`, {
			body: { permission },
			method: 'POST'
		})
			.then(() => {
				toast.success('Permission has been set!');
				refresh();
			})
			.catch((e) => {
				toast.error(e.data.message);
			})
			.finally(() => {
				busy.value = false;
			});
	}
</script>

<template>
	<Header>
		<template #breadcrumb>
			<BreadcrumbItem first>User</BreadcrumbItem>
			<BreadcrumbItem active href="/user/management">Management</BreadcrumbItem>
			<BreadcrumbItem active :href="$route.path">{{ !data ? 'Loading...' : data.username }}</BreadcrumbItem>
		</template>
		<template #actions>
			<UButton :loading="status === 'pending'" icon="i-heroicons-arrow-path-20-solid" variant="ghost" color="primary" @click="refresh">
				Refresh
			</UButton>
			<!--<UButton icon="i-heroicons-plus-20-solid" variant="ghost" color="primary"> Add User </UButton>-->
		</template>
		Edit Permissions
	</Header>

	<div v-if="!!data" class="p-2 pt-3">
		<UTabs
			orientation="vertical"
			:default-index="Object.keys(tabs).indexOf(query.tab)"
			:items="items"
			class="w-full"
			:ui="{ wrapper: 'flex items-start gap-4', list: { width: 'w-48 mt-2' } }"
			@change="setParams({ tab: Object.keys(tabs)[$event] as any })">
			<template #item="{ item }">
				<UCard :ui="{ wrapper: 'm-0' }">
					<template #header>
						<p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							{{ item.label }}
						</p>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{{ item.description }}
						</p>
					</template>

					<div class="flex flex-col gap-2">
						<div
							v-for="{ name, description, key, ...args } of item.permissions"
							class="flex cursor-pointer items-center gap-2 rounded border bg-gray-50 p-3 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900"
							:class="{
								'dark:border-gray-700': !args.checked.value,
								'border-green-400 dark:border-green-500': !!args.checked.value
							}"
							@click.prevent="
								args.checked.value = !args.checked.value;
								toggleKey(key);
							">
							<UToggle
								:id="key"
								v-model="args.checked.value"
								on-icon="i-heroicons-check-20-solid"
								off-icon="i-heroicons-x-mark-20-solid"
								color="green"
								@update:model-value="toggleKey(key)" />
							<label class="ms-3 text-sm" :for="key">
								<span class="font-medium text-gray-700 dark:text-gray-200">{{ name }}</span>
								<p class="text-gray-500 dark:text-gray-400">{{ description }}</p>
							</label>
						</div>
					</div>
				</UCard>
			</template>
		</UTabs>
	</div>
</template>
