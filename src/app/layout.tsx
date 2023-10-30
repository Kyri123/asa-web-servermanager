import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import { getSession } from '~/session/getSession';
import { TRPCReactProvider } from '~/trpc/react';
import Navbar from './_layout_components/Navbar';
import Sidebar from './_layout_components/Sidebar';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
});

export const metadata = {
	description: 'Ark: Survival Ascended Web Server Manager',
	icons: [{ rel: 'icon', url: '/ASA_Logo.webp' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const session = getSession();

	return (
		<html lang='en'>
			<body className={`font-sans ${inter.variable}`}>
				<TRPCReactProvider headers={headers()}>
					<div className='flex h-screen w-screen'>
						{!!session ? (
							<>
								<Sidebar />
								<div className='flex h-full flex-1 flex-col overflow-hidden'>
									<div className='overflow-auto'>
										<Navbar />
									</div>
									<div className='flex-1 overflow-auto'>{children}</div>
								</div>
							</>
						) : (
							<div
								className='flex h-screen w-screen'
								style={{
									backgroundImage: 'url(/bg.jpeg)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}>
								<div className='absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2'>{children}</div>
							</div>
						)}
					</div>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
