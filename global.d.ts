declare global {
    type TFormFields = {
        search: string,
        categories: "all" | "art" | "biography" | "computers" | "history" | "medical" | "poetry",
        sortingBy: "relevance" | "newest",
    }
    type TRawBook = {
        title?: string,
        authors?: string[],
        categories?: string[],
        imageLinks?: {
            thumbnail?: string
        },
        description?: string
    }
    type TRawBookVolumeInfo = {
        volumeInfo: TRawBook
    }
    type TRawBooks = {
        kind: string,
        totalItems: number,
        items?: {
            id: string
            volumeInfo: TRawBook
        }[]
    }
    type TStatus = "init" | "loading" | "loaded" | "rejected"
    type TCategories = "all" | "art" | "biography" | "computers" | "history" | "medical" | "poetry"
    type TSortingBy = "relevance" | "newest"
    type TFilters = {
        searchString: string
        categories: TCategories
        sortingBy: TSortingBy
    }
    type TFilter = {
        filters: TFilters
    }
    type TBook = {
        title: string,
        authors: string[],
        categories: string[],
        url: string,
        description: string,
        status: TStatus
    }
    type TBooks = {
        kind: string,
        totalItems: number,
        items?: {
            title?: string,
            authors?: string[],
            categories?: string[],
            url?: string,
            id: string
        }[] | [],
        status: TStatus
    }
    type TInitialState = {
        books: TBooks & TFilter
        book: TBook
    }
    type TBooksPayload = {
        payload: {
            data: TRawBooks,
            filters: TFilters
        }
    }
    type TBookPayload = {
        payload: {
            data: TRawBookVolumeInfo
        }
    }
    type TCardParams = {
        id: string
        title: string
        authors: string[]
        categories: string[]
        url: string
    }
}
export {}
