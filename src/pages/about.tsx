import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch, RootState} from "../redux/store";
import {fetchBookById} from "../redux/slices/booksSlice";
import AppBar from "../components/AppBar";

const About = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {url, title, authors, categories, status} = useSelector((state: RootState)=> state.book.book)
    useEffect(()=>{
        dispatch(fetchBookById(id!))
    },[])
    return(
        <>
         <AppBar/>
        <div className='l-about-grid'>
            <div className='about-image'>
                <img src={url}/>
            </div>
            <div className='about-info'>
                <div className='about-category'>{(categories.length > 3 ? categories.slice(0,3): categories).map(c => <>{c}<br/></>)}</div>
                <div className='about-title'>{title}</div>
                <div className='about-author'>{authors.join(", ")}</div>
            </div>
        </div>
        </>
    )
}
export default About