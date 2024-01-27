import { IEvent } from '@/types'

type EventFormProps = {
	userId: string
	type: 'Create' | 'Update'
	event?: IEvent
	eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {}
