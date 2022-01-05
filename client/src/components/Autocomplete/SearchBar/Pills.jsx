import React from 'react'

/**
 * A functional component that displays pills on searchbar
 * @param {object} pillProps Component props that contains the following
 * @param {Array.<Object>} pills React useState state for movies selected from searchResults
 * @param {function} setPills React useState setter for pills
 * @returns {JSX.Element} A functional component.
 */
export default function Pills({ pillProps }) {
    const { pills, setPills } = pillProps

    const removePill = (imdbID) => {
        setPills(pills.filter((pill) => pill?.imdbID!==imdbID))
    };

    return (
        <div className="pillsWrapper" data-testid="pillsWrapper-test-id">
            {pills.map((pill) => {
                return (
                    <div 
                        className="pill" 
                        key={pill?.imdbID}
                        id="pill-id"
                    >
                        {pill?.Title}
                        <button
                            onClick={() => removePill(pill?.imdbID)}
                            className="pillCloseBtn"
                            data-testid="pills-delete-test-id"
                        >
                            X
                        </button>
                    </div>
                );
            })}
        </div>
    )
}
