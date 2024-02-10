import { Badge } from './ui/badge'
import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import { DeleteEvent } from './DeleteEvent'
import { formatDateRange, toSlug } from '@/lib/utils'

type EventCardProps = {
	event: any
}

export default async function EventCard({ event }: EventCardProps) {
	const session = await auth()
	return (
		<div className='group cursor-pointer rounded-xl border bg-card text-card-foreground shadow relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden transition-all hover:shadow-lg md:min-h-[438px]'>
			<div className='h-[250px] w-full relative bg-pink-100 overflow-hidden'>
				{/* <Link href={`/events/${event.slug}`}> */}
				<Image
					src={event.imageUrl}
					alt={event.title}
					className='object-cover group-hover:scale-105 transition-all'
					fill={true}
					sizes='(max-width: 768px) 80vw, (max-width: 1200px) 30vw'
				/>
				{/* </Link> */}
			</div>
			<div className='flex flex-col p-4 gap-3 mb-4'>
				<Link href={`/events/${event.slug}`}>
					<h2 className='text-xl font-bold text-ellipsis my-2'>
						{event.title}
					</h2>
				</Link>
				<p className='text-neutral-500'>
					{formatDateRange(event.startDateTime, event.endDateTime)}
				</p>
				<Link
					href={`/category/${event.categoryId}-${toSlug(
						event.category?.name || ''
					)}`}>
					<Badge variant='outline'>{event.category?.name}</Badge>
				</Link>
				{session?.user && session?.user?.id === event.organizerId ? (
					<div className='absolute right-2 top-2 flex flex-col text-right gap-4 rounded-xl bg-white dark:bg-neutral-900 border p-3 shadow-sm transition-all'>
						{/* <EventMenu slug={event.slug} eventId={event.id} /> */}
						<Link href={`/events/${event.slug}/registrations`}>
							View registrations
						</Link>
						<Link href={`/events/${event.slug}/update`}>Update event</Link>
						<DeleteEvent eventId={event.id}>
							<span className='text-red-500'>Delete</span>
						</DeleteEvent>
					</div>
				) : null}
			</div>
		</div>
	)
}
