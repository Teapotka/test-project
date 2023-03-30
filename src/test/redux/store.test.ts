import {store} from '../../redux/store'
import axios from 'axios'

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
            interceptors: {
                request: {use: jest.fn(), eject: jest.fn()},
                response: {use: jest.fn(), eject: jest.fn()}
            }
        }))
    }
})

describe('Redux store', () => {
    it('Should have all fields', () => {
        const state = store.getState()
        expect(state.hasOwnProperty('book')).toBeTruthy()
        expect(state.book.hasOwnProperty('book')).toBeTruthy()
        expect(state.book.hasOwnProperty('books')).toBeTruthy()

        const booksFields = ['kind', 'totalItems', 'items', 'filters', 'status']
        const booksFiltersFields = ['searchString', 'categories', 'sortingBy']

        expect(Object.keys(state.book.books)).toEqual(booksFields)
        expect(Object.keys(state.book.books.filters)).toEqual(booksFiltersFields)

        const bookFields = ['title', 'authors', 'categories', 'url', 'description', 'status']
        expect(Object.keys(state.book.book)).toEqual(bookFields)
    })
})