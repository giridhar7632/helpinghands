'use client'

import { startTransition, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ICategory } from '@/types'
import { Input } from './ui/input'

type CategoryDropdownProps = {
	value?: string
	onChangeHandler?: (value: string) => void
}

export default function CategoryDropdown({
	value = '',
	onChangeHandler,
}: CategoryDropdownProps) {
	const [newCategory, setNewCategory] = useState<string>('')
	const [categories, setCategories] = useState<ICategory[]>([
		{ id: '1', name: 'Hackathon' },
		{ id: '2', name: 'Non-profit' },
		{ id: '3', name: 'Distribution' },
	])

	const handleAddCategory = () => {
		setCategories((prev) => [
			...prev,
			{ id: prev[prev.length - 1].id + 1, name: newCategory },
		])
	}

	return (
		<Select defaultValue={value} onValueChange={onChangeHandler}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a category' />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
					<SelectItem key={category.id} value={category.id}>
						{category.name}
					</SelectItem>
				))}

				<AlertDialog>
					<AlertDialogTrigger className='relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
						Add new category
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>New category</AlertDialogTitle>
							<AlertDialogDescription>
								<Input
									type='text'
									placeholder='Category name'
									className='input-field mt-3'
									onChange={(e) => setNewCategory(e.target.value)}
								/>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => startTransition(handleAddCategory)}>
								Add
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SelectContent>
		</Select>
	)
}
