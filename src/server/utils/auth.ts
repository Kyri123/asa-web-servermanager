import * as crypto from 'crypto';

export function encryptPassword(
	inputPassword: string,
	seed?: string
): {
	password: string;
	seed: string;
} {
	seed = seed ?? crypto.randomBytes(32).toString('hex');
	const password = crypto.pbkdf2Sync(inputPassword, seed, 1000, 32, `sha512`).toString(`hex`);

	return {
		password,
		seed
	};
}

export function comparePassword(inputPassword: string, password: string, seed: string): boolean {
	const hash = crypto.pbkdf2Sync(inputPassword, seed, 1000, 32, `sha512`).toString(`hex`);
	return password === hash;
}
