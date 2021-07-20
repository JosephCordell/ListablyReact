import React from 'react';
import './style.css';
import UserCard from '../UserCard';
import Stream from '../Stream';


export default function UserList({ medias, setMedias, value, type, id }) {


    return (
        <React.Fragment>
            {medias.length > 0 ? (
                <div className="result-container">
                    {medias.map((media) => (
                        <UserCard media={media} type={type} id={id} key={media.id} 
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-list"> Nothing added yet. Add to your list by searching or looking at trending</div>
            )}
        </React.Fragment>
    );
}
