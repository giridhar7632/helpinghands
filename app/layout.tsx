import './globals.css'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { auth } from '@/lib/auth'
import { SignIn, SignOut } from './buttons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Helping hands network',
	description: 'A network of care and collaboration',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={`min-h-screen max-w-4xl mx-auto flex flex-col items-center px-4 md:px-12 lg:px-0 ${inter.className}`}>
				<div className='hidden md:block w-full'>
					<NavBar />
				</div>
				{children}
				<Footer />
			</body>
		</html>
	)
}

async function NavBar() {
	const session = await auth()

	return (
		<nav className='flex items-center justify-between w-full py-4'>
			<div className='flex items-center gap-4'>
				<h1 className='font-semibold'>Helping hands network</h1>
			</div>
			<Suspense fallback={''}>{session ? <SignOut /> : <SignIn />}</Suspense>
		</nav>
	)
}

function Footer() {
	return (
		<footer className='flex items-center justify-center w-full py-4'>
			💙 Helping hands network | 2023
		</footer>
	)
}
