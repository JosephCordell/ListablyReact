import React, { useState } from 'react';
import './style.css';
import ChangeStatus from '../ChangeStatus';
import Stream from '../Stream';

export default function UserCard({ media, id, setMedias}) {
    const [showCard, setShowCard] = useState(true);
    if (!showCard) {
        return null;
    }

    return (
        <div 
            className={`user-result-container`}
            data-title={media.title}
            data-poster={media.poster_path}
            data-id={media.id}
            data-type={media.mediatype}
            data-description={media.overview}
            data-todo={media.todo}>

                <div className={'inner-user-result-container'}>
                <img src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} alt={media.mediatype} className="card-image" />
                <div className="card-title">{media.title}</div>
                {media.mediatype === 'movie' ? (
                    <>
                        <p className="availability">Available online at:</p>
                        <Stream movieID={media.id} key={media.id} />{' '}
                    </>
                ) : (
                    <>
                        <p className="availability">Available online at:</p>
                        <Stream tvID={media.id} key={media.id} />
                    </>
                )}
                <ChangeStatus setMedias={setMedias} displayDropped={true} media={media} setShowCard={setShowCard} />
                </div>
        </div>
    );
}
