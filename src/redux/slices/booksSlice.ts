import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../axios'
import {StringProcessing} from "../../utils/StringProcessing";

export const fetchBooksByName = createAsyncThunk(
    'books/fetchBooksByName',
    async ({search, categories, sortingBy}: TFormFields) => {
        try {
            //converting the raw string
            const searchString = StringProcessing.toSearchString(search)
            //getting new books by name and filters
            const {data} = await axios.get<TRawBooks>(StringProcessing.toNameSearchURL(searchString, categories, sortingBy))
            if(!data.items)
                throw Error('Bad request')
            return {data, filters: {searchString, categories, sortingBy}}
        }
        catch (e) {
            throw Error('Request error')
        }
    }
)
export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id:string) =>{
        try {
            //getting new book by id
            const {data} = await axios.get<TRawBookVolumeInfo>(StringProcessing.toIdSearchURL(id))
            return {data}
        }
        catch (e: any) {
            throw Error('Request error')
        }
    }
)

export const loadMoreBooks = createAsyncThunk(
    'books/loadMoreBooks',
    async (_, {getState}) => {
        try {
            //getting old books and filters
            const {filters: {searchString, categories, sortingBy}, items} = (getState() as any).book.books
            //getting new books by name and filters
            const {data} = await axios.get<TRawBooks>(StringProcessing.toNameSearchURL(searchString, categories, sortingBy, items.length))
            if (!data.items)
                throw Error('Bad request')
            return {data, filters: {searchString, categories, sortingBy}}
        }
        catch (e){
            throw Error('Request error')
        }
    }
)

const initialState: TInitialState = {
    books: {
        kind: "",
        totalItems: 0,
        items: [],
        filters:{
            searchString: "",
            categories: 'all',
            sortingBy: "relevance",
        },
        status: 'init',
    },
    book: {
        title: "",
        authors: [],
        categories: [],
        url: "",
        description: "",
        status: "init"
    },
}
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: {
        //fetchBookByName
        [fetchBooksByName.pending.toString()]: (state) => {
            state.books = {...initialState.books, status: "loading"}
        },
        [fetchBooksByName.fulfilled.toString()]: (state, {payload}: TBooksPayload) => {
            //getting fields from payload
            const {
                data:{
                    kind, items, totalItems
                },
                filters: {
                    categories, searchString, sortingBy
                }
            } = payload
            //setting fields from payload
            state.books = {
                kind,
                //processing raw books
                items: StringProcessing.filterRawBooks({items}),
                totalItems,
                filters:{
                    categories,
                    searchString,
                    sortingBy
                },
                status: 'loaded'
            }
        },
        [fetchBooksByName.rejected.toString()]: (state) => {
            state.books = {...initialState.books, status: "rejected"}
        },

        //fetchBookById
        [fetchBookById.pending.toString()]: (state) => {
            state.book = {...initialState.book, status: "loading"}
        },
        [fetchBookById.fulfilled.toString()]: (state, {payload}: TBookPayload) => {
            //setting new book
            state.book = {...StringProcessing.filterRawBook(payload.data.volumeInfo), status: 'loaded'}
        },
        [fetchBookById.rejected.toString()]: (state) => {
            state.book = {...initialState.book, status: "rejected"}
        },

        //loadMoreBooks
        [loadMoreBooks.pending.toString()]: (state) => {
            state.books.status = 'loading'
        },
        [loadMoreBooks.fulfilled.toString()]: (state, {payload}) => {
            //checking if response is right for processing
            if(state.books.items && state.books.items.length){
                const oldItems = state.books.items
                const newItems = StringProcessing.filterRawBooks(payload.data)
                //concatenation of 2 arrays
                state.books = {...state.books, items: [...oldItems, ...newItems], status: 'loaded'}
            }
        },
        [loadMoreBooks.rejected.toString()]: (state) => {
            state.books.status = 'rejected'
        },
    }
})
//
export default booksSlice.reducer