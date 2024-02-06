import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

type EventsPaginationProps = {
	totalPages: number
	currPage: number
}

export function EventsPagination({
	totalPages,
	currPage,
}: EventsPaginationProps) {
	const renderPageNumbers = () => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(number) => (
					<PaginationItem key={number}>
						<PaginationLink
							href={`/explore?page=${number}`}
							isActive={number === currPage}>
							{number}
						</PaginationLink>
					</PaginationItem>
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
							href={`/explore?page=${1}`}
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
							href={`/explore?page=${i}`}
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
							href={`/explore?page=${totalPages}`}
							isActive={currPage === totalPages}>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)
			}

			return pages
		}
	}
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`/explore?page=${currPage - 1}`}
						disabled={currPage === 1}
					/>
				</PaginationItem>

				{renderPageNumbers()}

				<PaginationItem>
					<PaginationNext
						href={`/explore?page=${currPage + 1}`}
						disabled={totalPages === currPage}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
