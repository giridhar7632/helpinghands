'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Button } from './ui/button'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { convertFileToUrl } from '@/lib/utils'
import { UploadIcon } from '@radix-ui/react-icons'

type FileUploaderProps = {
	value: string
	onChangeHandler: (value: string) => void
	setFiles: Dispatch<SetStateAction<File[]>>
}

export default function FileUploader({
	value,
	onChangeHandler,
	setFiles,
}: FileUploaderProps) {
	const onDrop = useCallback((acceptedFiles: any) => {
		setFiles(acceptedFiles)
		onChangeHandler(convertFileToUrl(acceptedFiles[0]))
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
	})

	return (
		<div
			{...getRootProps()}
			className='flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'>
			<input {...getInputProps()} className='cursor-pointer' />

			{value ? (
				<div className='flex h-full w-full flex-1 justify-center'>
					<Image
						src={value}
						alt='image'
						width={250}
						height={250}
						className='w-full object-cover object-center'
					/>
				</div>
			) : (
				<div className='flex items-center h-full justify-center flex-col py-5 text-grey-500 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl border-dashed'>
					<UploadIcon
						width={50}
						height={50}
						className='mb-2 text-neutral-300'
					/>
					<h3 className='mb-2 text-sm text-neutral-500'>
						Drag photo here(SVG, PNG, JPG)
					</h3>
					<Button variant={'outline'} type='button'>
						Select from computer
					</Button>
				</div>
			)}
		</div>
	)
}
