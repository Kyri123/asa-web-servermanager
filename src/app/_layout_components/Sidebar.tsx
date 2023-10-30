import Link from 'next/link';
import { Badge, Sidebar, SidebarCTA, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from '~/components/client/flowbite';
import { FiGithub, FiPieChart, FiServer, FiUsers } from '~/components/client/react-icons-fi';

export default function Component() {
	return (
		<Sidebar className='h-screen'>
			<div className=' flex h-full flex-col'>
				<SidebarLogo href='#' img='/ASA_Logo.webp' imgAlt='Asa Logo'>
					<p>Asa Manager</p>
				</SidebarLogo>
				<SidebarItems className='flex-1 overflow-auto'>
					<SidebarItemGroup>
						<SidebarItem as={Link} href='/' icon={FiPieChart}>
							<p>Dashboard</p>
						</SidebarItem>
						<SidebarItem as={Link} href='/servers' icon={FiServer}>
							<p>Servers</p>
						</SidebarItem>
						<SidebarItem as={Link} href='/users' icon={FiUsers}>
							<p>Users</p>
						</SidebarItem>
					</SidebarItemGroup>
				</SidebarItems>
				<SidebarCTA>
					{' '}
					<div className='mb-3 flex items-center'>
						<Badge color='red'>Alpha</Badge>
					</div>
					<div className='mb-3 text-sm text-cyan-900 dark:text-gray-400'>
						<p>
							This application is currently in alpha state. Please report any bugs or issues and suggestions on{' '}
							<a
								target='_blank'
								rel='noreferrer'
								className='inline text-sm text-cyan-900 no-underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300'
								href='https://github.com/Kyri123/asa-web-servermanager'>
								Github. <FiGithub className='inline' />
							</a>
						</p>
					</div>
				</SidebarCTA>
			</div>
		</Sidebar>
	);
}
