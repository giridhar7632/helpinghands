'use client'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import {
	GitHubLogoIcon,
	HamburgerMenuIcon,
	LinkedInLogoIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'

export function MobileNav() {
	return (
		<nav className='md:hidden'>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline'>
						<HamburgerMenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent className='flex flex-col'>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>
					<div className='flex flex-col gap-4 py-2 flex-1'>
						<Link href='/dashboard'>Dashboard</Link>
						<Link href='/explore'>Events</Link>
						<Link href='/events/create'>Create new Event</Link>
					</div>
					<SheetFooter>
						<div className='w-full flex gap-4 sm:gap-6'>
							<Link href='https://twitter.com/@giridhar_talla'>
								<TwitterLogoIcon className='w-6 h-6' />
							</Link>
							<Link href='https://github.com/giridhar7632/helpinghands'>
								<GitHubLogoIcon className='w-6 h-6' />
							</Link>
							<Link href='https://linkedin.com/in/giridhar7632'>
								<LinkedInLogoIcon className='w-6 h-6' />
							</Link>
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</nav>
	)
}
