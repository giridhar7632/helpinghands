import { auth } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()
	if (session?.user) redirect('/app')
	return (
		<div className='max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex w-full h-full flex-col items-center justify-between'>
			<main className='py-24'>
				<div className='w-80 sm:w-96 flex flex-col bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-2xl p-6 md:p-12'>
					{children}
				</div>
			</main>
			<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-gray-600'>
				<div className='flex gap-2 items-center'>
					<Image src='/heart.svg' width={24} height={24} alt='logo' />
					<Link href={'/'} className='text-xs text-gray-500  '>
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
						href='/form/contact-us'>
						Contact
					</Link>
				</nav>
			</footer>
		</div>
	)
}
