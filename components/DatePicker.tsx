'use client'

import * as React from 'react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'

type DatePickerProps = {
	value: Date
	onChangeHandler: (value: any) => void
}

export default function DatePicker({
	value,
	onChangeHandler,
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!value && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{value ? format(value, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={value}
					onSelect={onChangeHandler}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
