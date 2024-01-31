import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function EventMenu({ eventId }: { eventId: number }) {
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>
						<DotsVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>My Event</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href={`/events/${eventId}/update`}>Edit event</Link>
						</DropdownMenuItem>
						<DialogTrigger asChild>
							<DropdownMenuItem>
								<span>Delete</span>
							</DropdownMenuItem>
						</DialogTrigger>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to permanently
						delete this file from our servers?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button type='submit'>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
