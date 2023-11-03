import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const poolConnection = mysql.createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	port: parseInt(process.env.DATABASE_PORT!),
	database: process.env.DATABASE_DB,
	password: process.env.DATABASE_PASSWORD,
	multipleStatements: true
});

export const db = drizzle(poolConnection, {
	schema,
	mode: 'default'
});

export * from './schema';
