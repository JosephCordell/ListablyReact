import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { reduce } from '../../js/todoFunctions';
import API from '../../js/API';

import './style.css';

export default function UserList({ medias, setMedias }) {
    //delete id array from object before sending it to the database and just store it from there, no need to delete on the server side

    const removeTodo = (value, id) => {
        if (value === '6') {
            API.todo.delete(value, id);
            setMedias(medias.filter((media) => media.id !== id));
        }
    };

    
    return (
        <React.Fragment>{console.log('length', medias.length)}
            {medias.length > 0 ? (
                <div className="result-container">
                    {medias.map((media) => (
                        <div className={`card-container ${media.mediatype}`}>
                            <div
                                className="card-info "
                                data-title={media.title}
                                data-poster={media.poster_path}
                                data-id={media.id}
                                data-type={media.mediatype}
                                data-description="{{media.overview}}"
                                data-todo="{{media.todo}}"
                            >
                                <img src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} alt={media.mediatype} className="card-image" />
                                <div className="card-title">{media.title}</div>

                                <div className="dropDownUser">
                                    <select
                                        className="changeStatusUser"
                                        value={media.todo}
                                        onChange={(e) => {
                                            removeTodo(e.target.value, media.id);
                                        }}
                                    >
                                        <option value="0">Watching</option>
                                        <option value="2">Want to Watch</option>
                                        <option value="4">Completed</option>
                                        <option value="6">Dropped</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-list"> Nothing added yet. Add to your list by searching or looking at trending</div>
            )}
        </React.Fragment>
    );
}
