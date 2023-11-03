import { migrate } from 'drizzle-orm/mysql2/migrator';
import fs from 'fs';
import { join } from 'path';
import { db } from '~/server/utils/db';
import { log } from '~/utils/logger';

/**
 * This plugin will run the database migrations.
 * before nitro starts the server.
 */
export default defineNitroPlugin(async () => {
	const folder = join(process.cwd(), 'server/migrations');
	log('backend', 'Migrating database...');
	if (!fs.existsSync(folder)) return log('error', 'No migrations folder found!', folder);
	try {
		await migrate(db, { migrationsFolder: folder });
	} catch (e: any) {
		log('error', 'Failed to migrate database!');
		log(
			'error',
			'Please check if your database credentials are correct!',
			process.env.DATABASE_HOST,
			process.env.DATABASE_PORT,
			process.env.DATABASE_USER
		);
		log('error', 'Please check if your database is running!', process.env.DATABASE_HOST, process.env.DATABASE_PORT);
		log('error', 'Please check if your database is reachable!', process.env.DATABASE_HOST, process.env.DATABASE_PORT);
		log('error', 'Please check if your database user has the correct permissions!', process.env.DATABASE_USER);
		log('error', 'Please check if your database has the correct schema!', process.env.DATABASE_DB);
		await new Promise((resolve) => {
			return setTimeout(() => {
				log('fatal', e.message);
				resolve(null);
			}, 100);
		});
	}
	log('backend', 'Database migrated!');
});
