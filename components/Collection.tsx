import { IEvent } from '@/types'
import EventCard from './EventCard'
import EventCardSkeleton from './EventCardSkeleton'

type CollectionProps = {
	data: any
	emptyTitle: string
	emptyStateSubtext: string
	loading?: boolean
	limit: number
	page: number | string
	totalPages?: number
	urlParamName?: string
	collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

export default function Collection({
	data,
	emptyTitle,
	emptyStateSubtext,
	loading,
	limit,
	page,
	totalPages,
	urlParamName,
	collectionType,
}: CollectionProps) {
	return (
		<>
			{data.length > 0 ? (
				<div className='flex items-center flex-col gap-10 p-2 md:p-0'>
					<ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
						{loading
							? new Array(limit)
									.fill(0)
									.map((_, i) => <EventCardSkeleton key={i} />)
							: data.map((event: IEvent) => (
									<li key={event.id}>
										<EventCard event={event} />
									</li>
							  ))}
					</ul>
				</div>
			) : (
				<div className='flex items-center justify-center min-h-[200px] w-full flex-col gap-3 rounded-2xl bg-neutral-50  dark:bg-neutral-800 py-28 text-center'>
					<h3 className='text-bold md:text-lg'>{emptyTitle}</h3>
					<p className='text-sm'>{emptyStateSubtext}</p>
				</div>
			)}
		</>
	)
}
