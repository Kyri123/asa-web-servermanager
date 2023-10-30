import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import * as schema from './schema';

import { env } from '~/env.mjs';

const poolConnection = mysql.createPool({
	host: env.DATABASE_HOST,
	user: env.DATABASE_USER,
	database: env.DATABASE_DB,
	password: env.DATABASE_PASSWORD,
	multipleStatements: true
});

export const db = drizzle(poolConnection, {
	schema,
	mode: 'default'
});

migrate(db, { migrationsFolder: './migration' }).catch((err) => {
	console.error(err);
	process.exit(1);
});

export * from './schema';
