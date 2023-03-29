import {Action, createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit'
import axios from '../../axios'
import {AppDispatch, RootState} from "../store";
import {StringProcessing} from "../../utils/StringProcessing";
//
export const fetchBooksByName = createAsyncThunk(
    'books/fetchBooksByName',
    async ({search, categories, sortingBy}: TFormFields) => {
        try {
            const searchString = StringProcessing.toSearchString(search)
            const {data} = await axios.get<TRawBooks>(StringProcessing.toNameSearchURL(searchString, categories, sortingBy))
            console.log("ATH_BY_NAME",data)
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
            const {data} = await axios.get<TRawBookVolumeInfo>(StringProcessing.toIdSearchURL(id))
            console.log('by ID', {data})
            return {data}
        }
        catch (e) {
            throw Error('Request error')
        }
    }
)

export const loadMoreBooks = createAsyncThunk(
    'books/loadMoreBooks',
    async (_, {getState}) => {
        const {filters:{searchString, categories, sortingBy}, items} = (getState() as any).book.books
        const {data} = await axios.get<TRawBooks>(StringProcessing.toNameSearchURL(searchString, categories, sortingBy, items.length))
        if(!data.items)
            throw Error('Bad request')
        return {data, filters:{searchString, categories, sortingBy}}
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
            console.log('fetchBooksByName.pending',state.books)
        },
        [fetchBooksByName.fulfilled.toString()]: (state, {payload}: TBooksPayload) => {
            const {
                data:{
                    kind, items, totalItems
                },
                filters: {
                    categories, searchString, sortingBy
                }
            } = payload

            state.books = {
                kind,
                items: StringProcessing.filterRawBooks({items}),
                totalItems,
                filters:{
                    categories,
                    searchString,
                    sortingBy
                },
                status: 'loaded'
            }
            console.log("fetchBooksByName.fulfilled",state.books)
        },
        [fetchBooksByName.rejected.toString()]: (state) => {
            state.books = {...initialState.books, status: "rejected"}
            console.log('fetchBooksByName.rejected', state.books)
        },

        //fetchBookById
        [fetchBookById.pending.toString()]: (state) => {
            state.book = {...initialState.book, status: "loading"}
            console.log('fetchBookById.pending',state.book)
        },
        [fetchBookById.fulfilled.toString()]: (state, {payload}: TBookPayload) => {
            //TODO item check
            console.log("ITEM", payload.data)
            state.book = {...StringProcessing.filterRawBook(payload.data.volumeInfo), status: 'loaded'}
            console.log('fetchBookById.fulfilled', state.book)
        },
        [fetchBookById.rejected.toString()]: (state) => {
            state.book = {...initialState.book, status: "rejected"}
        },

        //loadMoreBooks
        [loadMoreBooks.pending.toString()]: (state) => {
            state.books.status = 'loading'
            console.log("loadMoreBooks.pending", state.books)
        },
        [loadMoreBooks.fulfilled.toString()]: (state, {payload}) => {
            if(state.books.items && state.books.items.length){
                const oldItems = state.books.items
                const newItems = StringProcessing.filterRawBooks(payload.data)
                state.books = {...state.books, items: [...oldItems, ...newItems], status: 'loaded'}
                console.log("loadMoreBooks.fulfilled", state.books)
            }
        },
        [loadMoreBooks.rejected.toString()]: (state) => {
            state.books.status = 'rejected'
        },
    }
})
//
export default booksSlice.reducer as Reducer<typeof initialState>