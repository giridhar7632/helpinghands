import Image from 'next/image'
import Link from 'next/link'

import prisma from '@/lib/db'
import { Button } from '@/components/ui/button'
import EventForm from '@/components/EventForm'
import { IEvent } from '@/types'

export async function generateStaticParams() {
	const events = await prisma.events.findMany()

	return events.map((event) => ({
		slug: event.slug,
	}))
}

export default async function UpdateEvent({
	params,
}: {
	params: { slug: string }
}) {
	const record = await prisma.events.findUnique({
		where: { slug: params.slug },
	})
	return record ? (
		<>
			<h1 className='text-3xl font-bold md:text-5xl/none mb-12'>
				Update event{' '}
				<span className='text-lg font-normal italic text-neutral-500'>
					({record?.title})
				</span>
			</h1>
			<EventForm
				userId={record.organizerId as string}
				eventId={record.id}
				type='Update'
				event={record as IEvent}
			/>
			<div className='h-1 my-6 border border-gray-200 dark:border-gray-600'></div>
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
