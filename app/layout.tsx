import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { auth } from '@/lib/auth'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL('https://helpinghands-delta.vercel.app'),
	title: {
		default: 'Helping hands network | A network of care and collaboration',
		template: '%s | Helping hands network',
	},
	description: 'A network of care and collaboration.',
	openGraph: {
		title: 'Helping hands network',
		description: 'A network of care and collaboration.',
		url: 'https://helpinghands-delta.vercel.app',
		siteName: 'Helping hands network',
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: 'Helping hands network | a network of care and collaboration',
		card: 'summary_large_image',
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()

	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={`${inter.className} dark:bg-gray-900`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange>
						{children}
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	)
}
