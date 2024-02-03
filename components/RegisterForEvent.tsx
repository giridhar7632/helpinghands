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
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import { registerForEvent } from '@/app/actions'
import toast from 'react-hot-toast'

type RegisterForEventProps = {
	event: string
	eventId: number
	userId: string
}

export function RegisterForEvent({
	event,
	eventId,
	userId,
}: RegisterForEventProps) {
	const [open, setOpen] = useState<boolean>(false)
	const [description, setDescription] = useState<string>('')

	const handleAddRegistration = async () => {
		try {
			const registration = await registerForEvent(eventId, userId, description)
			if (registration.eventId) {
				toast.success(
					'Registered successfully! 🎉\n Please be patient until the organizer contacts you.'
				)
				setOpen(false)
			}
		} catch (error) {
			console.error(error)
			if (
				(error as Error).message.match(
					/Unique constraint failed on the fields: \(`(.*?)`\)/
				)
			) {
				toast.error('You are already registered for this event!')
				setOpen(false)
			} else {
				toast.error('Something went wrong while registering! 😕')
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='flex-1'>Register for the event</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Register for {event}</DialogTitle>
					<DialogDescription>
						Describe in short why you want to volunteer for this event. Click
						submit when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div className='my-2 h-32'>
					<Textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Type your message here.'
						className='textarea rounded-xl h-full'
					/>
				</div>
				<DialogFooter>
					<Button onClick={() => handleAddRegistration()} type='submit'>
						Submit
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
