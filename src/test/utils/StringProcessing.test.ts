import {StringProcessing} from "../../utils/StringProcessing";

describe('String Processing', () => {
    test('should return Search URL by ID', () => {
        const id = 'id'
        const searchID = StringProcessing.toIdSearchURL(id)
        expect(searchID).toBe('/volumes/' + id)
    })
    test('should return Search URL by Name', () => {
        const name = StringProcessing.toSearchString('     HaRRy    PoTtEr        ')
        expect(name).toBe('harry+potter')
        const sortingBy = 'relevance'
        const categories = 'art'
        const startId = 30
        const searchName = StringProcessing.toNameSearchURL(name, categories, sortingBy, startId)
        expect(searchName).toBe('/volumes?q=harry+potter+subject:art&orderBy=relevance&startIndex=30')
        console.log(searchName)
    })
    test('should filter Books', () => {
        const allFields:TRawBook ={
            title: 'title',
            categories: ['Art'],
            authors: ['John Doe'],
            imageLinks: {
                thumbnail: 'url'
            },
            description: ''
        }
        const noFields: TRawBook = {}
        const books: TRawBooks = {
            kind: '',
            totalItems: 0,
            items: [
                {id: '', volumeInfo: allFields},
                {id: '', volumeInfo: noFields}
            ]
        }
        const result = StringProcessing.filterRawBooks(books)
        const expected =  [
            {
                title: 'title',
                categories: [ 'Art' ],
                authors: [ 'John Doe' ],
                url: 'url',
                id: ''
            },
            {
                title: 'No title',
                categories: [ 'Other' ],
                authors: [ 'Anonymous' ],
                url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
                id: ''
            }
        ]
        expect(result).toEqual(expected)
    })
    test('should filter Book', ()=>{
        const noFieldsBook = {}
        const result = StringProcessing.filterRawBook(noFieldsBook)
        const expected = {
            title: 'No title',
            categories: [ 'Other' ],
            authors: [ 'Anonymous' ],
            url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
            description: 'No description'
        }
        expect(result).toEqual(expected)
    })
});