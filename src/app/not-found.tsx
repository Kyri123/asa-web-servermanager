import Link from 'next/link';

export const metadata = {
	title: 'ASA-WSM | 404'
};

export default function Custom404() {
	return (
		<section className='flex h-full items-center'>
			<div className='mx-auto px-4 py-8 lg:px-6 lg:py-16'>
				<div className='mx-auto text-center'>
					<h1 className='mb-4 text-7xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500 lg:text-9xl'>404</h1>
					<p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>Something&#39;s missing.</p>
					<p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
						Sorry, we can&#39;t find that page. You&#39;ll find lots to explore on the home page.
					</p>
					<Link
						href='/'
						className='my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'>
						Back to Dashboard
					</Link>
				</div>
			</div>
		</section>
	);
}
