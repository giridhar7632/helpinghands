import Collection from '@/components/Collection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import prisma from '@/lib/db'
import { auth } from '@/lib/auth'

export default async function dashboard() {
	const session = await auth()
	const data = await prisma.events.findMany({
		where: { organizerId: session?.user?.id },
	})

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
			<section>
				<section className='my-8 flex flex-col gap-8 md:gap-12'>
					<h2 className='text-2xl md:text-4xl font-bold'>
						Events you organized:
					</h2>
					<Collection
						data={data}
						emptyTitle='No events added yet'
						emptyStateSubtext='Organise one by click the above button! 😇'
						page={1}
						limit={6}
						totalPages={1}
					/>
				</section>
			</section>
		</main>
	)
}
