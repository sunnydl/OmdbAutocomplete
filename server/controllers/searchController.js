import * as searchService from '../services/searchService.js'

export const searchMovies = async(req, res) => {
    const { input } = req.query
    try {
        const movies = await searchService.getMovieData(input)
        res.status(200).json(movies)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    } 
}
