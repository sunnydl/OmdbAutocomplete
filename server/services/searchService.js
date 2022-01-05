import * as omdbAPI from '../omdbAPI/omdbAPI.js'

/**
 * Service used to filter the data and remove duplicates
 *
 * @param {Array.<Object>} movies The data received from omdb API
 * @return {Array.<Object>} The filtered data from omdb API that have no duplicates
 */
const filterData = (movies) => {
    return Array.from(new Set(movies.map(movie => movie.imdbID)))
        .map(imdbID => {
            return movies.find(movie => movie.imdbID === imdbID)
        })
}

/**
 * Service used to fetch and process movie data from omdb API with user input.
 * if Response is False from omdb API, then it will return empty list and a false response flag,
 * else it will filter and fetch the movie detail such as Title and Director with their
 * imdbID and return the processed list and true response flag
 *
 * @param {string} input The search input from user
 * @return {Promise<Array.<Object>>} DTO that contains the processed movie list and response flag
 */
export const getMovieData = async(input) => {
    const response = {}
    const Movies = []
    const results = await omdbAPI.searchByNames(input)

    if(results.Response==='False') {
        response.Movies = Movies
        response.Response = false
        return response
    }

    const filteredData = filterData(results.Search)

    for(const data of filteredData) {
        const movie = await omdbAPI.searchById(data.imdbID)
        Movies.push({
            Title: movie.Title,
            Director: movie.Director,
            imdbID: movie.imdbID,
        })
    }
    response.Movies = Movies
    response.Response = true
    return response
}
