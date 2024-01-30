'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex flex-col'>
			<main className='flex-1 mx-auto py-24'>
				<div className='w-80 sm:w-96 flex flex-col border bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-600 rounded-2xl p-6 md:p-12'>
					<Image
						className='mx-auto'
						width={72}
						height={72}
						src='/logo.png'
						alt='Helping hands network Logo'
					/>
					<h1 className='my-6 text-center text-2xl'>404</h1>
					<p className='text-center'>
						The page you are searching is not found!
					</p>

					<Button asChild>
						<Link className='mx-auto mt-6' href={'/'}>
							Go to home
						</Link>
					</Button>

					<p className='text-xs text-center text-neutral-400 my-4'>
						If this is not what expected, let us know{' '}
						<Link
							className='underline underline-offset-4 text-pink-500'
							href='/contact-us'>
							here.
						</Link>{' '}
					</p>
				</div>
			</main>
			<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-neutral-600'>
				<div className='flex gap-2 items-center'>
					<Image src='/heart.svg' width={24} height={24} alt='logo' />
					<Link href={'/'} className='text-xs text-neutral-500  '>
						Helping hands network.
					</Link>
				</div>
				<nav className='sm:ml-auto flex gap-4 sm:gap-6'>
					<Link
						className='text-xs hover:underline underline-offset-4'
						href='/terms'>
						Terms of Service
					</Link>
					<Link
						className='text-xs hover:underline underline-offset-4'
						href='/policy'>
						Privacy
					</Link>
					<Link
						className='text-xs hover:underline underline-offset-4'
						href='/contact-us'>
						Contact
					</Link>
				</nav>
			</footer>
		</div>
	)
}
