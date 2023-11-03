<script setup lang="ts">
	import moment from 'moment-timezone';
	import { computed } from 'vue';

	useHead({
		title: 'ASA-WM | User Management'
	});

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
		return [
			[
				{
					label: 'Edit',
					icon: 'i-heroicons-pencil-square-20-solid',
					click: () => {
						return console.log('Edit', row);
					}
				}
			],
			[
				{
					label: row.disabled !== 'Yes' ? 'Disable' : 'Enable',
					icon: 'i-heroicons-user',
					click: () => {
						return console.log('Edit', row);
					}
				}
			]
		];
	};

	const page = ref(1);
	const pageCount = 10;

	const rows = computed(() => {
		return accounts.value.slice((page.value - 1) * pageCount, page.value * pageCount);
	});
</script>

<template>
	<Header>
		<template #breadcrumb>
			<BreadcrumbItem first>User</BreadcrumbItem>
			<BreadcrumbItem active href="/user/management">Management</BreadcrumbItem>
		</template>
		<template #actions>
			<UButton :loading="status === 'pending'" icon="i-heroicons-arrow-path-20-solid" variant="ghost" color="primary" @click="refresh">
				Refresh
			</UButton>
			<UButton icon="i-heroicons-plus-20-solid" variant="ghost" color="primary"> Add User </UButton>
		</template>
		User Management
	</Header>

	<div class="p-2 pt-3">
		<UTable :rows="rows" :loading="status === 'pending'" :columns="columns" class="border bg-slate-50 dark:border-gray-700 dark:bg-gray-800">
			<template #actions-data="{ row }">
				<UDropdown :items="items(row)">
					<UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
				</UDropdown>
			</template>
		</UTable>

		<UPagination v-if="accounts.length > pageCount" v-model="page" :page-count="pageCount" :total="accounts.length" class="mt-3" />
	</div>
</template>
