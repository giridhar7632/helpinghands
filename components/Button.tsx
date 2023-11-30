import clsx from 'clsx'
import React from 'react'

export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'text' | 'dark' | 'danger'
	loading?: boolean
	loadingText?: string
	className?: string
	children?: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
}

export interface IconButtonProps {
	children?: React.ReactNode
}

export default function Button({
	variant = 'primary',
	loading = false,
	loadingText = 'Loading...',
	className,
	children,
	...attributes
}: ButtonProps) {
	const variantClassname = clsx({
		['bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-500 disabled:ring-0']:
			variant === 'primary',
		['bg-blue-100 ring-0 text-blue-500 hover:text-blue-600 disabled:bg-blue-100 disabled:ring-0']:
			variant === 'secondary',
		['text-blue-500 hover:text-blue-600 hover:ring-0 disabled:text-blue-300 bg-white bg-opacity-10 backdrop-blur-sm']:
			variant === 'text',
		['bg-neutral-800 hover:ring-neutral-600 hover:bg-neutral-900 text-neutral-50 disabled:bg-neutral-500 disabled:ring-0']:
			variant === 'dark',
	})

	return (
		<button
			{...attributes}
			className={clsx(
				variantClassname,
				'h-lg flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold leading-snug ring-blue-200 transition duration-150 ease-in-out hover:ring focus:ring',
				className
			)}
			disabled={attributes.disabled || loading}
			onClick={attributes.onClick}>
			{loading ? loadingText : children}
		</button>
	)
}

export function IconButton({ children, ...props }: IconButtonProps) {
	return (
		<button
			className='flex items-center justify-center rounded-full bg-blue-100 p-2 text-blue-500 ring-0 hover:text-blue-600 hover:ring hover:ring-blue-200 disabled:bg-blue-100 disabled:ring-0'
			{...props}>
			{children}
		</button>
	)
}
