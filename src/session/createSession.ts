import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { env } from '~/env.mjs';
import { db } from '~/server/db';
import { permission, type User } from '~/server/db/schema/auth';

export async function createSession(user: User, expiresIn = '7d') {
	'use server';
	// get all permissions for user
	const permissions = await db
		.select()
		.from(permission)
		.where(eq(permission.userId, user.id))
		.then((rows) => {
			return rows.map((row) => row.permission);
		});

	// we don't want to send the password or seed to the client
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, seed, ...userdata } = user;

	// create token
	const token = jwt.sign({ ...userdata, permissions }, env.JWT_SECRET_KEY, {
		expiresIn
	});

	// set cookie with token
	const cookieStore = cookies();
	cookieStore.set({
		name: 'session',
		value: token,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});
}
