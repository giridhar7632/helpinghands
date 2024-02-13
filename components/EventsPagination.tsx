'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { formUrlQuery } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type EventsPaginationProps = {
	totalPages: number
	currPage: number
	urlParamName?: string
}

export function EventsPagination({
	totalPages,
	currPage,
	urlParamName,
}: EventsPaginationProps) {
	const [pagesNumbers, setPagesNumbers] = useState<React.ReactNode>([])
	const searchParams = useSearchParams()
	useEffect(() => {
		renderPageNumbers()
	}, [searchParams, currPage, totalPages])

	const renderPageNumbers = () => {
		if (totalPages <= 5) {
			setPagesNumbers(
				Array.from({ length: totalPages }, (_, index) => index + 1).map(
					(number) => (
						<PaginationItem key={number}>
							<PaginationLink
								href={formUrlQuery({
									params: searchParams.toString(),
									key: urlParamName || 'page',
									value: `${number}`,
								})}
								isActive={number === currPage}>
								{number}
							</PaginationLink>
						</PaginationItem>
					)
				)
			)
		} else {
			const startPage = Math.max(1, currPage - 1)
			const endPage = Math.min(totalPages, currPage + 1)

			const pages = []
			if (startPage > 1) {
				pages.push(
					<PaginationItem key={1}>
						<PaginationLink
							href={formUrlQuery({
								params: searchParams.toString(),
								key: urlParamName || 'page',
								value: '1',
							})}
							isActive={currPage === 1}>
							{1}
						</PaginationLink>
					</PaginationItem>
				)
				pages.push(
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)
			}

			for (let i = startPage; i <= endPage; i++) {
				pages.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={formUrlQuery({
								params: searchParams.toString(),
								key: urlParamName || 'page',
								value: `${i}`,
							})}
							isActive={i === currPage}>
							{i}
						</PaginationLink>
					</PaginationItem>
				)
			}

			if (endPage < totalPages && endPage !== totalPages - 1) {
				pages.push(
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)
			}

			if (endPage !== totalPages) {
				pages.push(
					<PaginationItem key={totalPages}>
						<PaginationLink
							href={formUrlQuery({
								params: searchParams.toString(),
								key: urlParamName || 'page',
								value: `${totalPages}`,
							})}
							isActive={currPage === totalPages}>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)
			}

			setPagesNumbers(pages)
		}
	}
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={formUrlQuery({
							params: searchParams.toString(),
							key: urlParamName || 'page',
							value: `${currPage - 1}`,
						})}
						disabled={currPage === 1}
					/>
				</PaginationItem>

				{pagesNumbers}

				<PaginationItem>
					<PaginationNext
						href={formUrlQuery({
							params: searchParams.toString(),
							key: urlParamName || 'page',
							value: `${currPage + 1}`,
						})}
						disabled={totalPages === currPage}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
