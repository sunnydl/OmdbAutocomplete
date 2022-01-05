import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

export const fetchMovies = (input) => API.get('/movies', {
    params: {
        input
    }
})
