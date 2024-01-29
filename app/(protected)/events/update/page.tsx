import EventForm from '@/components/EventForm'
import { auth } from '@/lib/auth'

export default async function UpdateEvent() {
	const session = await auth()
	return (
		<main>
			<h1 className='text-3xl font-bold md:text-5xl/none'>
				Update the new event
			</h1>
			<EventForm type='Update' userId={session?.user?.id} />
		</main>
	)
}
