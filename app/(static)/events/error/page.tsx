import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function ErrorPage() {
	return (
		<div className='w-80 sm:w-96 mx-auto flex flex-col bg-white border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-600 rounded-2xl p-6 md:p-12'>
			<Image
				className='mx-auto'
				width={72}
				height={72}
				src='/formulate.svg'
				alt='FormUlate Logo'
			/>
			<h1 className='my-6 text-center text-2xl'>Caught you!</h1>
			<p className='text-center'>You are not authorized to view this page.</p>
			<Link className='mx-auto mt-6' href={'/app'}>
				<Button variant='secondary'>Go to dashboard</Button>
			</Link>
			<p className='text-xs text-center text-neutral-400 my-4'>
				If this is not what expected, let us know{' '}
				<Link
					className='underline underline-offset-4 text-pink-500'
					href='/form/contact-us'>
					here.
				</Link>{' '}
			</p>
		</div>
	)
}
