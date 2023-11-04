import { jwtDecode } from 'jwt-decode';
import type { SessionUser } from '~/server/utils/db';

/**
 * get the session for SSR and Clientside
 */
export function getSession(token?: string | null): SessionUser | null {
	token = token ?? useCookie('token')?.value;

	if (!token) return null;
	try {
		const usr = jwtDecode<SessionUser>(token);
		if (!usr.exp || usr.exp < Date.now() / 1000) return null;
		return usr;
	} catch (e) {
		return null;
	}
}

/**
 * destroy the session for SSR and Clientside
 */
export function destorySession() {
	const userIdCookie = useCookie('token');
	userIdCookie.value = null;
}

/**
 * destroy the session for SSR and Clientside
 */
export async function testSession() {
	const headers = useRequestHeaders(['cookie']);
	const { valid } = await $fetch('/api/auth/validate', { headers });
	return valid;
}
