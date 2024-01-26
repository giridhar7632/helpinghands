import { ThemeToggle } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<main className='h-full w-full md:relative flex flex-col max-w-6xl mx-auto'>
			<nav className='flex items-center justify-between px-4 py-2'>
				<Image src='/heart.svg' width={32} height={32} alt='logo' />
				<div className='flex items-center gap-4'>
					<Button asChild>
						<Link href='/auth/login'>Login</Link>
					</Button>
					<ThemeToggle />
				</div>
			</nav>
			<div className='h-full w-full flex-1 py-24'>
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
