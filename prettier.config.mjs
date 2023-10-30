/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options & import('prettier-plugin-organize-imports').options} */
const config = {
	jsxSingleQuote: true,
	proseWrap: 'never',
	quoteProps: 'consistent',
	vueIndentScriptAndStyle: true,
	singleQuote: true,
	trailingComma: 'none',
	useTabs: true,
	bracketSameLine: true,
	bracketSpacing: true,
	insertPragma: false,
	tabWidth: 4,
	printWidth: 150,
	plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
};

export default config;
