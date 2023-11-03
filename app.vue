<script setup lang="ts">
	useHead({
		title: 'ASA-WM'
	});

	// init basic storage
	useDarkMode();
	useSession();
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>

	<UNotifications />
</template>
