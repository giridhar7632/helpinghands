import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import EventForm from '@/components/EventForm'

export default async function CreateEvent() {
	const session = await auth()
	if (!session?.user) redirect('/auth/login')
	return (
		<>
			<h1 className='text-3xl font-bold md:text-5xl/none mb-12'>
				Create a new event
			</h1>
			<EventForm type='Create' userId={session?.user?.id} />
		</>
	)
}
