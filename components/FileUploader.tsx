'use client'

import { useState } from 'react'

type FileUploaderProps = {
	value?: string
	onChangeHandler?: (value: string) => void
}

export default function FileUploader({
	value,
	onChangeHandler,
}: FileUploaderProps) {
	const [imageUrl, setImageUrl] = useState<string>(value || '')
	return <></>
}
