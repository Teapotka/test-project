import AppBar from "../components/AppBar";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {fetchBooksByName, loadMoreBooks} from "../redux/slices/booksSlice";

const Home = () => {
    // (async function fetchOne() {
    //     const response = await fetch('https://www.googleapis.com/books/v1/volumes/QFXgCgAAQBAJ')
    //     const json = await response.json()
    //     console.log('ID', json)
    // })();
    // (async function fetchData() {
    //     // const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:harry+inauthor:potter&maxResults=30&startIndex=0')
    //     const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:computers&maxResults=30&startIndex=0')
    //     const json = await response.json()
    //     console.log(json)
    // })();
    const {books, status} = useSelector((state: RootState) => state.book);
    const dispatch = useDispatch<AppDispatch>()
    console.log("SELECTOR", books, status)
    return (
        <>
            <AppBar/>
            {
                status == 'loading' && <div className='loader'>Loading...</div>
            }
            {
                books.totalItems != null ?
                    <>
                        <div className='subtitle-text'>Founded {books.totalItems} results</div>

                        <div className='l-card-grid'>
                            {
                                books.totalItems != 0 ?
                                    books.items.map((b: any) => <Card
                                        item={b.volumeInfo}
                                        id={b.id}
                                        key={b.id + b.etag}
                                    />)
                                    :
                                    <></>
                            }
                        </div>

                        {
                            books.totalItems != 0 ?
                                <div className='load-button-box' onClick={()=>dispatch(loadMoreBooks(2))}>
                                    <div className='load-button'>
                                        Load more
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </>
                    :
                    <></>
            }
        </>
    );
}

export default Home