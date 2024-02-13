import { type ClassValue, clsx } from 'clsx'
import { differenceInDays, format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import crypto from 'crypto'
import qs from 'query-string'

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
	const initials = words.map((word) => word[0]?.toUpperCase()).join('')
	return initials
}

export function getNonEmptyEntries(formData: FormData) {
	const nonEmptyEntries: Record<string, string> = {}

	for (const [key, value] of formData.entries()) {
		if (typeof value === 'string' && value.trim()) {
			// Check for non-empty strings
			nonEmptyEntries[key] = value
		}
	}

	return nonEmptyEntries
}

export function formUrlQuery({
	params,
	key,
	value,
}: {
	params: string
	key: string
	value: string | null
}) {
	const currentUrl = qs.parse(params)

	currentUrl[key] = value

	return qs.stringifyUrl(
		{
			url: window.location.href,
			query: currentUrl,
		},
		{ skipNull: true }
	)
}

export function removeKeysFromQuery({
	params,
	keysToRemove,
}: {
	params: string
	keysToRemove: string[]
}) {
	const currentUrl = qs.parse(params)

	keysToRemove.forEach((key) => {
		delete currentUrl[key]
	})

	return qs.stringifyUrl(
		{
			url: window.location.href,
			query: currentUrl,
		},
		{ skipNull: true }
	)
}

export function formatDateRange(startDate: Date, endDate: Date) {
	const daysDifference = differenceInDays(endDate, startDate)

	if (daysDifference === 0) {
		return format(startDate, 'MMMM do, yyyy')
	}

	if (startDate.getFullYear() === endDate.getFullYear()) {
		if (startDate.getMonth() === endDate.getMonth()) {
			return `${format(startDate, 'MMM do')} - ${format(endDate, 'do, yyyy')}`
		} else {
			return `${format(startDate, 'MMM do')} - ${format(
				endDate,
				'MMM do, yyyy'
			)}`
		}
	}

	return `${format(startDate, 'MMM do, yyyy')} - ${format(
		endDate,
		'MMMM do, yyyy'
	)}`
}
