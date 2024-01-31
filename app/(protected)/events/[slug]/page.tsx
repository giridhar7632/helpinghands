import Image from 'next/image'
import Link from 'next/link'

import prisma from '@/lib/db'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

import { Metadata, ResolvingMetadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Link2Icon, SewingPinIcon } from '@radix-ui/react-icons'

type PramsProps = {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
	{ params }: PramsProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const event = await prisma.events.findUnique({
		where: { slug: params.slug },
		select: {
			title: true,
			description: true,
			imageUrl: true,
		},
	})

	if (!event) {
		return (await parent) as Metadata
	}

	const { title, description, imageUrl } = event
	const previousImages = (await parent).openGraph?.images || []

	return {
		title,
		description,
		openGraph: {
			title,
			description: description as string,
			images: [imageUrl, ...previousImages],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description: description as string,
			images: [imageUrl, ...previousImages],
		},
	}
}

export async function generateStaticParams() {
	const events = await prisma.events.findMany()

	return events.map((event) => ({
		slug: event.slug,
	}))
}

export default async function EventPage({
	params,
}: {
	params: { slug: string }
}) {
	const record = await prisma.events.findUnique({
		where: { slug: params.slug },
		include: {
			category: { select: { id: true, name: true } },
			User: { select: { id: true, name: true, email: true } },
		},
	})
	return record ? (
		<>
			<section className='flex justify-center bg-neutral-50 bg-dotted-pattern bg-contain'>
				<div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
					<Image
						src={record.imageUrl}
						alt='hero image'
						width={1000}
						height={1000}
						className='h-full min-h-[300px] object-cover object-center'
					/>

					<div className='flex w-full flex-col gap-8 p-5 md:p-10'>
						<div className='flex flex-col gap-6'>
							<h2 className='text-3xl md:text-4xl font-bold mb-2'>
								{record.title}
							</h2>

							<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
								<div className='flex gap-3'>
									<Badge variant={'outline'}>{record.category?.name}</Badge>
								</div>

								<p className='ml-2 text-neutral-500 mt-2 sm:mt-0'>
									by{' '}
									<Link
										href={`/user/${record.User?.id}`}
										className='text-pink-500'>
										{record.User?.name ? record.User.name : record.User?.email}
									</Link>
								</p>
							</div>
						</div>

						<div className='flex flex-col gap-5'>
							<div className='flex items-center gap-2 md:gap-3'>
								<CalendarIcon />
								<div className='flex flex-wrap items-center'>
									<p>{format(record.startDateTime as Date, 'PPP')}</p>{' '}
									<span className='mx-3 text-neutral-500'>to</span>{' '}
									<p>{format(record.endDateTime as Date, 'PPP')}</p>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<SewingPinIcon />
								<p>{record.location}</p>
							</div>

							<div className='flex items-center gap-3'>
								<Link2Icon />
								<p className='truncate text-pink-500 underline'>{record.url}</p>
							</div>
						</div>

						<div className='flex flex-col gap-3'>
							<p className='font-bold text-grey-600 md:text-lg'>
								What the events about:
							</p>
							<p>{record.description}</p>
						</div>
					</div>
				</div>
			</section>
		</>
	) : (
		<div className='w-80 mx-auto sm:w-96 flex flex-col border border-gray-200 dark:border-gray-600 rounded-2xl p-6 md:p-12'>
			<Image
				className='mx-auto'
				width={72}
				height={72}
				src='/logo.png'
				alt='Helping hands network Logo'
			/>
			<h1 className='my-6 text-center text-2xl'>Event not found</h1>
			<p className='text-center'>
				{
					'The event you are searching is not found! Please check the link again.'
				}
			</p>
			<Link className='mx-auto mt-6' href={'/'}>
				<Button>Go to home</Button>
			</Link>
			<p className='text-xs text-center text-gray-400 my-4'>
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
