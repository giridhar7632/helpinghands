import { Suspense } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import Table from './Table'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'

export default async function Data({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { page: string }
}) {
	const session = await auth()
	const event = await prisma.events.findUnique({ where: { slug: params.slug } })
	if (event?.organizerId !== session?.user?.id) {
		redirect(`/events/${params.slug}/error`)
	}

	const data = await prisma.registrations.findMany({
		where: { eventId: event?.id },
		select: {
			description: true,
			User: { select: { id: true, name: true, email: true } },
		},
	})

	return (
		<div className='flex flex-col gap-4'>
			<p>{event?.title}</p>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<h1 className='text-3xl font-bold md:text-5xl/none'>Submissions</h1>
					{/* <span className='inline-block rounded-lg bg-neutral-100 dark:text-neutral-800 px-3 py-1 text-sm'>
						{recordCount}
					</span> */}
				</div>
				{/* <div className='flex items-center gap-2'>
					<ShareButton slug={params.slug} />
					<Export table={params.slug} data={data} />
				</div> */}
			</div>
			<div className='my-6'>
				<Suspense fallback={<LoaderIcon />}>
					{data.length ? (
						<Table data={data} page={1} />
					) : (
						<p className='text-neutral-500'>
							No submissions yet! Share the form with your friends to get
							started.
						</p>
					)}
				</Suspense>
			</div>
			{/* <Pagination
        slug={params.slug}
        currPage={pageNumber}
        totalPages={page.totalNumberOfPages}
      /> */}
		</div>
	)
}
