import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import Collection from '@/components/Collection'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/lib/auth'
import ProfileMenu from '@/components/ProfileMenu'
import { MobileNav } from '@/components/MobileNav'
import { ThemeToggle } from '@/components/theme-provider'
import { getAllEvents } from './actions'

export default async function Component() {
	const session = await auth()
	const data = await getAllEvents({ query: '', limit: 6, page: 1 })
	// seedEvents()
	return (
		<>
			<header className='flex items-center justify-between p-4 md:px-6 md:py-4'>
				<Image src='/logo.png' width={32} height={32} alt='logo' />
				<nav className='hidden md:flex h-5 items-center space-x-4'>
					<Link href='/dashboard'>Dashboard</Link>
					<Separator orientation='vertical' />

					<Link href='/explore'>Explore Events</Link>
					<Separator orientation='vertical' />

					<Link href='/events/create'>Create new Event</Link>
				</nav>
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
			</header>
			<section className='w-full py-12'>
				<div className='container px-4 md:px-6'>
					<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
						<Image
							alt='Hero'
							className='mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square'
							height='550'
							src='/hands.png'
							width='550'
						/>
						<div className='flex flex-col justify-center space-y-4'>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
									Lend a Hand, Build a Heartbeat!
								</h1>
								<p className='max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400'>
									Join Helping hands, a network of passionate individuals
									dedicated to making a difference, one helping hand at a time.
								</p>
							</div>
							<div className='flex flex-col gap-2 min-[400px]:flex-row'>
								<Button asChild size={'lg'}>
									<Link href={'/dashboard'}>Explore now</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='w-full py-12 md:py-24 lg:py-32 bg-neutral-100 dark:bg-neutral-900'>
				<div className='container px-4 md:px-6'>
					<div className='flex flex-col items-center justify-center space-y-4 text-center'>
						<div className='space-y-2'>
							<Badge>Upcoming Events</Badge>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
								{"Don't Miss Out On These Events"}
							</h2>
						</div>
					</div>
					<div className='mx-auto max-w-5xl py-12'>
						<Collection
							data={data}
							emptyTitle='No events added yet'
							emptyStateSubtext='Please check back later! 😇'
							page={1}
							limit={6}
							totalPages={1}
						/>
					</div>
				</div>
			</section>
			<section className='w-full py-12 md:py-24 lg:py-32'>
				<div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
							{"Organizers, We've Got You Covered"}
						</h2>
						<p className='max-w-[600px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400'>
							View volunteer registration details and select volunteers for your
							events with ease.
						</p>
					</div>
					<div className='flex flex-col gap-2 min-[400px]:flex-row lg:justify-end'>
						<Button asChild size={'lg'}>
							<Link href='/events/create'>Organize an event</Link>
						</Button>
					</div>
				</div>
			</section>
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
		</>
	)
}
