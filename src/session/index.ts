import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { env } from '~/env.mjs';
import { db } from '~/server/db';
import { permission, type SessionUser, type User } from '~/server/db/schema/auth';

export function getSession(): SessionUser | null {
	const cookieStore = cookies();
	const token = cookieStore.get('session')?.value;
	if (!token) return null;

	if (window !== undefined) {
		try {
			return jwtDecode<SessionUser>(token);
		} catch (err) {
			return null;
		}
	}

	try {
		return jwt.verify(token, env.JWT_SECRET_KEY) as SessionUser;
	} catch (err) {
		return null;
	}
}

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

	// create token
	const token = jwt.sign({ ...user, permissions }, env.JWT_SECRET_KEY, {
		expiresIn
	});

	// set cookie with token
	const cookieStore = cookies();
	cookieStore.set('session', token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});
}
