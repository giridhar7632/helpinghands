'use client'

import { startTransition, useEffect, useState } from 'react'
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
import { addCategory, getAllCategories } from '@/app/actions'
import toast from 'react-hot-toast'
import { PlusIcon } from '@radix-ui/react-icons'

type CategoryDropdownProps = {
	value?: string | number
	onChangeHandler?: (value: string) => void
}

export default function CategoryDropdown({
	value,
	onChangeHandler,
}: CategoryDropdownProps) {
	const [newCategory, setNewCategory] = useState<string>('')
	const [categories, setCategories] = useState<ICategory[]>([])

	useEffect(() => {
		const getCategories = async () => {
			try {
				const categoryList = await getAllCategories()
				categoryList && setCategories(categoryList as ICategory[])
			} catch (error) {
				console.error(error)
				toast.error('Something went wrong while fetching categories! 😕')
			}
		}

		getCategories()
	}, [])

	const handleAddCategory = async () => {
		try {
			const category = await addCategory(newCategory)
			setCategories((prev) => [...prev, category as ICategory])
			toast.success('Category created! 🎉')
		} catch (error) {
			console.error(error)
			toast.error('Something went wrong while adding the category! 😕')
		}
	}

	return (
		<Select defaultValue={value?.toString()} onValueChange={onChangeHandler}>
			<SelectTrigger>
				<SelectValue placeholder='Select a category' />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
					<SelectItem key={category.id} value={category.id.toString()}>
						{category.name}
					</SelectItem>
				))}
				<AlertDialog>
					<AlertDialogTrigger className='relative flex gap-2 w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
						<PlusIcon className='w-4 h-4' />
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
									value={newCategory}
									onChange={(e) => setNewCategory(e.target.value)}
								/>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() =>
									startTransition(() => {
										handleAddCategory()
									})
								}>
								Add
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SelectContent>
		</Select>
	)
}
