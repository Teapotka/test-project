import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch, RootState} from "../redux/store";
import {fetchBookById} from "../redux/slices/booksSlice";
import AppBar from "../components/AppBar";
import React from "react";

const About = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {url, title, authors, categories, description, status} = useSelector((state: RootState) => state.book.book)
    useEffect(() => {
        dispatch(fetchBookById(id!))
    }, [])
    console.log("SELECTOR", {url, title, authors, categories, status}, id)
    return (
        <>
            <AppBar/>
            {
                status == 'loading' && <div className='loader'>Loading...</div>
            }
            {
                status == 'rejected' && <div className='loader'>No book found :(</div>
            }
            {
                status == 'loaded' &&
                <div className='l-about-grid'>
                    <div className='about-image'>
                        <img src={url}/>
                    </div>
                    <div className='about-info'>
                        <div className='about-category'>{
                            (categories.length > 3 ? categories.slice(0, 3) : categories)
                                .map((c: string, index: number) => <React.Fragment key={index}>
                                    {c}
                                    <br/>
                                </React.Fragment>)}
                        </div>
                        <div className='about-title'>{title}</div>
                        <div className='about-author'>{authors.join(", ")}</div>
                        <div className='about-author'>{description.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '')}</div>
                    </div>
                </div>
            }
        </>
    )
}
export default About