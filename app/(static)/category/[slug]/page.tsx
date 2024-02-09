import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/db'
import { toSlug } from '@/lib/utils'
import Collection from '@/components/Collection'
import { getAllEvents, getAllEventsCount } from '../../../actions'
import { ENTRIES_PER_PAGE } from '@/lib/constants'
import { EventsPagination } from '@/components/EventsPagination'
import SearchEvents from '@/components/SearchEvents'

type PramsProps = {
	params: { slug: string }
	searchParams?: { [key: string]: string | undefined }
}

export async function generateMetadata(
	{ params }: PramsProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const id = Number(params.slug.split('-')[0])
	const category = await prisma.category.findUnique({
		where: { id },
	})

	if (!category) {
		return (await parent) as Metadata
	}

	const previousImages = (await parent).openGraph?.images || []

	return {
		title: category?.name,
		openGraph: {
			title: category?.name,
			images: previousImages,
		},
		twitter: {
			card: 'summary_large_image',
			title: category?.name,
			images: previousImages,
		},
	}
}

export async function generateStaticParams() {
	const categories = await prisma.category.findMany()

	return categories.map((category) => ({
		slug: `${category.id}-${toSlug(category.name)}`,
	}))
}

export default async function CategoryPage({
	params,
	searchParams,
}: PramsProps) {
	const pageNumber = Number(searchParams?.page) || 1
	const searchQuery = searchParams?.query || ''

	const recordCountPromise = getAllEventsCount({
		query: searchQuery,
		category: Number(params.slug.split('-')[0]),
	})

	const recordPagePromise = getAllEvents({
		limit: ENTRIES_PER_PAGE,
		query: searchQuery,
		category: Number(params.slug.split('-')[0]),
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
				<h1 className='text-3xl mb-12 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
					Explore events related to category: {records[0]?.category?.name || ''}
				</h1>
				<span className='inline-block rounded-lg bg-neutral-100 dark:text-neutral-800 px-3 py-1 text-sm'>
					{recordCount}
				</span>
			</div>
			<SearchEvents placeholder='Search for the title of your favourite events' />

			<Collection
				data={records}
				emptyTitle='No events added yet'
				emptyStateSubtext='There are no events in this category! Please check again after sometime. 😇'
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
