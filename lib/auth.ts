import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authOptions = {
	secret: process.env.AUTH_SECRET,
	providers: [
		GitHub({
			clientId: process.env.GITHUB_CLIENT_KEY as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
} satisfies NextAuthOptions

export function auth(
	...args:
		| [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions)
}
