<script setup lang="ts">
	defineProps({
		href: {
			type: String,
			required: false,
			default: undefined
		},
		active: {
			type: Boolean,
			required: false,
			default: false
		},
		first: {
			type: Boolean,
			required: false,
			default: false
		}
	});
</script>

<template>
	<li aria-current="page">
		<div class="flex items-center">
			<Icon v-if="!$props.first" name="heroicons-outline:chevron-right" class="dark:text-gray-400x text-gray-500" />
			<component
				:is="$props.href ? defineNuxtLink({}) : 'div'"
				:href="$props.href"
				:class="{
					'text-primary-500 dark:text-primary-400': !!$props.href,
					'font-semibold': $props.active
				}"
				class="ml-1 text-sm text-gray-500 dark:text-gray-400 md:ml-2">
				<slot />
			</component>
		</div>
	</li>
</template>
