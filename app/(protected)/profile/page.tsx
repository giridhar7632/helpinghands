import UserForm from '@/components/UserForm'
import { auth } from '@/lib/auth'
import prisma from '@/lib/db'

export default async function ProfilePage() {
	const session = await auth()
	const user = await prisma.user.findUnique({
		where: { id: session?.user?.id },
		select: { id: true, name: true, email: true, image: true, bio: true },
	})

	return (
		<div className='w-full h-full'>
			<div className='w-92 sm:w-96 flex flex-col border items-center rounded-2xl p-6 md:p-12 mx-auto'>
				{user ? (
					<UserForm
						id={user.id}
						image={user.image}
						email={user.email}
						name={user.name}
						bio={user.bio}
					/>
				) : (
					<p className='dark:text-neutral-300'>User not found!</p>
				)}
			</div>
		</div>
	)
}
