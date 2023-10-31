import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

import { env } from '../../env.cjs';

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

export * from './schema';
