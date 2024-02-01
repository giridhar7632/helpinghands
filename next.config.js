/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'source.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'api.multiavatar.com',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'us-east-1.storage.xata.sh',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
		],
	},
	experimental: {
		serverActions: {
			allowedOrigins: [
				'Giridhar-s-workspace-bc9633.us-east-1.xata.sh',
				'verbose-barnacle-75wrq9676r43xr6j-3000.app.github.dev',
			],
		},
	},
}

module.exports = nextConfig
