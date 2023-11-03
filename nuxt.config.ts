// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-typed-router', 'nuxt-icon', '@nuxt/ui', '@nuxt/image'],
	devtools: { enabled: false },
	imports: {
		dirs: ['composables/**', 'utils/**']
	},
	colorMode: {
		preference: 'dark'
	},
	ui: {
		icons: 'all',
		global: true
	},
	pinia: {
		storesDirs: ['./stores/**']
	},
	css: ['vue-final-modal/style.css'],
	components: [
		{ path: '~/components/server', prefix: 'Server' },
		{ path: '~/components/page', prefix: 'Page' },
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
