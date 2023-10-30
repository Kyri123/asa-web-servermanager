import { type Config } from 'drizzle-kit';

import { env } from '~/env.mjs';

export default {
	schema: './src/server/db/schema',
	driver: 'mysql2',
	out: './src/server/db/migrations',
	dbCredentials: {
		host: env.DATABASE_HOST,
		user: env.DATABASE_USER,
		database: env.DATABASE_DB,
		password: env.DATABASE_PASSWORD
	},
	tablesFilter: ['asa-web-servermanager_*']
} satisfies Config;
