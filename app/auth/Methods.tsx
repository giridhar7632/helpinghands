'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { signIn, signOut } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Provider from '@/components/Providers'

export const SignOut: React.FC = () => (
	<Button variant={'secondary'} onClick={() => signOut({ callbackUrl: '/' })}>
		Sign out
	</Button>
)

export const EmailLogin = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') as string
	const formRef = useRef<HTMLFormElement>(null)
	const { pending } = useFormStatus()
	return (
		<form
			ref={formRef}
			action={async (formData) => {
				await signIn('nodemailer', {
					email: formData.get('email'),
					callbackUrl: callbackUrl || `/dashboard`,
				})
				formRef.current?.reset()
			}}
			className='flex flex-col gap-2'>
			<Input
				name={'email'}
				type={'email'}
				placeholder={'Email'}
				disabled={pending}
			/>
			<Button type='submit' disabled={pending}>
				Continue with Email
			</Button>
		</form>
	)
}

type SocialLoginProps = {
	type: 'Google' | 'GitHub'
}

export const SocialLogin = ({ type }: SocialLoginProps) => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') as string
	return (
		<Button
			className='flex-1'
			variant='outline'
			onClick={() => {
				signIn(type.toLowerCase(), {
					callbackUrl: callbackUrl || `/dashboard`,
				})
			}}>
			<Provider id={type} /> {type}
		</Button>
	)
}
