import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export function generateSlug(s: string, name: string): string {
	const hash = crypto
		.createHash('md5')
		.update(s + Date.now())
		.digest('hex')

	const slug = name
		.toLowerCase()
		.replace(/[^a-z0-9\-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '')

	return hash.substring(0, 5) + '-' + slug
}
