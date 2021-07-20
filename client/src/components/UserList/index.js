import React, { useState, useEffect } from 'react';
import './style.css';
import UserCard from '../UserCard';

export default function UserList({ medias, setMedias, value, type, id, tab = 'All' }) {
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        if (typeof medias === 'boolean') {
        }
        if (typeof medias === 'object') {
            if (tab === 'TV shows') {
                setFilter(medias.filter((media) => media.mediatype !== 'movie'));
            } else if (tab === 'Movies') {
                setFilter(medias.filter((media) => media.mediatype !== 'tv'));
            } else {
                setFilter(medias);
            }
        }
    }, [tab, medias]);

    return (
        <React.Fragment>
            {medias.length > 0 ? (
                <div className="result-container">
                    {filter.map((media) => (
                        <UserCard media={media} type={type} id={id} key={media.id} />
                    ))}
                </div>
            ) : (
                <div className="empty-list"> Nothing added yet. Add to your list by searching or looking at trending</div>
            )}
        </React.Fragment>
    );
}

/* 
<React.Fragment>
{medias.length > 0 ? (
    tab === 'All' ? (
        <div className="result-container">
            {medias.map((media) => (
                <UserCard media={media} type={type} id={id} key={media.id} />
            ))}
        </div>
    ) : (
        <>
            {medias.filter((media) => media.mediatype !== tab)}
            <div className="result-container">
                {medias.map((media) => (
                    <UserCard media={media} type={type} id={id} key={media.id} />
                ))}
            </div>
        </>
    )
) : (
    <div className="empty-list"> Nothing added yet. Add to your list by searching or looking at trending</div>
)}
</React.Fragment>
);
}

/* 
{tab === 'All' ? (
<UserCard media={media} type={type} id={id} key={media.id} />
) : tab === 'Movie' ? (
media.mediatype === 'Movie' ? (
<UserCard media={media} type={type} id={id} key={media.id} />
) : (
''
)
) : (
media.mediatype === 'TV shows' ? (
<UserCard media={media} type={type} id={id} key={media.id} />
) : (
<p>No movies found</p>
)
)} */
