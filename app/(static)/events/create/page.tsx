import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import EventForm from '@/components/EventForm'

export default async function CreateEvent() {
	const session = await auth()
	if (!session?.user) redirect('/auth/login')
	return (
		<>
			<h1 className='text-3xl mb-12 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
				Create a new event
			</h1>
			<EventForm type='Create' userId={session?.user?.id} />
		</>
	)
}
