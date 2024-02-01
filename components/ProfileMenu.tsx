'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExitIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type ProfileMenuProps = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

export default function ProfileMenu({ name, email, image }: ProfileMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full overflow-hidden'>
				<Image
					width={48}
					height={48}
					className='h-12 w-12'
					src={image || 'https://api.multiavatar.com/v.png'}
					alt={name || 'Avatar'}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<div className='text-xs text-gray-400'>Logged in as:</div>
					<div className='font-semibold mt-2'>{name}</div>
					<div className='truncate text-gray-500'>{email}</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link className='cursor-pointer' href='/profile'>
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='flex items-center gap-2 cursor-pointer'
					onClick={() => signOut({ callbackUrl: '/' })}>
					<ExitIcon width={18} />
					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
