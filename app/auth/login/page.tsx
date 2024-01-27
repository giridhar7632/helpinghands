import Image from 'next/image'
import { EmailLogin, SocialLogin } from '../Methods'

export default async function Login() {
	return (
		<>
			<Image
				className='mx-auto'
				width={72}
				height={72}
				src='/logo.png'
				alt='Helping hands network Logo'
			/>
			<h1 className='my-6 text-center'>Welcome to Helping hands network</h1>
			<EmailLogin />
			<div className='my-6'>
				<p className='text-neutral-400 text-center'>- Or -</p>
				<div className='flex items-center gap-4 pt-4'>
					<SocialLogin type='Google' />
					<SocialLogin type='GitHub' />
				</div>
			</div>
		</>
	)
}
