/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.css';
import API from '../../js/API';

export default function ChangeStatus({ media, displayDropped = false, setShowCard, setMedias }) {
    const mediaDetails = media;

    const addTodo = (value) => {
        if (value === '6') {
            API.todo.delete(value, mediaDetails.id);
            setShowCard(false);
            const todoArr = JSON.parse(localStorage.getItem('todo'));
            API.media.get().then((response) => {
                if (!response) {
                    return;
                }
                response.forEach((element, index) => {
                    for (let i = 0; i < todoArr.length; i++) {
                        if (todoArr[i].id === element.id) {
                            response[index].todo = todoArr[i].todo;
                            break;
                        }
                    }
                });
                setMedias(response);
            });
            return;
        }
        if (!API.loggedIn()) {
            document.location.replace('/login');
            return;
        }
        if (mediaDetails.mediatype === 'movie' || mediaDetails.media_type === 'movie') {
            const missive = {
                title: mediaDetails.title,
                release_date: mediaDetails.release_date,
                poster_path: mediaDetails.poster_path,
                mediatype: mediaDetails.mediatype,
                id: mediaDetails.id,
                todo: value,

                description: mediaDetails.overview,
                authorization: localStorage.getItem('token'),
            };

            const missiveJSON = JSON.stringify(missive);
            if (value !== 'default') {
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

        if (mediaDetails.mediatype === 'tv' || mediaDetails.media_type === 'tv') {
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
                        localStorage.setItem('todo', data.todo);
                    })
                    .catch((error) => console.log(error));
            }
        }
    };

    return (
        <React.Fragment>
            <select className={'changeStatus'} onChange={(e) => addTodo(e.target.value)} defaultValue={media.todo ? media.todo : 'default'}>
                <option value="default" disabled hidden>
                    Add to my list:
                </option>
                <option value="0">Watching</option>
                <option value="2">Want to Watch</option>
                <option value="4">Complete</option>
                {displayDropped === true ? <option value="6">Dropped</option> : null}
            </select>
        </React.Fragment>
    );
}
