import Link from 'next/link'

import prisma from '@/lib/db'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

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
					<Avatar className='h-36 w-36'>
						<AvatarImage src={user?.image || ''} alt={user?.name || ''} />
						<AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
					</Avatar>
					<h1 className='mt-4 mb-2 text-center'>{user?.name}</h1>
					<p className='mb-4 text-center'>{user?.bio}</p>
					<Link
						href={`mailto:${user?.email}`}
						className='text-center underline underline-offset-4 text-neutral-500'>
						{user?.email}
					</Link>
				</>
			) : (
				<p>User not found!</p>
			)}
		</div>
	)
}
