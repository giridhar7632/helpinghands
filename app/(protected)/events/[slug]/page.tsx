import Image from 'next/image'
import Link from 'next/link'

import prisma from '@/lib/db'
import { Button } from '@/components/ui/button'

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
			User: { select: { id: true, name: true } },
		},
	})
	console.log({ record })
	return record ? (
		<div className='p-12 w-full border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm'>
			<h1 className='text-3xl md:text-4xl font-bold mb-2'>{record?.title}</h1>
			<p className='text-sm text-gray-5s00'>{record?.description}</p>
			<div className='h-1 my-6 border border-gray-200 dark:border-gray-600'></div>
		</div>
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
				<Button variant='secondary'>Go to home</Button>
			</Link>
			<p className='text-xs text-center text-gray-400 my-4'>
				If this is not what expected, let us know{' '}
				<Link
					className='underline underline-offset-4 text-blue-500'
					href='/form/contact-us'>
					here.
				</Link>
			</p>
		</div>
	)
}
