/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './style.css';

export default function ChangeStatus({ media }) {
    const mediaDetails = media;
    const [value, setValue] = useState('default');

    useEffect(() => {
        console.log(mediaDetails);
        if (mediaDetails.media_type === 'movie') {
            const missive = {
                title: mediaDetails.title,
                release_date: mediaDetails.release_date,
                poster_path: mediaDetails.poster_path,
                mediatype: mediaDetails.media_type,
                id: mediaDetails.id,
                todo: value,

                description: mediaDetails.overview,
                authorization: localStorage.getItem('token'),
            };

            const missiveJSON = JSON.stringify(missive);

            if (value !== 'default') {
                if (missive.mediatype === 'movie')
                    fetch('/api/media/add', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${ localStorage.getItem('token') }`,
                    },
            body: missiveJSON,
                })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('todo', data.todo);
        })
        .catch((error) => console.log(error));
}
        }
if (mediaDetails.media_type === 'tv') {
    const missive = {
        title: mediaDetails.name,
        release_date: mediaDetails.first_air_date,
        poster_path: mediaDetails.poster_path,
        mediatype: mediaDetails.media_type,
        id: mediaDetails.id,
        todo: value,

        description: mediaDetails.overview,
        authorization: localStorage.getItem('token'),
    };
    if (value !== 'default') {
        const missiveJSON = JSON.stringify(missive);

        if (missive.mediatype === 'movie')
            fetch('/api/media/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${ localStorage.getItem('token') }`,
                    },
    body: missiveJSON,
                })
                    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('todo', data.todo);
    })
    .catch((error) => console.log(error));
            }
        }
    }, [value]);


return (
    <React.Fragment>
        <select className={'changeStatus'} onChange={(e) => setValue(e.target.value)} defaultValue="default">
            <option value="default" disabled hidden>
                Add to my list:
            </option>
            <option value="0">Watching</option>
            <option value="2">Want to Watch</option>
            <option value="4">Complete</option>
        </select>
    </React.Fragment>
);
}