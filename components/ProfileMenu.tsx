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
			<DropdownMenuTrigger className='rounded-full'>
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
				<DropdownMenuItem>
					<Link href='/profile'>Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='flex items-center gap-2'
					onClick={() => signOut({ callbackUrl: '/' })}>
					{/* <button
						onClick={() => signOut({ callbackUrl: '/' })}
						className='flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900'> */}
					<ExitIcon width={18} />
					<span>Sign out</span>
					{/* </button> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
