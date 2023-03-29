import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
})

instance.interceptors.request.use((config)=>{
    config.params = {
        key: `${process.env.REACT_APP_API_KEY}`,
    }
    if(config.url!.startsWith('/volumes?')) {
        config.params = {
            ...config.params,
            maxResults: 30,
        }
    }
    console.log(config)
    return config
})

export default instance