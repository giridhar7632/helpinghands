import { auth } from '@/lib/auth'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-provider'
import ProfileMenu from '@/components/ProfileMenu'
import { Button } from '@/components/ui/button'
import { MobileNav } from '@/components/MobileNav'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()
	return (
		<div className='max-w-5xl min-h-screen px-4 mx-auto overflow-x-hidden flex flex-col justify-between'>
			<nav className='flex py-4 items-center justify-between'>
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image alt='logo' src='/logo.png' width={32} height={32} />
						<p className='leading-none'>Helping hands network</p>
					</div>
				</Link>
				<div className='flex items-center gap-4'>
					{session?.user ? (
						<ProfileMenu {...session.user} />
					) : (
						<Button asChild>
							<Link href='/auth/login'>Login</Link>
						</Button>
					)}
					<MobileNav />
					<ThemeToggle />
				</div>
			</nav>
			<main className='flex-1 w-full h-full py-24'>{children}</main>
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
