import {
    Pagination,
    usePagination,
    PaginationNext,
    PaginationPage,
    PaginationPrevious,
    PaginationContainer,
    PaginationPageGroup,
} from "@ajna/pagination";
import {postRequest} from "../api";

export default function Page({hits, setData, query}) {
    const {
        currentPage,
        setCurrentPage,
        pagesCount,
        pages
    } = usePagination({
        pagesCount: hits % 10 + 1,
        initialState: {currentPage: 1},
    });

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        const result = await postRequest(query, page-1);
        setData(result.data);
    };

    return (
        <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        >
            <PaginationContainer>
                <PaginationPrevious>පෙර</PaginationPrevious>
                <PaginationPageGroup>
                    {pages.map(page => (
                        <PaginationPage
                            key={`pagination_page_${page}`}
                            page={page}
                        />
                    ))}
                </PaginationPageGroup>
                <PaginationNext>පසු</PaginationNext>
            </PaginationContainer>
        </Pagination>
    );
}