import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const toSlug = (s: string) =>
	s
		.toLowerCase()
		.replace(' ', '-')
		.replace(/[^a-z0-9\-]/g, '')
		.replace(/-+/g, '-')

export function generateSlug(s: string, name: string): string {
	const hash = crypto
		.createHash('md5')
		.update(s + Date.now())
		.digest('hex')

	return hash.substring(0, 5) + '-' + toSlug(name)
}

export function getInitials(name: string) {
	const words = name.split(' ')
	const initials = words.map((word) => word[0].toUpperCase()).join('')
	return initials
}
