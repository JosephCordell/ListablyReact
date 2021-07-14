import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function SearchBar({ user, setUser }) {
    const [query, setQuery] = useState("");
    const history = useHistory();

    const handleSubmit = (currentTarget) => {
        currentTarget.preventDefault();
        setUser({...user, query})
        history.push("/results");
    }


    return (
        <React.Fragment>
            <div className={'search'}>
                <form className={'input-group mb-3'} onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" className={'form-control'} classID={'search-input'} value={query} onChange={(e) => {setUser({...user, searchLoad:true}) ;setQuery(e.target.value)}}/>
                    <button classID={'search-button'} >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>

        </React.Fragment>
    )
}

