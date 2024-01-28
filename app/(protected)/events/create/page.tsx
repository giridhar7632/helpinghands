import EventForm from '@/components/EventForm'
import { auth } from '@/lib/auth'

export default async function CreateEvent() {
	const session = await auth()
	return (
		<>
			<h1 className='text-3xl font-bold md:text-5xl/none mb-4'>
				Create a new event
			</h1>
			<EventForm type='Create' userId={session?.user?.id} />
		</>
	)
}
