import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchResults, { fetchData } from '../../views/SearchResults';

export default function SearchBar({ fetchData }) {
    const [query, setQuery] = useState();

    const handleSubmit = (currentTarget) => {
        currentTarget.preventDefault();
        setQuery(currentTarget.target.value);
    }

    const testing = (currentTarget) => {
        currentTarget.preventDefault();
        setQuery(currentTarget.target.value);
    }


    return (
        <React.Fragment>
            <div className={'search'}>
                <form className={'input-group mb-3'} onSubmit={handleSubmit}>
                    <input type="text" className={'form-control'} classID={'search-input'} value={query} onChange={testing}/>
                    <button classID={'search-button'} >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

/* export {query}; */
