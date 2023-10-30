import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Avatar, Button, Navbar } from '~/components/client/flowbite';
import { getSession } from '~/session/getSession';
import Brand from './NavbarBrand';

export default function Component() {
	const session = getSession();

	return (
		<div className='border-b'>
			<Navbar fluid rounded>
				<Brand />
				<div className='flex md:order-2'>
					{!!session && (
						<>
							<Avatar img='/ASA_Logo.webp' rounded>
								<div className='space-y-1 font-medium dark:text-white'>
									<div>Jese Leos</div>
									<div className='text-sm text-gray-500 dark:text-gray-400'>Joined in August 2014</div>
								</div>
							</Avatar>
							<Button color='link'>
								<FiLogOut className='me-2' /> Sign Out
							</Button>
						</>
					)}
					{!session && (
						<Button color='link'>
							<FiLogIn className='me-2' /> Sign In
						</Button>
					)}
				</div>
			</Navbar>
		</div>
	);
}
