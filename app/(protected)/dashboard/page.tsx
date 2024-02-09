import Collection from '@/components/Collection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/lib/auth'
// import { ENTRIES_PER_PAGE } from '@/lib/constants'
import { getAllEvents, getAllEventsCount } from '@/app/actions'
import SearchEvents from '@/components/SearchEvents'
import { EventsPagination } from '@/components/EventsPagination'

const ENTRIES_PER_PAGE = 6

type PramsProps = {
	searchParams: { [key: string]: string | undefined }
}

export default async function Dashboard({ searchParams }: PramsProps) {
	const session = await auth()
	const pageNumber = Number(searchParams?.page) || 1
	const searchQuery = searchParams?.query || ''

	const recordCountPromise = getAllEventsCount({
		query: searchQuery,
		organizer: session?.user?.id,
	})

	const recordPagePromise = getAllEvents({
		limit: ENTRIES_PER_PAGE,
		query: searchQuery,
		organizer: session?.user?.id,
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
		<main className='h-full w-full flex flex-col flex-1 pt-12 pb-24'>
			<div className='container w-full p-6 border shadow-sm rounded-xl'>
				<h1 className='font-bold text-xl mb-6'>Actions</h1>
				<div className='flex flex-col md:flex-row gap-4'>
					<Button asChild>
						<Link href={'/events/create'}>Create a new event</Link>
					</Button>

					<Button asChild>
						<Link href={'/explore'}>Explore more events</Link>
					</Button>

					<Button asChild>
						<Link href={'/events/create'}>Update your profile</Link>
					</Button>
				</div>
			</div>
			<section className='my-8 px-1'>
				<div className='flex items-center gap-3 mb-12'>
					<h2 className='text-2xl md:text-4xl font-bold'>
						Events you organized:
					</h2>
					<span className='inline-block rounded-lg bg-neutral-100 dark:text-neutral-800 px-3 py-1 text-sm'>
						{recordCount}
					</span>
				</div>
				<SearchEvents placeholder='Search your events with titles' />

				<Collection
					data={records}
					emptyTitle='No events added yet'
					emptyStateSubtext='Organise one by click the above button! 😇'
					page={1}
					limit={6}
				/>
				<div className='my-6 md:my-12'>
					<EventsPagination
						currPage={pageNumber}
						totalPages={page.totalNumberOfPages}
					/>
				</div>
			</section>
		</main>
	)
}
