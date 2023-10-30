// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./node_modules/flowbite-react/**/*.{ts,tsx,js}', './src/**/*.{ts,tsx}', './public/**/*.html'],
	theme: {
		extend: {}
	},
	darkMode: 'class',
	plugins: [require('flowbite/plugin')]
};

export default config;
