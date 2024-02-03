import { Button } from '@/components/ui/button'
import { ENTRIES_PER_PAGE } from '@/lib/constants'
import Link from 'next/link'

const Table = async ({ data, page }: { data: any; page: number }) => {
	return (
		<div className='mx-auto rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-x-auto'>
			<table className='w-full'>
				<thead className='bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'>
					<tr>
						<th className='py-3 px-4 text-left font-medium border-r border-neutral-300 dark:border-neutral-700'>
							Sl no
						</th>
						<th className='py-3 px-4 text-left font-medium'>Volunteer name</th>
						<th className='py-3 px-4 text-left font-medium'>Email</th>
						<th className='py-3 px-4 text-left font-medium text-clip'>
							Motivation
						</th>
						<th className='py-3 px-4 text-left font-medium'></th>
					</tr>
				</thead>
				<tbody className='bg-white dark:bg-neutral-900'>
					{data.map((row: any, idx: number) => (
						<tr
							key={idx}
							className='border-b border-neutral-200 dark:border-neutral-800'>
							<td className='p-4 border-r border-neutral-200 dark:border-neutral-800'>
								{(page - 1) * ENTRIES_PER_PAGE + (idx + 1)}
							</td>
							<td className='p-4'>{row.User.name}</td>
							<td className='p-4'>
								<Link
									href={`mailto:${row.User.email}`}
									className='text-sm text-pink-500'>
									{row.User.email}
								</Link>
							</td>
							<td className='p-4'>{row.description}</td>
							<td className='p-4'>
								<Button variant={'secondary'} asChild>
									<Link href={`/user/${row.User.id}`}>View Profile</Link>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
