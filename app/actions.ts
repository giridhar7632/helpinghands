'use server'

import { auth } from '@/lib/auth'
import { Session } from 'next-auth'
import prisma from '@/lib/db'

export async function getSession(): Promise<Session> {
	let session = await auth()
	if (!session || !session.user) {
		throw new Error('Unauthorized')
	}

	return session
}

export async function updateProfile(formData: FormData) {
	const session = await getSession()
	if (session) {
		const res = await prisma.user.update({
			where: { id: session.user.id },
			data: { name: formData.get('name') as string },
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
