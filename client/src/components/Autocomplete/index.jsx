import React, { useState } from 'react'
import SearchBar from './SearchBar';
import './index.css'

/**
 * A functional component where users can see movies suggestions as they type in the title
 * @param {boolean} disabled Default as false, if pass in true then it will disable the component
 * @param {number} limit Default as 5, it determines how many movies the users can add as pills
 * @param {string} name Name for the inputfield
 * @param {string} placeholder Placeholder for the inputfield
 * @param {function} searchAPI An asynchronous axios call that fetch movie data with a user input
 * @returns {JSX.Element} A functional component.
 */
export default function Autocomplete({ 
    disabled = false,
    limit = 5,
    name = "",
    placeholder = "",
    searchAPI = async() => [],
 }) {

    const [errMessage, setErrMessage] = useState("")

    const searchBarProps = {
        disabled,
        name,
        placeholder,
        limit,
        searchAPI,
        setErrMessage,
    }
    return (
        <React.Fragment>
            <SearchBar 
                searchBarProps={searchBarProps}
            />
            {errMessage && <p className="errMessage">{errMessage}</p>}
        </React.Fragment>
    )
}
