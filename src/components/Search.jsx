import React from 'react'
import { useGlobalContext } from '../context'

const Search = () => {
    const { query, setQuery, showError } = useGlobalContext();
    return (
        <section className='search-section'>
            <h2>Search Your Favourite Movie</h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input
                        type="text"
                        placeholder='enter here'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </form>
            <div className="card-error">
                <p>{showError.show && showError.msg}</p>
            </div>
        </section>
    )
}

export default Search