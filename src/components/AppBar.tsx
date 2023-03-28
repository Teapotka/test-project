import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchBooksByName} from "../redux/slices/booksSlice";
import {AppDispatch} from "../redux/store";

const AppBar = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch<AppDispatch>()
    const onSubmit = (data: any) => dispatch(fetchBooksByName(data))
    return (
        <div className='l-app-bar backgroundImage'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='l-app-bar-grid'>
                    <div className='header-text'>Book for every day</div>
                    <div className='search-bar'>
                        <input
                            type='text'
                            placeholder= {errors.search ? "Write a name" : 'Search...'}
                            style={{border: errors.search ? "red solid 1px" : 'none'}}
                            {...register("search", {required: "Name is required"})}
                        />
                        <button type='submit'>Go</button>
                    </div>
                    <div className='l-app-bar-row'>
                        <div>
                            Categories
                        </div>
                        <select
                            defaultValue='all'
                            {...register("categories")}
                        >
                            <option value='all'>all</option>
                            <option>art</option>
                            <option>biography</option>
                            <option>computers</option>
                            <option>history</option>
                            <option>medical</option>
                            <option>poetry</option>
                        </select>
                    </div>
                    <div className='l-app-bar-row'>
                        <div>
                            Sorting by
                        </div>
                        <select
                            defaultValue='relevance'
                            {...register("sortingBy")}
                        >
                            <option value='relevance'>relevance</option>
                            <option>newest</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AppBar