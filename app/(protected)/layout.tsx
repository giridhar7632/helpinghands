import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { MobileNav } from '@/components/MobileNav'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-provider'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()
	if (!session?.user) redirect('/auth/login')
	return (
		<div className='max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden'>
			<nav className='flex py-4 items-center justify-between px-2'>
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image alt='logo' src='/logo.png' width={32} height={32} />
						<p className='leading-none'>Helping hands network</p>
					</div>
				</Link>
				<div className='flex items-center justify-end gap-3'>
					{session?.user ? (
						<MobileNav />
					) : (
						<Link href={'/auth/login'}>
							<Button>Login</Button>
						</Link>
					)}
					<ThemeToggle />
				</div>
			</nav>
			<main className='flex w-full h-full flex-col justify-between py-24'>
				{children}
			</main>
		</div>
	)
}