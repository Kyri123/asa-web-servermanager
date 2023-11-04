import { Permission } from '~/utils/enum';
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable unused-imports/no-unused-vars */
import { eq } from 'drizzle-orm';
import type { EventHandlerRequest, H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import { db, permission } from '~/server/utils/db';

/**
 *  The user object that will be stored in the session
 * @param event  The event to set the cookie on
 * @param user  The user to create the session for
 * @param expiresIn  The number of days the session should last
 */
export async function createSession(event: H3Event<EventHandlerRequest>, user: User, expiresIn = 7) {
	if (!process.env.JWT_SECRET_KEY) {
		throw createError({
			statusCode: 500,
			statusMessage: 'JWT_SECRET_KEY not set!'
		});
	}

	if (user.accountDisabled) {
		throw createError({
			statusCode: 403,
			statusMessage: 'Account is not Active!'
		});
	}

	// get all permissions for user
	const permissions = await db
		.select()
		.from(permission)
		.where(eq(permission.userId, user.id))
		.then((rows) => {
			return rows.map((row) => {
				return row.permission;
			});
		});

	// we don't want to send the password or seed to the client
	const { password, seed, ...userdata } = user;

	// create token
	const token = jwt.sign({ ...userdata, permissions }, process.env.JWT_SECRET_KEY, {
		expiresIn: `${expiresIn}d`
	});

	await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id));
	setCookie(event, 'token', token, { expires: moment().add(expiresIn, 'days').toDate() });
}

export function destorySession(event: H3Event<EventHandlerRequest>) {
	setCookie(event, 'token', '', { expires: new Date(0) });
}

/**
 *  The user object that will be stored in the session
 * @param event The event to get the cookie from
 */
export function parseSession(event: H3Event<EventHandlerRequest>, noThrow = false): SessionUser | null {
	if (!process.env.JWT_SECRET_KEY) {
		if (noThrow) return null;
		throw createError({
			statusCode: 500,
			statusMessage: 'JWT_SECRET_KEY not set!'
		});
	}

	const token = getCookie(event, 'token');
	if (!token) {
		if (noThrow) return null;
		throw createError({
			statusCode: 403,
			statusMessage: 'no session found!'
		});
	}

	try {
		return jwt.verify(token, process.env.JWT_SECRET_KEY) as SessionUser;
	} catch (err: any) {
		if (noThrow) return null;
		throw createError({
			statusCode: 403,
			statusMessage: err.message
		});
	}
}

/**
 * Check if the user has the given permission
 * @param event The event to get the cookie from
 * @param permission The permission to check for
 */
export function hasPermission(event: H3Event<EventHandlerRequest>, permission: Permission, ignoreAdmin: boolean = false) {
	const session = parseSession(event);
	if (session.permissions.includes(Permission.ADMIN) && !ignoreAdmin) {
		return session;
	}
	if (!session.permissions.includes(permission)) {
		throw createError({
			statusCode: 403,
			statusMessage: 'no permission!'
		});
	}
	return session;
}
