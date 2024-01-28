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

type EventFormProps = {
	userId?: string
	type: 'Create' | 'Update'
	event?: IEvent
	eventId?: string
}

export default function EventForm({
	userId,
	type,
	event,
	eventId,
}: EventFormProps) {
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: {
			title: '',
		},
	})

	function onSubmit(values: z.infer<typeof eventFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
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
							<FormItem>
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

				<div className='flex flex-col md:flex-row md:gap-4 w-full'>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormControl className='h-72'>
									<Textarea
										placeholder='A short description about the event...'
										{...field}
										className='textarea rounded-2xl'
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
							<FormItem className='w-full'>
								<FormControl className='h-72'>
									<FileUploader
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Input
					type='textarea'
					placeholder='A short description about the event...'
					name='description'
				/>
				<Button type='submit'>Create new event</Button>
			</form>
		</Form>
	)
}
