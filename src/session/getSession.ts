import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { env } from '~/env.cjs';
import { type SessionUser } from '~/server/db/schema/auth';

export function getSession(token?: string): SessionUser | null {
	if (!token) {
		const cookieStore = cookies();
		token = cookieStore.get('session')?.value;
	}
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
