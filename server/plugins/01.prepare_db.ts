import mysql from 'mysql2/promise';
import { log } from '~/utils/logger';

/**
 * This plugin will run the database migrations.
 * before nitro starts the server.
 */
export default defineNitroPlugin(async () => {
	if (process.env.DATABASE_CREATE.toLowerCase() !== 'true') return;
	log('backend', 'Prepare database...');
	const con = await mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		port: parseInt(process.env.DATABASE_PORT!),
		password: process.env.DATABASE_PASSWORD
	});
	await con.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_DB}\`;`);
	await con.end();
});
