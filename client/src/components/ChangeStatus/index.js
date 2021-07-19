/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.css';
import API from '../../js/API'

export default function ChangeStatus({ media }) {
    const mediaDetails = media;

    const addTodo = (value) => {
        if (!API.loggedIn()) {
            document.location.replace('/login');

        }
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
                console.log(`add movie`);
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
                        localStorage.setItem('todo', data.todo);
                    })
                    .catch((error) => console.log(error));
            }
        }

        if (mediaDetails.media_type === 'tv') {
            console.log(`TV!!!`);
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
                        console.log(data.todo);
                        localStorage.setItem('todo', data.todo);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }

    return (
        <React.Fragment>
            <select className={'changeStatus'} onChange={(e) => addTodo(e.target.value)} defaultValue="default">
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
