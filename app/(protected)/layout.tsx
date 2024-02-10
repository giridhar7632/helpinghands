import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { MobileNav } from '@/components/MobileNav'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-provider'
import ProfileMenu from '@/components/ProfileMenu'

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
						<p className='hidden md:inline leading-none'>
							Helping hands network
						</p>
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
			<main className='flex w-full h-full flex-col py-24'>{children}</main>
		</div>
	)
}
