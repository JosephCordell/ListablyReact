/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
//import Select from 'react-select';
import './style.css';

export default function ChangeStatus({ media }) {
    const mediaDetails = media;
    const [value, setValue] = useState('default');

    useEffect(() => {
        console.log(mediaDetails);
        if (mediaDetails.media_type === 'movie') {
            console.log(`movies?`);
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
                if (missive.mediatype === 'movie') console.log('you made it here!');
                fetch('/api/media/add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: missiveJSON,
                })
                    .then((response) => response.json())
                    .then((data) => {

                        console.log(data);
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
            console.log(missive, mediaDetails);
            if (value !== 'default') {
                const missiveJSON = JSON.stringify(missive);

                if (missive.mediatype === 'movie') console.log('you made it here!');
                fetch('/api/media/add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: missiveJSON,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('TV: WOrking? Did I make it? ');
                        localStorage.setItem('todo', data.todo);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, [value]);

    /* 
    const options = [
        { value: '0', label: 'Watching' },
        { value: '2', label: 'Want to Watch' },
        { value: '4', label: 'Complete' },
    ];

    return (
        <React.Fragment>
            <div className='changeStatus' onChange={(e) => console.log(value)} >
            <Select 
                value={options.value}
                options={options}
                placeholder={"Add to my list:"}
            />
            </div>
        </React.Fragment>
    ); */

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
