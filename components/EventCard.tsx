import { IEvent } from '@/types'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from './ui/button'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { EventMenu } from './EventMenu'

type EventCardProps = {
	event: IEvent
}

export default async function EventCard({ event }: EventCardProps) {
	const session = await auth()
	return (
		<div className='group cursor-pointer rounded-xl border bg-card text-card-foreground shadow relative flex min-h-[380px] w-full max-w-[400px] flex-col justify-between overflow-hidden transition-all hover:shadow-lg md:min-h-[438px]'>
			<div className='h-[250px] w-full relative bg-pink-100 overflow-hidden'>
				<Image
					src={event.imageUrl}
					alt={event.title}
					className='object-cover group-hover:scale-105 transition-all'
					fill={true}
				/>
			</div>
			<div className='flex flex-col p-4 gap-3 mb-4'>
				<Link href={`/events/${event.slug}`}>
					<h2 className='text-xl font-bold text-ellipsis my-2'>
						{event.title}
					</h2>
				</Link>
				<p className='text-neutral-500'>
					{format(event.startDateTime as Date, 'PPP')}
				</p>
				<Link href={`/category/${event.categoryId}`}>
					<Badge variant='outline'>{event.category?.name}</Badge>
				</Link>
				{session?.user && session?.user?.id === event.organizer?.id ? (
					<div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
						<EventMenu eventId={event.id} />
					</div>
				) : null}
			</div>
		</div>
	)
}
