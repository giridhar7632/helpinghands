'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'

export default function Form() {
	const formRef = useRef<HTMLFormElement>(null)
	const { pending } = useFormStatus()

	return (
		<form
			style={{ opacity: !pending ? 1 : 0.7 }}
			className='relative flex flex-col gap-4 w-full'
			ref={formRef}
			action={async (formData) => {
				console.log(formData)
				formRef.current?.reset()
			}}>
			<div className='flex flex-col md:flex-row md:gap-4 w-full'>
				<Input
					aria-label='Event name'
					disabled={pending}
					name='name'
					type='text'
					required
				/>
				<Input
					aria-label='No of volunteers'
					disabled={pending}
					name='volunteers'
					type='number'
					required
				/>
			</div>
			<div className='flex flex-col md:flex-row md:gap-4 w-full'>
				<Input
					aria-label='Start date'
					disabled={pending}
					name='start'
					type='date'
					required
				/>
				<Input
					aria-label='End date'
					disabled={pending}
					name='end'
					type='date'
					required
				/>
			</div>
			<Input type='textarea' name='description' />
			<Button type='submit' disabled={pending}>
				Create new event
			</Button>
		</form>
	)
}
