import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
})

instance.interceptors.request.use((config)=>{
    if(config.url!.startsWith('/volumes?')) {
        config.params = {
            key: 'AIzaSyBCX9DFVmQL1mImqq-1zLmiy22BLbD2q10',
            maxResults: 30,
        }
    }
    console.log(config)
    return config
})

export default instance