'use server'

import { auth } from '@/lib/auth'
import { Session } from 'next-auth'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getSession(): Promise<Session> {
	let session = await auth()
	if (!session || !session.user) {
		throw new Error('Unauthorized')
	}

	return session
}

export async function updateProfile(data: any) {
	const session = await getSession()
	if (session) {
		const res = await prisma.user.update({
			where: { id: session.user.id },
			data,
		})

		return res
	}
}

export async function addCategory(category: string) {
	const newCategory = await prisma.category.create({
		data: {
			name: category,
		},
	})
	return newCategory
}

export async function getAllCategories() {
	const categories = await prisma.category.findMany()
	return categories
}

export async function createEvent(event: any) {
	if (!event.organizerId) {
		throw new Error('Organizer is required')
	}
	const newEvent = await prisma.events.create({
		data: event,
	})
	console.log({ newEvent })
	return newEvent
}

// export async function seedEvents() {
// 	console.log('Seeding events')
// 	try {
// 		await prisma.events.createMany({
// 			data: data.events,
// 			skipDuplicates: true,
// 		})
// 		console.log('seeded events')
// 	} catch (error) {
// 		console.error('Error seeding events', error)
// 	}
// }

export async function getAllEventsCount({
	query,
	organizer,
	category,
}: {
	query?: string
	organizer?: string
	category?: number
}) {
	const eventsCnt = await prisma.events.count({
		where: {
			title: {
				contains: query,
				mode: 'insensitive',
			},
			categoryId: category,
			organizerId: organizer,
		},
	})

	return eventsCnt
}

export async function getAllEvents({
	query,
	organizer,
	limit,
	category,
	skip,
}: {
	query?: string
	organizer?: string
	limit?: number
	category?: number
	skip?: number
}) {
	const events = await prisma.events.findMany({
		where: {
			title: {
				contains: query,
				mode: 'insensitive',
			},
			categoryId: category,
			organizerId: organizer,
		},
		take: limit,
		skip,
		orderBy: { endDateTime: 'desc' },
		include: {
			category: { select: { id: true, name: true } },
			User: { select: { id: true, name: true } },
		},
	})
	return events
}

export async function updateEvent(eventId: number, event: any) {
	const updatedEvent = await prisma.events.update({
		where: { id: eventId },
		data: event,
	})
	return updatedEvent
}

export async function deleteEvent(eventId: number) {
	const deletedEvent = await prisma.events.delete({
		where: { id: eventId },
	})
	revalidatePath('/dashboard')
	return deletedEvent
}

export async function registerForEvent(
	eventId: number,
	userId: string,
	description: string
) {
	const newRegistration = await prisma.registrations.create({
		data: {
			eventId,
			userId,
			description,
		},
	})
	return newRegistration
}
