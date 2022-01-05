import React from 'react'

/**
 * A functional component that displays suggestions
 * @param {object} suggestionsProps Component props that contains the following
 * @param {Array.<Object>} searchResults Data returned from OMDB API
 * @param {number} pillsSize Number of pills currently have
 * @param {number} limit Number of pills allowed (Number of movies that user allowed to add)
 * @param {function} setPills React useState setter for pills
 * @returns {JSX.Element} A functional component.
 */
export default function Suggestions({ suggestionsProps }) {
    const {
        searchResults,
        pillsSize,
        limit,
        setPills,
    } = suggestionsProps

    const disableOptions = (pillsSize >= limit)

    const onSelect = (suggestion) => {
        if(disableOptions) return
        setPills((prevSuggestions) => {
            if(prevSuggestions.find((item) => item.imdbID===suggestion.imdbID)) {
                return [...prevSuggestions]
            } else return [...prevSuggestions, suggestion]
        })
    }

    return (
        <div className="suggestions" data-testid="suggestions-test-id">
            {searchResults && searchResults.map((suggestion) =>
                <div
                    key={suggestion?.imdbID}
                    className={disableOptions? "suggestionDisabled":"suggestion"}
                    onClick={() => onSelect(suggestion)}
                >
                    {suggestion?.Title}
                    <p>{suggestion?.Director}</p>
                </div>
            )}
        </div>
    )
}
