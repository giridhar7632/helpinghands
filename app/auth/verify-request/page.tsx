import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
	return (
		<>
			<Image
				className='mx-auto'
				width={72}
				height={72}
				src='/logo.png'
				alt='Helping hands network Logo'
			/>
			<h1 className='my-6 text-center text-2xl'>Check your email</h1>
			<p className='text-center'>
				✨ {"Use that magic link we've sent to sign in to your account"}
			</p>

			<Button asChild>
				<Link className='mx-auto mt-6' href={'/'}>
					Back to home
				</Link>
			</Button>
		</>
	)
}
