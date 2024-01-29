'use server'

import prisma from '@/lib/db'
import { IEvent } from '@/types'

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
