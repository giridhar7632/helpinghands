import { Skeleton } from '@/components/ui/skeleton'

export default function EventCardSkeleton() {
	return (
		<div className='rounded-xl border bg-card shadow relative flex min-h-[380px] w-full max-w-[400px] flex-col md:min-h-[438px] overflow-hidden'>
			<Skeleton className='h-[250px] w-full rounded-0' />
			<div className='flex flex-col p-4 gap-3 mb-4'>
				<Skeleton className='h-4 w-full my-2' />
				<Skeleton className='h-4 w-[150px]' />
				<Skeleton className='h-4 w-[50px]' />
			</div>
		</div>
	)
}
