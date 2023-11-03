// type definitions for environment variables from .env.example file
declare namespace NodeJS {
	interface ProcessEnv {
		// Mysql database connection
		// run yarn run db:setup to create the tables in the database
		// https://dev.mysql.com/downloads/installer/
		DATABASE_HOST: string;
		DATABASE_PORT: string;
		DATABASE_USER: string;
		DATABASE_PASSWORD: string;
		DATABASE_DB: string;
		DATABASE_CREATE: string;

		// generate a secret key with for example: https://randomkeygen.com/ or https://www.hashgenerator.de/
		JWT_SECRET_KEY: string;

		// state check interval in ms (online/offline/starting/stopping)
		UPDATE_CHECK_INTERVAL: string;

		// Interval in ms to check for server updates
		SERVER_STATE_CHECK_INTERVAL: string;
	}
}
