import Form from './form';

export const metadata = {
	title: 'ASA-WSM | Sign In'
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
	return <Form />;
}
