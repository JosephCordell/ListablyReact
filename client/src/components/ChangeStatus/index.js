import React, { useState, useEffect } from 'react';

export default function ChangeStatus({ movie }) {
    const movieDetails = movie
    const [value, setValue ] = useState()

    useEffect(() => {

        const missive = {
            title: movieDetails.title,
            release_date: movieDetails.date,
            poster_path: movieDetails.poster,
            mediatype: movieDetails.type,
            id: movieDetails.id,
            todo: value,
            description: movieDetails.overview,
        }; 
/* 
        fetch('/api/media', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(missive),
        })
            .then((response) => {
                if (response.status === 401) {
                    document.location.replace('/login');
                }
            })
            .catch((error) => console.log(error));
     */



    }, [value])


    return (
        <React.Fragment>
            <select className={"changeStatus"} onChange={(e) => setValue(e.target.value)}>
                <option defaultValue="default"  disabled hidden>
                    Add to my list:
                </option>
                <option value="0">Watching</option>
                <option value="2">Want to Watch</option>
                <option value="4">Complete</option>
            </select>
        </React.Fragment>
    );
}
