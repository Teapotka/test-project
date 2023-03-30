import axios from 'axios'

const instance = axios.create({
    //Google Books Api Base URL
    baseURL: 'https://www.googleapis.com/books/v1',
})

instance.interceptors.request.use((config)=>{
    //adding API key from .env to each request
    config.params = {
        key: `${process.env.REACT_APP_API_KEY}`,
    }
    //adding max count of results for certain type of request
    if(config.url!.startsWith('/volumes?')) {
        config.params = {
            ...config.params,
            maxResults: 30,
        }
    }
    return config
})

export default instance