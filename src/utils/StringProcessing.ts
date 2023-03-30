export class StringProcessing {
    //url for books that don't have thumbnail
    static noImage =`${process.env.REACT_APP_NO_IMAGE}`

    /**
     * converting raw string to suitable format for the request
     * @param search - raw search string
     * @return string with suitable format for the request
     * */
    static toSearchString(search: string) {
        return search.toLocaleLowerCase().split(' ').filter(i => i !== '').join('+')
    }

    /**
     * converting form fields data to URL-string
     * @param searchString - string with suitable format for the request
     * @param categories - request filter
     * @param sortingBy - request filter
     * @param length - start index
     * @return URL-string
     * */
    static toNameSearchURL(searchString: string, categories: TCategories, sortingBy: TSortingBy, length?: number) {
        return `/volumes?q=${searchString}${categories === 'all' ? "" : `+subject:${categories}`}&orderBy=${sortingBy}${length ? `&startIndex=${length}` : ''}`
    }
    /**
     * converting id value to URL-string
     * @param id - id string
     * @return URL-string
     * */
    static toIdSearchURL(id: string) {
        return `/volumes/${id}`
    }

    /**
     * Raw data filtering
     * @param TRawBook - object that WILL POSSIBLY contain title, categories, authors, imageLinks
     * @return object that WILL DEFINITELY contain title, categories, authors, imageLinks
     * */
    private static filter({title, categories, authors, imageLinks}: TRawBook) {
        return {
            title: title ? title : 'No title',
            categories: categories ? categories : ["Other"],
            authors: authors ? authors : ["Anonymous"],
            url: imageLinks ?
                imageLinks.thumbnail
                    ? imageLinks.thumbnail
                    : this.noImage
                : this.noImage
        }
    }
    /**
     * Raw data filtering for Books
     * @param items - the  array of objects that WILL POSSIBLY contain title, categories, authors, imageLinks
     * @return the array of objects that WILL DEFINITELY contain title, categories, authors, imageLinks
     * */
    static filterRawBooks({items}: Pick<TRawBooks, 'items'>) {
        return items!.map(i => ({...this.filter(i.volumeInfo), id: i.id}))
    }
    /**
     * Raw data filtering for Book
     * @param rawBook - the object that WILL POSSIBLY contain title, categories, authors, imageLinks
     * @return the object that WILL DEFINITELY contain title, categories, authors, imageLinks, description
     * */
    static filterRawBook(rawBook: TRawBook) {
        const description = rawBook.description ? rawBook.description : "No description"
        return {...this.filter(rawBook), description}
    }
}