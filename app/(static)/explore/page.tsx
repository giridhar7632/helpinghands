import SearchEvents from '@/components/SearchEvents'
import Collection from '../../../components/Collection'
import { EventsPagination } from '../../../components/EventsPagination'
import { ENTRIES_PER_PAGE } from '../../../lib/constants'
import { getAllEvents, getAllEventsCount } from '../../actions'

type PramsProps = {
	searchParams: { [key: string]: string | undefined }
}

export default async function Explore({ searchParams }: PramsProps) {
	const pageNumber = Number(searchParams?.page) || 1
	const searchQuery = searchParams?.query || ''

	const recordCountPromise = getAllEventsCount({ query: searchQuery })

	const recordPagePromise = getAllEvents({
		limit: ENTRIES_PER_PAGE,
		query: searchQuery,
		skip: ENTRIES_PER_PAGE * pageNumber - ENTRIES_PER_PAGE,
	})

	const [records, recordCount] = await Promise.all([
		recordPagePromise,
		recordCountPromise,
	])

	const totalNumberOfPages = Math.ceil(recordCount / ENTRIES_PER_PAGE)

	const page = {
		pageNumber,
		hasNextPage: totalNumberOfPages > pageNumber,
		hasPreviousPage: pageNumber > 1,
		totalNumberOfPages,
	}

	return (
		<>
			<div className='flex items-center gap-3 mb-12'>
				<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
					Explore events
				</h1>
				<span className='inline-block rounded-lg bg-neutral-100 dark:text-neutral-800 px-3 py-1 text-sm'>
					{recordCount}
				</span>
			</div>
			<SearchEvents placeholder='Search for the title of your favourite events' />
			<Collection
				data={records}
				emptyTitle='No events added yet'
				emptyStateSubtext='Please check back later! 😇'
				page={pageNumber}
				limit={ENTRIES_PER_PAGE}
			/>
			<div className='my-6 md:my-12'>
				<EventsPagination
					currPage={pageNumber}
					totalPages={page.totalNumberOfPages}
				/>
			</div>
		</>
	)
}
