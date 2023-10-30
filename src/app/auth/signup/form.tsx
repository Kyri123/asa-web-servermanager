'use client';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { HiExclamation } from 'react-icons/hi';
import { api } from '~/trpc/react';

export const metadata = {
	title: 'ASA-WSM | Sign In'
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Form() {
	const { mutateAsync: signUp } = api.auth.signup.useMutation();
	const [busy, setBusy] = React.useState(false);
	const [error, setError] = React.useState<Error | null>(null);
	const $router = useRouter();

	const passwordRef = React.useRef<HTMLInputElement>(null);
	const emailRef = React.useRef<HTMLInputElement>(null);
	const nameRef = React.useRef<HTMLInputElement>(null);

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (busy) return;
		if (!emailRef.current || !passwordRef.current || !nameRef.current) return;
		setBusy(true);
		signUp({
			username: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value
		})
			.then(() => {
				$router.push('/');
			})
			.catch((error) => {
				if (error instanceof Error) setError(error);
			})
			.finally(() => {
				setBusy(false);
			});
	};

	return (
		<form className='flex w-96 max-w-md flex-col gap-4 p-4' onSubmit={onSubmit}>
			{error && (
				<Alert
					onDismiss={() => setError(null)}
					additionalContent={
						<div>
							<div className='text-sm text-red-700 dark:text-red-800'>{error.message}</div>
							<div className='flex'></div>
						</div>
					}
					color='red'
					icon={HiExclamation}>
					<span className='font-medium'>Error!</span>
				</Alert>
			)}
			<div>
				<div className='mb-2 block'>
					<Label htmlFor='email' value='Email or username' />
				</div>
				<TextInput disabled={busy} ref={emailRef} id='email' placeholder='name@flowbite.com ' required type='email' />
			</div>
			<div>
				<div className='mb-2 block'>
					<Label htmlFor='username' value='Email or username' />
				</div>
				<TextInput disabled={busy} ref={nameRef} id='username' placeholder=' name' required type='text' />
			</div>
			<div>
				<div className='mb-2 block'>
					<Label htmlFor='password' value='Password' />
				</div>
				<TextInput disabled={busy} ref={passwordRef} id='password' required type='password' />
			</div>
			<Button isProcessing={busy} type='submit'>
				<FiLogIn className='me-2' /> Create Account
			</Button>
			<hr />
			<Button as={Link as any} href='/auth/signin' isProcessing={busy} type='submit'>
				<FiLogIn className='me-2' /> Login with existing account
			</Button>
		</form>
	);
}
