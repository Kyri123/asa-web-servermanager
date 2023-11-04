<script setup lang="ts">
	import type { DropdownItem } from '@nuxt/ui/dist/runtime/types';
	import moment from 'moment-timezone';
	import { computed } from 'vue';
	import { permissionMiddleware } from '~/middleware/permission';

	useHead({
		title: 'ASA-WM | User Management'
	});

	definePageMeta({
		middleware: permissionMiddleware(Permission.UserManagement, '/user/management')
	});

	const { user, has } = useSession();
	const toast = useToastNotify();
	const router = useRouter();
	const { data, refresh, status } = useFetch('/api/user/management');

	const accounts = computed(() => {
		if (!data.value) return [];
		return data.value.map((account) => {
			return {
				id: account.id,
				name: account.username,
				lastLogin: moment(account.lastLogin).format('DD.MM.YYYY HH:mm'),
				email: account.email,
				disabled: account.accountDisabled ? 'Yes' : 'No'
			};
		});
	});

	const columns = [
		{
			key: 'id',
			label: 'Id'
		},
		{
			key: 'name',
			label: 'Username'
		},
		{
			key: 'email',
			label: 'Email'
		},
		{
			key: 'lastLogin',
			label: 'Last Login'
		},
		{
			key: 'disabled',
			label: 'Disabled'
		},
		{
			key: 'actions'
		}
	];

	const items = (row: (typeof accounts)['value'][0]) => {
		const elements: DropdownItem[][] = [];

		if (has(Permission.UserManagementPermissions)) {
			elements.push([
				{
					label: 'Permissions',
					icon: 'i-heroicons-pencil-square-20-solid',
					click: () => {
						return router.push(`/user/management/edit/${row.id}`);
					}
				}
			]);
		}

		if (has(Permission.UserManagementToggle)) {
			elements.push([
				{
					label: row.disabled !== 'Yes' ? 'Disable' : 'Enable',
					icon: 'i-heroicons-user',
					click: () => {
						return $fetch(`/api/user/management/${row.id}/disable`, {
							method: 'POST'
						})
							.then(() => {
								toast.success(row.disabled ? 'User has been Enabled' : 'User has been disabled');
								return refresh();
							})
							.catch((e) => {
								toast.error(e.data.message);
							});
					}
				}
			]);
		}

		return elements;
	};

	const page = ref(1);
	const pageCount = 10;

	const rows = computed(() => {
		return accounts.value.slice((page.value - 1) * pageCount, page.value * pageCount);
	});

	async function doRefresh() {
		await refresh();
		page.value = 1;
		toast.info('Data has been refreshed');
	}
</script>

<template>
	<Header>
		<template #breadcrumb>
			<BreadcrumbItem first>User</BreadcrumbItem>
			<BreadcrumbItem active href="/user/management">Management</BreadcrumbItem>
		</template>
		<template #actions>
			<UButton :loading="status === 'pending'" icon="i-heroicons-arrow-path-20-solid" variant="ghost" color="primary" @click="doRefresh">
				Refresh
			</UButton>
			<!--<UButton icon="i-heroicons-plus-20-solid" variant="ghost" color="primary"> Add User </UButton>-->
		</template>
		User Management
	</Header>

	<div class="p-2 pt-3">
		<UTable :rows="rows" :loading="!data?.length" :columns="columns" class="border bg-slate-50 dark:border-gray-700 dark:bg-gray-800">
			<template #actions-data="{ row }">
				<!-- only displayed for other users -->
				<UDropdown v-if="row.id !== user.id" :items="items(row)">
					<UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
				</UDropdown>
				<div v-else />
			</template>
		</UTable>

		<UPagination v-if="accounts.length > pageCount" v-model="page" :page-count="pageCount" :total="accounts.length" class="mt-3" />
	</div>
</template>
