module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser'
	},
	extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
	plugins: ['unused-imports'],
	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'vue/no-deprecated-slot-attribute': 'off',
		'spaced-comment': 'off',
		'vue/no-multiple-template-root': 'off',
		'import/order': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
		'prettier/prettier': 'off',
		'vue/multi-word-component-names': 'off'
	}
};
