import { type Config } from 'drizzle-kit';

export default {
	schema: './src/server/db/schema',
	driver: 'mysql2',
	out: './server/migrations',
	dbCredentials: {
		host: process.env.DATABASE_HOST!,
		port: parseInt(process.env.DATABASE_PORT!),
		user: process.env.DATABASE_USER!,
		database: process.env.DATABASE_DB!,
		password: process.env.DATABASE_PASSWORD!
	}
} satisfies Config;
