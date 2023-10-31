import { migrate } from 'drizzle-orm/mysql2/migrator';
import fs from 'fs';
import { join } from 'path';
import { db } from '~db/index';

export async function migrateDb() {
	const folder = join(process.cwd(), 'src', 'server', 'db', 'migrations');
	console.log('> Migrating database...');
	if (!fs.existsSync(folder)) return console.log('No migrations folder found!', folder);
	await migrate(db, { migrationsFolder: folder });
	console.log('> Database migrated!');
}
