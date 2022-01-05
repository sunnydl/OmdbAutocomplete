import {
    fireEvent,
    render,
    screen,
    cleanup,
    waitFor,
} from '@testing-library/react'
import Autocomplete from './index'
import Pills from './SearchBar/Pills'
import Suggestions from './SearchBar/AutocompleteSearch/Suggestions'

describe('Autocomplete test', () => {
    let searchAPI

    beforeAll(() => {
        searchAPI = async(input) => {
            return {
                data: {
                    "Movies": [
                        {
                            "Title": "Spider-Man",
                            "Director": "Sam Raimi",
                            "imdbID": "tt0145487"
                        },
                        {
                            "Title": "The Amazing Spider-Man",
                            "Director": "Marc Webb",
                            "imdbID": "tt0948470"
                        },
                        {
                            "Title": "Spider-Man 2",
                            "Director": "Sam Raimi",
                            "imdbID": "tt0316654"
                        }
                    ],
                    "Response": true
                }
            }
        }
    })

    afterEach(() => {
        cleanup()
    })

    it('see suggestions when input are typed', async() => {
        render(
        <Autocomplete 
            searchAPI={searchAPI}
        />)
        const expectedSuggestion = "Spider-Man"
        
        // assert no suggestions before input are typed
        expect(screen.queryByRole("suggestions-test-id")).toBeNull()

        // given
        const SearchBar = screen.getByTestId("inputField-test-id")

        // when
        fireEvent.click(SearchBar)
        fireEvent.change(SearchBar, { target: { value: "spider man" } })

        // then
        await waitFor(() => {
            expect(screen.getByTestId("suggestions-test-id")).toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.getByTestId("suggestions-test-id")).toHaveTextContent(expectedSuggestion)
        })
    })

    it('see suggestion as a pill when selected', async() => {
        render(
        <Autocomplete 
            searchAPI={searchAPI}
        />)

        const expectedSuggestion = "Spider-Man"
        const expectedPill = "Spider-Man"

        // given
        const SearchBar = screen.getByTestId("inputField-test-id")
        fireEvent.click(SearchBar)
        fireEvent.change(SearchBar, { target: { value: "spider man" } })
        await waitFor(() => {
            expect(screen.getByTestId("suggestions-test-id")).toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.getByTestId("suggestions-test-id")).toHaveTextContent(expectedSuggestion)
        })
        const Suggestion = screen.getByText(expectedSuggestion)

        // when
        fireEvent.click(Suggestion)

        // then
        await waitFor(() => {
            expect(screen.getByTestId("pillsWrapper-test-id")).toHaveTextContent(expectedPill)
        })
    })

    it('see suggestions disappear when click outside', async() => {
        render(
        <Autocomplete 
            searchAPI={searchAPI}
        />)

        const expectedSuggestion = "Spider-Man"

        // given
        const SearchBar = screen.getByTestId("inputField-test-id")
        fireEvent.click(SearchBar)
        fireEvent.change(SearchBar, { target: { value: "spider man" } })
        await waitFor(() => {
            expect(screen.getByTestId("suggestions-test-id")).toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.getByTestId("suggestions-test-id")).toHaveTextContent(expectedSuggestion)
        })

        // when
        fireEvent.click(document.body)

        // then
        await waitFor(() => {
            expect(screen.queryByRole("suggestions-test-id")).toBeNull()
        })
    })

    it('see pill deleted after clicking x', async() => {
        // given
        const setPillsMock = jest.fn()
        const pillsMock = [{
            "Title": "Spider-Man",
            "Director": "Sam Raimi",
            "imdbID": "tt0145487"
        }]
        const pillProps = {
            pills: pillsMock,
            setPills: setPillsMock,
        }
        render(
        <Pills
            pillProps={pillProps}
        />)
        const deleteButton = screen.getByTestId("pills-delete-test-id")

        // when
        fireEvent.click(deleteButton)

        // then
        expect(setPillsMock).toHaveBeenCalled()
    })

    it('users cannot add more than 5 movies', async() => {
        // given
        const setPillsMock = jest.fn()
        const searchResultsMock = [{
            "Title": "Spider-Man",
            "Year": "2002",
            "Director": "Sam Raimi",
            "imdbID": "tt0145487"
        },
        {
            "Title": "The Amazing Spider-Man",
            "Year": "2012",
            "Director": "Marc Webb",
            "imdbID": "tt0948470"
        }]
        const pillsSizeMock = 5 // when pills' size >= limit
        const limitMock = 5
        const suggestionsProps = {
            searchResults: searchResultsMock,
            pillsSize: pillsSizeMock,
            setPills: setPillsMock,
            limit: limitMock,
        }
        render(
        <Suggestions
            suggestionsProps={suggestionsProps}
        />)

        // then
        expect(setPillsMock).not.toHaveBeenCalled()
    })
})
