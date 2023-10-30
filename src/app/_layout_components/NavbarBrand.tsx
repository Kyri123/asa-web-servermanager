'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavbarBrand } from '~/components/client/flowbite';

export default function Brand() {
	const [title, setTitle] = useState<string>('');
	const pathname = usePathname();

	useEffect(() => {
		setTitle(document.title);
	}, [pathname]);

	return (
		<NavbarBrand href='/'>
			<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>{title}</span>
		</NavbarBrand>
	);
}
