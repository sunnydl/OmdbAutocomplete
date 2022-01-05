import React, { useState } from 'react'
import Pills from './Pills'
import AutocompleteSearch from './AutocompleteSearch'

/**
 * A functional component wrapper for Pills and AutocompleteSearch
 * @param {object} searchBarProps Component props that contains the following
 * @param {boolean} disabled Default as false, if pass in true then it will disable the component
 * @param {number} limit Default as 5, it determines how many movies the users can add as pills
 * @param {string} name Name for the inputfield
 * @param {string} placeholder Placeholder for the inputfield
 * @param {function} searchAPI An asynchronous axios call that fetch movie data with a user input
 * @param {React.useState} setErrMessage A React useState setter for error message
 * @returns {JSX.Element} A functional component.
 */
export default function SearchBar({ searchBarProps }) {
    const {
        disabled,
        name,
        placeholder,
        limit,
        searchAPI,
        setErrMessage,
    } = searchBarProps

    const [pills, setPills] = useState([])

    const pillProps = {
        pills,
        setPills,
    }
    const autocompleteSearchProps = {
        disabled,
        name,
        placeholder,
        searchAPI,
        setErrMessage,
        pillsSize: pills.length,
        limit,
        setPills,
    }
    return (
        <div className="searchBar">
            <Pills 
                pillProps={pillProps}
            />
            <AutocompleteSearch 
                autocompleteSearchProps={autocompleteSearchProps}
            />
        </div>
    )
}
