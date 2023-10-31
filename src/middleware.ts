'use server';
import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '~/session/getSession';

const authUrls = ['/auth/signin', '/auth/signup'];

export function middleware(request: NextRequest) {
	const session = getSession();
	const { pathname } = new URL(request.url);
	const isNextDir = pathname.startsWith('/_next');
	const isFile = pathname.match(/\.[0-9a-z]+$/i);

	if (!session && !authUrls.includes(pathname) && !isNextDir && !isFile) {
		return NextResponse.redirect(new URL(authUrls[0]!, request.url));
	}
}

export const config = {
	matcher: '/:path*'
};

export const runtime = 'nodejs';
