
import React, { useState } from 'react';
import './style.css';
import ChangeStatus from '../ChangeStatus';

export default function UserCard({ media }) {
    const [showCard, setShowCard] = useState(true);
    if(!showCard){
        return null;
    }

    return (

        <div className={`card-container ${media.mediatype}`}>
            <div
                className="card-info"
                data-title={media.title}
                data-poster={media.poster_path}
                data-id={media.id}
                data-type={media.mediatype}
                data-description={media.overview}
                data-todo={media.todo}
            >
                <img src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} alt={media.mediatype} className="card-image" />
                <div className="card-title">{media.title}</div>

                <ChangeStatus displayDropped={true} media={media} setShowCard={setShowCard}/>
            </div>
        </div>

    );
}
