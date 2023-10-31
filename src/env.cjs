/* eslint-disable @typescript-eslint/no-var-requires */
const { createEnv } = require('@t3-oss/env-nextjs');
const { z } = require('zod');

exports.env = createEnv({
	server: {
		NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
		DATABASE_HOST: z.string().default('localhost'),
		DATABASE_USER: z.string().default('root'),
		DATABASE_PASSWORD: z.string().default(''),
		DATABASE_DB: z.string().default('asa_web_servermanager'),
		JWT_SECRET_KEY: z.string().min(16),
		PORT: z.number().min(1).max(65535)
	},

	client: {},

	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_HOST: process.env.DATABASE_HOST,
		DATABASE_USER: process.env.DATABASE_USER,
		DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
		DATABASE_DB: process.env.DATABASE_DB,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		PORT: parseInt(process.env.PORT ?? '3000')
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true
});
