import { useState, useEffect } from 'react'

/**
 * A functional component where users can see movies suggestions as they type in the title
 * @param {boolean} disabled Default as false, if pass in true then it will disable the component
 */
export default function useClickHook({ disabled }) {
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        const handleClick = (e) => {
            if(disabled) return
            if(e.target.id==="inputField-id") {
                setShowSuggestions(true)
            } else setShowSuggestions(false)
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [disabled])

    return [showSuggestions, setShowSuggestions]
}
