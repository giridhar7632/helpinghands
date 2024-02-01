import Image from 'next/image'
import Link from 'next/link'

import prisma from '@/lib/db'

export async function generateStaticParams() {
	const users = await prisma.user.findMany()

	return users.map((user) => ({
		slug: user.id,
	}))
}

export default async function Profile({
	params,
}: {
	params: { slug: string }
}) {
	const user = await prisma.user.findUnique({
		where: { id: params.slug },
	})

	return (
		<div className='w-92 sm:w-96 flex flex-col border items-center mx-auto rounded-2xl p-6 md:p-12'>
			{user ? (
				<>
					<Image
						width={144}
						height={144}
						className='rounded-full border-2 border-gray-200 object-cover'
						src={user?.image || 'https://api.multiavatar.com/v.png'}
						alt='upload image'
					/>
					<h1 className='my-4 text-center'>{user?.name}</h1>
					<Link
						href={`mailto:${user?.email}`}
						className='text-center underline underline-offset-4 text-gray-500'>
						{user?.email}
					</Link>
				</>
			) : (
				<p>User not found!</p>
			)}
		</div>
	)
}
