// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/image', 'nuxt-typed-router', 'nuxt-icon', '@nuxt/ui'],
	devtools: { enabled: true },
	imports: {
		dirs: ['composables/**', 'types/**', 'utils/**']
	},
	ui: {
		global: true,
		icons: ['nuxt-icons']
	},
	pinia: {
		storesDirs: ['./stores/**']
	},
	css: ['vue-final-modal/style.css', '~/assets/css/global.css'],
	components: [
		{ path: '~/components/server', prefix: 'Server' },
		{ path: '~/components/modals', prefix: 'Modal' },
		{ path: '~/components/common', pathPrefix: false }
	],
	nitro: {
		hooks: {
			'dev:reload': () => {
				return require('sharp');
			}
		}
	}
});
