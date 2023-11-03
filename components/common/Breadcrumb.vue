<script setup lang="ts">
	defineOptions({
		inheritAttrs: true
	});
</script>

<template>
	<nav class="m-2 flex rounded-lg border bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<slot />
		</ol>
	</nav>
</template>
