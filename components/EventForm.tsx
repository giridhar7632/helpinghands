'use client'

import { IEvent } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { eventFormSchema } from '@/lib/validators'
import CategoryDropdown from './CategoryDropdown'
import { Textarea } from './ui/textarea'
import FileUploader from './FileUploader'
import { useState } from 'react'
import DatePicker from './DatePicker'
import toast from 'react-hot-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { createEvent } from '@/app/actions'
import { generateSlug } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type EventFormProps = {
	userId?: string
	type: 'Create' | 'Update'
	event?: IEvent
	eventId?: number
}

export default function EventForm({
	userId,
	type,
	event,
	eventId,
}: EventFormProps) {
	const [files, setFiles] = useState<File[]>([])
	const router = useRouter()
	const initialValues =
		event && type === 'Update'
			? event
			: {
					title: '',
					description: '',
					categoryId: 0,
					location: '',
					startDateTime: new Date(),
					endDateTime: new Date(),
					url: '',
					imageUrl: '',
			  }
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	})
	const { startUpload } = useUploadThing('imageUploader')

	async function onSubmit(values: z.infer<typeof eventFormSchema>) {
		console.log(values)
		try {
			let uploadedImageUrl = values.imageUrl
			if (files.length > 0) {
				const uploadedImages = await startUpload(files)

				if (!uploadedImages) {
					return
				}

				uploadedImageUrl = uploadedImages[0].url
			}

			if (type === 'Create') {
				const newEvent = await createEvent({
					...values,
					imageUrl: uploadedImageUrl,
					categoryId: Number(values.categoryId),
					organizerId: userId,
					slug: generateSlug(userId as string, values.title),
				})

				if (newEvent.slug) {
					toast.success('Event created! 🎉')
					router.push(`/events/${newEvent.slug}`)
				}
			}
		} catch (error) {
			console.error(error)
			toast.error('Something went wrong \n while adding the event! 😕')
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5 px-2'>
				<div className='flex flex-col md:flex-row gap-4 w-full'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Event name</FormLabel>
								<FormControl>
									<Input placeholder='Come together' {...field} />
								</FormControl>
								<FormDescription>
									This is your events public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='categoryId'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<CategoryDropdown
										value={field.value}
										onChangeHandler={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex flex-col md:flex-row gap-4 w-full'>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Description</FormLabel>
								<FormControl className='h-48'>
									<Textarea
										placeholder='A short description about the event...'
										{...field}
										className='textarea rounded-xl'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Image</FormLabel>
								<FormControl className='h-48'>
									<FileUploader
										onChangeHandler={field.onChange}
										value={field.value}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex flex-col md:flex-row gap-4 w-full'>
					<FormField
						control={form.control}
						name='location'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Input placeholder='Event location or Online' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex flex-col md:flex-row gap-4 w-full'>
					<FormField
						control={form.control}
						name='startDateTime'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Start date</FormLabel>
								<FormControl>
									<DatePicker
										value={field.value}
										onChangeHandler={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='endDateTime'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>End date</FormLabel>
								<FormControl>
									<DatePicker
										value={field.value}
										onChangeHandler={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex flex-col md:flex-row gap-4 w-full'>
					<FormField
						control={form.control}
						name='url'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Input
										type='url'
										placeholder='Link to your events website or socials'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					size={'lg'}
					disabled={form.formState.isSubmitting}
					type='submit'>
					{form.formState.isSubmitting
						? `${type.slice(0, -1)}ing event...`
						: `${type} event`}
				</Button>
			</form>
		</Form>
	)
}
