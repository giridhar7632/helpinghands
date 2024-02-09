'use client'

import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

export default function SearchEvents({ placeholder }: { placeholder: string }) {
	const [searchQuery, setSearchQuery] = useState('')

	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			let newUrl = ''

			if (searchQuery) {
				newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'query',
					value: searchQuery,
				})
			} else {
				newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ['query'],
				})
			}

			router.push(newUrl, { scroll: false })
		}, 300)

		return () => clearTimeout(delayDebounceFn)
	}, [searchQuery, searchParams, router])

	return (
		<Input
			placeholder={placeholder}
			type='text'
			size={48}
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className='mb-6 w-full'
		/>
	)
}
