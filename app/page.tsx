import { ThemeToggle } from '@/components/theme-provider'
import Image from 'next/image'

export default function Home() {
	return (
		<main className='h-full w-full md:relative flex flex-1 py-24 items-center md:items-stretch justify-between'>
			<ThemeToggle />
			<div className='h-full w-full'>
				<h1 className='text-4xl md:text-8xl z-10 font-extrabold shadow-3d'>
					Helping hands network
				</h1>
				<p className='text-xl my-4'>A network of care and collaboration</p>
			</div>

			<Image
				src='/hands.png'
				alt='hero'
				className='p-12 -z-10 mt-24 md:mt-16 md:ml-16'
				layout='fill'
				objectFit='contain'
				objectPosition='center'
			/>
		</main>
	)
}
