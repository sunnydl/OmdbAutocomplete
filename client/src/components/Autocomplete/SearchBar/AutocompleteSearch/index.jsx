import React, { useState } from 'react'
import InputField from './InputField'
import Suggestions from './Suggestions'
import useClickHook from '../../Custom-hooks/useClickHook'

/**
 * A functional component wrapper for InputField and Suggestions
 * @param {object} autocompleteSearchProps Component props that contains the following
 * @param {boolean} disabled Default as false, if pass in true then it will disable the component
 * @param {number} limit Default as 5, it determines how many movies the users can add as pills
 * @param {number} pillsSize Number of pills currently have
 * @param {string} name Name for the inputfield
 * @param {string} placeholder Placeholder for the inputfield
 * @param {function} searchAPI An asynchronous axios call that fetch movie data with a user input
 * @param {function} setErrMessage A React useState setter for error message
 * @param {function} setPills React useState setter for pills
 * @returns {JSX.Element} A functional component.
 */
export default function AutocompleteSearch({ autocompleteSearchProps }) {
    const {
        disabled,
        name,
        placeholder,
        searchAPI,
        pillsSize,
        limit,
        setPills,
        setErrMessage,
    } = autocompleteSearchProps

    const [showSuggestions, setShowSuggestions] = useClickHook(disabled)
    const [searchResults, setSearchResults] = useState([])

    const inputFieldProps = {
        disabled,
        name,
        placeholder,
        searchAPI,
        setShowSuggestions,
        setErrMessage,
        setSearchResults
    }
    const suggestionsProps = {
        searchResults,
        pillsSize,
        limit,
        setPills,
    }
    return (
        <div className="autocompleteSearch">
            <InputField 
                inputFieldProps={inputFieldProps}
            />
            {showSuggestions && (searchResults.length > 0) && <Suggestions 
                suggestionsProps={suggestionsProps}
            />}
        </div>
    )
}
