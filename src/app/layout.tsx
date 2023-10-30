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
								<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
									<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
										<div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8'>
											{children}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
