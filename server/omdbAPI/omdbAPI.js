import axios from "axios"

const source = 'https://www.omdbapi.com/'

/**
 * Axios api call that fetches movie list by user input
 *
 * @param {string} input User input
 * @return {Promise<Array.<Object>>} Returned data from omdb
 */
export const searchByNames = async(input) => {
    const results = await axios.get(`${source}?s=${input}&type=movie&apikey=${process.env.OMDB_API_KEY}`)
    return results.data
}

/**
 * Axios api call that fetche movie detail by its imdbID
 *
 * @param {string} id The imdbID of the movie
 * @return {Promise<Array.<Object>>} Returned data from omdb
 */
export const searchById = async(id) => {
    const result = await axios.get(`${source}?i=${id}&apikey=${process.env.OMDB_API_KEY}`)
    return result.data
}
