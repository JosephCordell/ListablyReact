import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { reduce } from '../../js/todoFunctions';
import API from '../../js/API';

import './style.css';
import ChangeStatus from '../ChangeStatus';
import UserCard from '../UserCard';

export default function UserList({ medias, setMedias, value }) {
    //delete id array from object before sending it to the database and just store it from there, no need to delete on the server side

    // const removeTodo = (value, id) => {
    //     if (value === '6') {
    //         API.todo.delete(value, id);
    //         setMedias(medias.filter((media) => media.id !== id));
    //     }
    // };


    return (
        <React.Fragment>
            {medias.length > 0 ? (
                <div className="result-container">
                    {medias.map((media) => (
                        <UserCard media={media} key={media.id}/>
                    ))}
                </div>
            ) : (
                <div className="empty-list"> Nothing added yet. Add to your list by searching or looking at trending</div>
            )}
        </React.Fragment>
    );
}
