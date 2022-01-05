import React, { useState } from 'react'

/**
 * A functional component that users can type on
 * @param {object} inputFieldProps Component props that contains the following
 * @param {boolean} disabled Default as false, if pass in true then it will disable the component
 * @param {string} name Name for the inputfield
 * @param {string} placeholder Placeholder for the inputfield
 * @param {function} searchAPI An asynchronous axios call that fetch movie data with a user input
 * @param {function} setErrMessage A React useState setter for error message
 * @param {function} setShowSuggestions A React useState setter for suggestions
 * @param {function} setSearchResults A React useState setter for searchResults
 * @returns {JSX.Element} A functional component.
 */
export default function InputField({ inputFieldProps }) {
    const {
        disabled,
        name,
        placeholder,
        searchAPI,
        setShowSuggestions,
        setErrMessage,
        setSearchResults
    } = inputFieldProps

    const [searchInput, setSearchInput] = useState("");

    const searchMovies = async(input) => {
        try {
            const response = await searchAPI(encodeURI(input.trim()))
            setShowSuggestions(true)
            setErrMessage("")
            return response.data
        } catch (err) {
            console.error('Error:', err.response)
            setShowSuggestions(false)
            setErrMessage("Something is wrong, please try again later")
        }
    }

    // set a delay to trigger the search to optimize api call
    let timer
    const handleSearch = (event) => {
        const input = event.target.value

        // if the input is the same then dont call the api
        if(input.trim()===searchInput) {
            setSearchInput(input)
            return
        }        
        setSearchInput(input)

        clearTimeout(timer)
        timer = setTimeout(async() => {
            const results = await searchMovies(input)
            if (results?.Response && Array.isArray(results?.Movies)) {
                setSearchResults(results.Movies)
            } else setSearchResults([])
        }, 500)
    }

    return (
        <React.Fragment>
            <input
                disabled={disabled}
                type="text"
                name={name}
                placeholder={placeholder}
                onChange={handleSearch}
                value={searchInput}
                autoComplete="off"
                id="inputField-id"
                data-testid="inputField-test-id"
            />
        </React.Fragment>
    )
}
