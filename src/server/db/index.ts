import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import fs from 'fs';
import mysql from 'mysql2/promise';
import * as schema from './schema';

import { join } from 'path';
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

(async () => {
	const folder = join(process.cwd(), 'src', 'server', 'db', 'migrations');
	console.log('Migrating database...');
	if (!fs.existsSync(folder)) return console.log('No migrations folder found!', folder);
	await migrate(db, { migrationsFolder: folder });
	console.log('Database migrated!');
})().catch((err) => {
	console.error(err);
	process.exit(1);
});

export * from './schema';
