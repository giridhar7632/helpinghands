'use client'

import { CopyIcon } from '@radix-ui/react-icons'
import copy from 'copy-text-to-clipboard'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'

export function ShareButton({ link }: { link: string }) {
	const fullLink = window
		? `${window.location.origin}${link}`
		: `https://helpinghands-delta.vercel.app/${link}`

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Share</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Label htmlFor='link' className='sr-only'>
							Link
						</Label>
						<Input id='link' defaultValue={fullLink} readOnly />
					</div>
					<Button
						type='submit'
						size='sm'
						className='px-3'
						onClick={() => {
							try {
								copy(fullLink)
								toast.success('Copied to clipboard! 🎉')
							} catch (error) {
								console.error(error)
							}
						}}>
						<span className='sr-only'>Copy</span>
						<CopyIcon className='h-4 w-4' />
					</Button>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
