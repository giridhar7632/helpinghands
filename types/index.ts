export interface IEvent {
	id: string
	title: string
	description?: string
	location?: string
	createdAt: Date
	imageUrl: string
	startDateTime: Date
	endDateTime: Date
	url?: string
	category: { id: string; name: string }
	organizer: { id: string; Name: string }
}

export interface ICategory {
	id: number
	name: string
}
