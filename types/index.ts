export interface IEvent {
	_id: string
	title: string
	description?: string
	location?: string
	createdAt: Date
	imageUrl: string
	startDateTime: Date
	endDateTime: Date
	price: string
	isFree: boolean
	url?: string
	category: { id: string; name: string }
	organizer: { id: string; Name: string }
}
