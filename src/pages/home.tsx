import AppBar from "../components/AppBar";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {loadMoreBooks} from "../redux/slices/booksSlice";

const Home = () => {
    const {totalItems, items, status, filters} = useSelector((state: RootState) => state.book.books);
    const dispatch = useDispatch<AppDispatch>()
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
                        //if status is not rejected and count of items is
                        // not equal to total count of books you will see the button
                        // otherwise the button will not be displayed
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