'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { deleteEvent } from '@/app/actions'
import toast from 'react-hot-toast'
import React from 'react'
import { useRouter } from 'next/navigation'

export function DeleteEvent({
	eventId,
	children,
}: {
	eventId: number
	children: React.ReactNode
}) {
	const router = useRouter()
	const handleDelete = async () => {
		try {
			await deleteEvent(eventId)
			toast.success('Event deleted!')
			router.push('/dashboard')
		} catch (error) {
			console.error(error)
			toast.error('Something went wrong while deleting the event! 😕')
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to permanently
						delete this event from our servers?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button type='submit' variant={'destructive'} onClick={handleDelete}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
