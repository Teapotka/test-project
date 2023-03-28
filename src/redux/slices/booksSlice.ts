import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit'
import axios from '../../axios'
import {AppDispatch, RootState} from "../store";
import exp from "constants";

export const fetchBooksByName = createAsyncThunk(
    'books/fetchBooksByName',
    async ({search, categories, sortingBy}: {search: string, categories: string, sortingBy: string}) => {
        console.log('here')
        const searchString = search.toLocaleLowerCase().split(' ').filter(i=>i!=='').join('+')
        const {data} = await axios.get(`/volumes?q=${searchString}${categories === 'all' ? "" : `+subject:${categories}`}&orderBy=${sortingBy}`)
        return {data, filters: {searchString, categories, sortingBy}}
    }
)
export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id:string) =>{
        const {data} = await axios.get(`/volumes/${id}`)
        return data
    }
)

export const loadMoreBooks = createAsyncThunk(
    'books/loadMoreBooks',
    async (arg: number, {getState}) => {
        const {filters:{searchString, categories, sortingBy}, items} = (getState() as any).book.books
        console.log(searchString)
        const {data} = await axios.get(`/volumes?q=${searchString}${categories === 'all' ? "" : `+subject:${categories}`}&orderBy=${sortingBy}&startIndex=${items.length}`)
        return {data, filters:{searchString, categories, sortingBy}};
    }
)
const initialState = {
    books: {
        kind: "",
        totalItems: null,
        items: [],
        filters:{
            searchString: null,
            categories: null,
            sortingBy: null,
        },
    },
    book: {
        title: "",
        authors: [],
        categories: [],
        url: "",
        status: "init"
    },
    status: 'init',
}
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBooksByName.pending.toString()]: (state) => {
            state.books = {
                kind: "",
                totalItems: null,
                items: [],
                filters: {
                    searchString: null,
                    categories: null,
                    sortingBy: null,
                }
            }
            state.status = 'loading'
        },
        [fetchBooksByName.fulfilled.toString()]: (state, action) => {
            console.log(action.payload)
            const {data:{kind,items, totalItems}, filters: {categories, searchString, sortingBy}} = action.payload
            state.books = {
                kind,
                items,
                totalItems,
                filters:{
                    categories,
                    searchString,
                    sortingBy
                }
            }
            state.status = 'loaded'
        },
        [fetchBooksByName.rejected.toString()]: (state) => {
            state.books = {
                kind: "",
                totalItems: null,
                items: [],
                filters: {
                    searchString: null,
                    categories: null,
                    sortingBy: null,
                }
            }
            state.status = 'rejected'
        },
        [fetchBookById.pending.toString()]: (state) => {
            console.log('STATE',state)
            state.book = {
                title: "",
                authors: [],
                categories: [],
                url: "",
                status: "loading"
            }
            // state.status = 'loading'
        },
        [fetchBookById.fulfilled.toString()]: (state, action) => {
            console.log("ACT",action.payload)
            const {title = 'No title', categories = 'Other', authors = 'Anonymous', imageLinks} = action.payload.volumeInfo
            console.log(title, categories, authors, imageLinks)
            state.book = {
                title,
                categories,
                authors,
                url: imageLinks == undefined ? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' : imageLinks.thumbnail,
                status: 'loaded'
            }
            // state.status = 'loaded'
        },
        [fetchBookById.rejected.toString()]: (state) => {
            state.book = {
                title: "",
                authors: [],
                categories: [],
                url: "",
                status: "rejected"
            }
            // state.status = 'rejected'

        },
        [loadMoreBooks.pending.toString()]: (state) => {
            console.log('p')
        },
        [loadMoreBooks.fulfilled.toString()]: (state, action) => {
            console.log('f', action.payload)
            // state.books.items.concat(action.payload.data.items)
            state.books.items = state.books.items.concat(action.payload.data.items)
        },
        [loadMoreBooks.rejected.toString()]: (state) => {
            console.log('r')
        },
    }
})

export default booksSlice.reducer as Reducer<typeof initialState>