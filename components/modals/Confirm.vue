<script setup lang="ts">
	defineProps({
		title: {
			type: null as unknown as PropType<Nullish<string>>,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		closeButton: {
			type: Boolean,
			required: false,
			default: true
		},
		confirmText: {
			type: null as unknown as PropType<Nullish<string>>,
			required: false,
			default: () => {
				return 'OK';
			}
		},
		cancelText: {
			type: null as unknown as PropType<Nullish<string>>,
			required: false,
			default: () => {
				return 'Abbrechen';
			}
		},
		rejectText: {
			type: null as unknown as PropType<Nullish<string>>,
			required: false,
			default: () => {
				return null;
			}
		}
	});
	const emit = defineEmits<{
		(e: 'confirm'): void;
		(e: 'reject'): void;
		(e: 'close'): void;
	}>();

	const open = ref(true);

	function doEmit(event: 'confirm' | 'reject' | 'close') {
		open.value = false;
		setTimeout(() => {
			emit(event as any);
		}, 300);
	}
</script>

<template>
	<UModal v-model="open" @close="doEmit('reject')">
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template v-if="$props.title" #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						{{ $props.title }}
					</h3>
					<UButton
						v-if="$props.closeButton"
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="doEmit('reject')" />
				</div>
			</template>

			{{ $props.text }}

			<template #footer>
				<div class="flex justify-end gap-2">
					<UButton v-if="!!$props.rejectText" color="red" @click="doEmit('reject')">{{ $props.rejectText }}</UButton>
					<UButton v-if="$props.cancelText !== null" color="gray" @click="doEmit('close')">
						{{ $props.cancelText }}
					</UButton>
					<UButton v-if="$props.confirmText !== null" @click="doEmit('confirm')">
						{{ $props.confirmText }}
					</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>
