<script setup lang="ts">
	defineOptions({
		inheritAttrs: true
	});

	defineProps({
		noDivider: {
			type: Boolean,
			required: false,
			default: false
		}
	});

	const slots = useSlots();

	const breadcrumbIsSet = computed(() => {
		return slots.breadcrumb !== undefined;
	});
</script>

<template>
	<Breadcrumb v-if="breadcrumbIsSet">
		<slot name="breadcrumb" />
	</Breadcrumb>
	<div class="flex items-center p-2 pb-3">
		<div class="flex-1 text-3xl font-bold tracking-tight text-secondary-500 dark:text-secondary-600 sm:text-4xl"><slot /></div>
		<div>
			<slot name="actions" />
		</div>
	</div>
	<UDivider v-if="!$props.noDivider" />
</template>
