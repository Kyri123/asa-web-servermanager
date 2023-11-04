<script setup lang="ts">
	useHead({
		title: 'ASA-WM | Server Management'
	});

	definePageMeta({
		middleware: permissionMiddleware(Permission.ServerManagement, '/user/management')
	});
</script>

<template>
	<Header>
		<template #breadcrumb>
			<BreadcrumbItem first>Server</BreadcrumbItem>
			<BreadcrumbItem active href="/server/management">Management</BreadcrumbItem>
		</template>
		<template #actions>
			<UButton icon="i-heroicons-plus-20-solid" variant="ghost" color="primary">Add Server</UButton>
		</template>
		Server Management
	</Header>
</template>
