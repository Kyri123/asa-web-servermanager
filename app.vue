<script setup lang="ts">
	import { ModalsContainer } from 'vue-final-modal';

	useHead({
		title: 'ASA-WM',
		htmlAttrs: {
			class: 'nuxt-ui-scrollbars'
		}
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
	<ModalsContainer />
</template>
