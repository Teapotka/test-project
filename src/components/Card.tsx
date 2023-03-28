// const url = "http://books.google.com/books/publisher/content?id=QFXgCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72miHKnkcRUQlwgN0w9RXNG1GXPFYCu9g-24Cw7E1BdDMWaP5QDdCoSBgF2yyA4dFosIuB6nlI9m-TOoSzrUnEtLewRjPHHW69d0veolUcd-970qUZx1tu_SgrLe48ijxFHZyss&source=gbs_api"
import {FC} from "react";
import {useNavigate} from "react-router-dom";

// const url = "http://books.google.com/books/publisher/content?id=QFXgCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71KOeFtpApaSex0SsKQ4rpDDtImXiHHuM1nTa8dre5hZWY_HjLqpVunIZOjW6R92P1gOWkrLKZLUtXvXJ1BOJWU4ZvIF-ZHtax9sp2zT1vPEd-skrwf9xKsmyV8caRIqiNCtX-7&source=gbs_api"
const Card:FC<{item: any, id: string}> = ({item, id}) => {
    const url = item.hasOwnProperty('imageLinks')
        ? item.imageLinks.hasOwnProperty('thumbnail')
            ? item.imageLinks.thumbnail
            : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    const category = item.hasOwnProperty('categories') ?  item.categories[0] : 'Other'
    const name = item.hasOwnProperty('title') ?  item.title.length > 25 ? item.title.slice(0, 25)+'...': item.title :'No title'
    const author = item.hasOwnProperty('authors') ?  item.authors[0] : 'Anonymous'
    const navigate = useNavigate()
    return (
        <div className='card' id={id} onClick={()=>navigate(`/${id}`)}>
            <div className='card-image'>
                <img src={url} />
            </div>
            <div className='card-category'>{category}</div>
            <div className='card-name'>{name}</div>
            <div className='card-author'>{author}</div>
        </div>
    )
}

export default Card