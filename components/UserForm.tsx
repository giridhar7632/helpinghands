'use client'

import { updateProfile } from '@/app/actions'
import { Pencil1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

type UserFormProps = {
	image?: string | null
	name?: string | null
	email?: string | null
	id?: string | null
}

const UserForm = ({ id, image, name, email }: UserFormProps) => {
	const [loading, setLoading] = useState(false)
	const [previewImage, setPreviewImage] = useState<string | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		if (file) {
			const reader = new FileReader()

			reader.onload = (e) => {
				if (e.target?.result) {
					setPreviewImage(e.target.result as string)
				} else {
					console.error(
						'FileReader onload event triggered, but no result is available'
					)
				}
			}

			reader.onerror = (e) => {
				console.error(
					'FileReader encountered an error while reading the file:',
					reader.error
				)
			}

			reader.readAsDataURL(file)
		}
	}

	return (
		<form
			className='w-full flex flex-col gap-2'
			action={async (formData) => {
				console.log(formData.get('name'))
				setLoading(true)
				try {
					await updateProfile(formData)
					toast.success('Profile updated successfully! 🎊')
				} catch (error) {
					console.log(error)
					toast.error('Something went wrong! 😕')
				}
				setLoading(false)
			}}>
			<div className='relative flex items-center justify-center mx-auto mb-4 h-36 w-36 overflow-hidden cursor-pointer'>
				<Avatar className='h-36 w-36'>
					<AvatarImage src={image || ''} alt={name || ''} />
					<AvatarFallback>{getInitials(name || '')}</AvatarFallback>
				</Avatar>
				<div className='absolute right-0 p-1 bottom-0 mr-2 mb-2 h-8 w-8 border-2 border-white bg-neutral-100 rounded-full text-neutral-500'>
					<Pencil1Icon className='h-5 w-5' />
				</div>
				<input
					type='file'
					name='avatar'
					onChange={handleFileChange}
					className='absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer'
				/>
			</div>
			<Input name='name' type='text' placeholder={name || 'Add your name'} />
			<Input
				name='email'
				type='email'
				placeholder={email || 'email'}
				disabled
			/>

			<Button type='submit' className='w-full my-2' disabled={loading}>
				Update profile
			</Button>

			<p className='text-xs text-center text-neutral-400 my-4'>
				You can see your public profile{' '}
				<Link
					className='underline underline-offset-4 text-pink-500'
					href={`/user/${id}`}>
					here.
				</Link>{' '}
			</p>
		</form>
	)
}

export default UserForm
