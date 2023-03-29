export class StringProcessing {
    static noImage =`${process.env.REACT_APP_NO_IMAGE}`

    static toSearchString(search: string) {
        return search.toLocaleLowerCase().split(' ').filter(i => i !== '').join('+')
    }

    static toNameSearchURL(searchString: string, categories: TCategories, sortingBy: TSortingBy, length?: number) {
        return `/volumes?q=${searchString}${categories === 'all' ? "" : `+subject:${categories}`}&orderBy=${sortingBy}${length ? `&startIndex=${length}` : ''}`
    }

    static toIdSearchURL(id: string) {
        return `/volumes/${id}`
    }

    private static filter({title, categories, authors, imageLinks}: TRawBook) {
        console.log(this.noImage, typeof this.noImage)
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

    static filterRawBooks({items}: Pick<TRawBooks, 'items'>) {
        console.log("FILTER BOOKS", items)
        return items!.map(i => ({...this.filter(i.volumeInfo), id: i.id}))
    }

    static filterRawBook(rawBook: TRawBook) {
        const description = rawBook.description ? rawBook.description : "No description"
        return {...this.filter(rawBook), description}
    }
}