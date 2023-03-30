// const url = "http://books.google.com/books/publisher/content?id=QFXgCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72miHKnkcRUQlwgN0w9RXNG1GXPFYCu9g-24Cw7E1BdDMWaP5QDdCoSBgF2yyA4dFosIuB6nlI9m-TOoSzrUnEtLewRjPHHW69d0veolUcd-970qUZx1tu_SgrLe48ijxFHZyss&source=gbs_api"
import {FC} from "react";
import {useNavigate} from "react-router-dom";

// const url = "http://books.google.com/books/publisher/content?id=QFXgCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71KOeFtpApaSex0SsKQ4rpDDtImXiHHuM1nTa8dre5hZWY_HjLqpVunIZOjW6R92P1gOWkrLKZLUtXvXJ1BOJWU4ZvIF-ZHtax9sp2zT1vPEd-skrwf9xKsmyV8caRIqiNCtX-7&source=gbs_api"
const Card:FC<TCardParams> = ({id, title,authors,categories, url}) => {
    const navigate = useNavigate()
    const basepath = `${process.env.REACT_APP_BASE_ROUTE}`
    return (
        <div className='card' id={id} onClick={()=>navigate(`${basepath}${id}`)} data-testid='card'>
            <div className='flex-alt-center card-image'>
                <img src={url} />
            </div>
            <div className='card-subtitle'>{categories[0]}</div>
            <div className='card-title'>{title.length > 25 ? title.slice(0, 25)+'...': title}</div>
            <div className='card-subtitle'>{authors[0]}</div>
        </div>
    )
}

export default Card