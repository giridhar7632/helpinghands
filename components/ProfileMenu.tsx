'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ExitIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'

type ProfileMenuProps = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

export default function ProfileMenu({ name, email, image }: ProfileMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full overflow-hidden'>
				<Avatar>
					<AvatarImage src={image || ''} alt={name || ''} />
					<AvatarFallback>{getInitials(name || '')}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<div className='text-xs text-neutral-400'>Logged in as:</div>
					<div className='font-semibold mt-2'>{name}</div>
					<div className='truncate text-neutral-500'>{email}</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link className='cursor-pointer' href='/dashboard'>
						Dashboard
					</Link>
				</DropdownMenuItem>
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
