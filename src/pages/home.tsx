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
    const {totalItems, items, status, filters} = useSelector((state: RootState) => state.book.books);
    const dispatch = useDispatch<AppDispatch>()
    console.log("SELECTOR", {totalItems, items, status, filters})
    return (
        <>
            <AppBar/>
            {
                status == 'loading' && <div className='loader'>Loading...</div>
            }
            {
                (status == 'rejected' && totalItems == 0 && items!.length == 0) &&
                <div className='loader'>No book found :(</div>
            }
            {
                (items && (status == 'loaded' || items.length != 0)) &&
                <>
                    <div className='subtitle-text'>Founded {totalItems} results</div>
                    <div className='grid-center grid-padding l-card-grid'>
                        {
                            items.map((book: any, index:number) => {
                                return <Card
                                    key={index}
                                    {...book}
                                />;
                            })
                        }
                    </div>
                    {
                        status != 'rejected' ?
                            (items.length != totalItems) &&
                            <div className='flex-alt-center load-button-box' onClick={() => dispatch(loadMoreBooks())}>
                                <div className='flex-alt-center load-button'>
                                    {status == 'loading' ? 'Loading...' : 'Load more'}
                                </div>
                            </div>
                            :
                            <></>
                    }
                </>
            }
        </>
    );
}

export default Home