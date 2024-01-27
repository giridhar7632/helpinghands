import { MobileNav } from '@/components/MobileNav'
import { ThemeToggle } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
	const session = await auth()

	return (
		<div className='flex flex-col min-h-screen'>
			<nav className='flex items-center justify-between p-4 md:px-6 md:py-4'>
				<Image src='/logo.png' width={32} height={32} alt='logo' />
				<div className='flex items-center gap-4'>
					{session?.user ? (
						<>
							<nav className='hidden md:flex w-full gap-4 sm:gap-6'>
								<Link href='/dashboard'>Dashboard</Link>
								<Link href='/explore'>Events</Link>
								<Link href='/create'>Create new Event</Link>
								<Link href='/profile'>Profile</Link>
							</nav>
							<MobileNav />
						</>
					) : (
						<Button asChild>
							<Link href='/auth/login'>Login</Link>
						</Button>
					)}
					<ThemeToggle />
				</div>
			</nav>
			<main className='relative flex-1'>
				<div className='px-4 md:px-12 py-24'>
					<h1 className='text-4xl md:text-8xl z-10 font-extrabold'>
						Lend a Hand,
						<br />
						Build a Heartbeat!
					</h1>
					<p className='text-xl my-4'>
						Join Helping hands, a network of passionate individuals dedicated to
						making a difference, one helping hand at a time.
					</p>
				</div>

				<Image
					src='/hands.png'
					alt='hero'
					className='-z-10 pt-12 md:pt-16 md:pl-16 object-contain h-full'
					fill={true}
				/>
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
						href='/form/contact-us'>
						Contact
					</Link>
				</nav>
			</footer>
		</div>
	)
}
