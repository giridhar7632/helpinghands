import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/db'
import { toSlug } from '@/lib/utils'
import Collection from '@/components/Collection'

type PramsProps = {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
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
	const records = await prisma.events.findMany({
		where: { categoryId: Number(params.slug.split('-')[0]) },
		include: {
			category: { select: { id: true, name: true } },
			User: { select: { id: true, name: true, email: true } },
		},
	})
	return (
		<>
			<h1 className='text-3xl font-bold md:text-5xl/none mb-12'>
				Explore events related to category: {records[0].category?.name}
			</h1>
			<Collection
				data={records}
				emptyTitle='No events added yet'
				emptyStateSubtext='Please check back later! 😇'
				page={1}
				limit={6}
				totalPages={1}
			/>
		</>
	)
}
