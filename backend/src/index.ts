/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { config } from 'dotenv';
config();

import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';
import { migrateDb } from '~/db';
import { env } from '~env';
import { scheduleManager } from './schedule';

const dev = process.env.NODE_ENV !== 'production';
const port = env.PORT;

const app = next({ dev, port });
const handle = app.getRequestHandler();

(async () => {
	await migrateDb();
	await scheduleManager.init();
	app.prepare().then(() => {
		createServer(async (req, res) => {
			try {
				req.url = req.url ?? '';
				const parsedUrl = parse(req.url, true);
				await handle(req, res, parsedUrl);
			} catch (err) {
				console.error('Error occurred handling', req.url, err);
				res.statusCode = 500;
				res.end('internal server error');
			}
		})
			.once('error', (err) => {
				console.error(err);
				process.exit(1);
			})
			.listen(port, () => {
				console.log(`> Ready on http://localhost:${port}`);
			});
	});
})();
