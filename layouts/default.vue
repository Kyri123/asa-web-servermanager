<script setup lang="ts">
	const darkmode = useDarkMode();
</script>

<template>
	<div class="flex h-screen w-screen flex-col overflow-hidden dark:bg-gray-900">
		<div class="border py-2 dark:border-gray-800">
			<UContainer>
				<div class="flex items-center gap-3 p-1">
					<NuxtImg src="/images/ASA_Logo.webp" width="40" height="40" />
					<div class="flex-1 text-xl font-bold">ASA <span class="text-blue-500">Web Manager</span></div>
					<div>
						<UButton
							size="lg"
							class="float-right"
							variant="ghost"
							:icon="darkmode ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
							@click="darkmode = !darkmode" />
					</div>
				</div>
			</UContainer>
		</div>
		<div class="flex-1 overflow-hidden">
			<UContainer class="h-full">
				<div class="grid h-full grid-cols-12 overflow-hidden">
					<div class="col-span-3 overflow-y-scroll">
						<PageNav />
					</div>
					<div class="col-span-9 overflow-y-auto p-2">
						<slot />
					</div>
				</div>
			</UContainer>
		</div>
	</div>
</template>
