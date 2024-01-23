import NextAuth, { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Email, { EmailConfig } from 'next-auth/providers/email'
import { sendVerificationRequest } from './sendVerificationRequest'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const authOptions: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub,
		Google,
		Email({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: +(process.env.EMAIL_SERVER_PORT as string),
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
			sendVerificationRequest,
		}) as EmailConfig & { options: Record<string, unknown> },
	],
	pages: {
		signIn: '/auth/login',
		verifyRequest: '/auth/verify-request',
		error: '/auth/error',
	},
	callbacks: {
		async session({ session, user }) {
			return {
				...session,
				user: {
					...session.user,
					id: user.id,
				},
			}
		},
	},
}

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth(authOptions)
