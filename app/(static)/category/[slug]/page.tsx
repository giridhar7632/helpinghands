import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/db'
import { toSlug } from '@/lib/utils'
import Collection from '@/components/Collection'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
	return records && records.length > 0 ? (
		<>
			<h1 className='text-3xl mb-12 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
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
	) : (
		<div className='w-80 mx-auto sm:w-96 flex flex-col border border-neutral-200 dark:border-neutral-600 rounded-2xl p-6 md:p-12'>
			<Image
				className='mx-auto'
				width={72}
				height={72}
				src='/logo.png'
				alt='Helping hands network Logo'
			/>
			<h1 className='my-6 text-center text-2xl'>No events found</h1>
			<p className='text-center'>
				{
					'There are no events in this category! Please check again after sometime.'
				}
			</p>
			<Link className='mx-auto mt-6' href={'/'}>
				<Button>Explore other events</Button>
			</Link>
			<p className='text-xs text-center text-neutral-400 my-4'>
				If this is not what expected, let us know{' '}
				<Link
					className='underline underline-offset-4 text-pink-500'
					href='/form/contact-us'>
					here.
				</Link>
			</p>
		</div>
	)
}
