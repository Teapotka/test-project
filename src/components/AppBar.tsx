import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchBooksByName} from "../redux/slices/booksSlice";
import {AppDispatch} from "../redux/store";
import {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

const AppBar = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch<AppDispatch>()
    const {pathname} = useLocation()
    const basepath = `${process.env.REACT_APP_BASE_ROUTE}`
    console.log(pathname, basepath)
    const onSubmit = (data: any) => dispatch(fetchBooksByName(data))
    useEffect(()=>{
        window.addEventListener('keydown', (e:KeyboardEvent)=>{
            if(e.code == 'Enter'){
                (document.querySelector('button[type=submit]') as HTMLButtonElement).click()
            }
        })
    },[])
    return (

        <div className='l-app-bar flex-center background-image' data-testid='app-bar'>
            {
                pathname == basepath ?
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid-padding l-app-bar-grid'>
                    <div className='header-text'>Book for every day</div>
                    <div className='flex-center'>
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
                    :
                    <div className='header-text padding-top'><Link to={basepath}>Back to search</Link></div>
            }
        </div>
    )
}

export default AppBar