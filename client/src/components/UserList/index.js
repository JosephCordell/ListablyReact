import React from 'react';
import './style.css';
import UserCard from '../UserCard';
import Stream from '../Stream';


export default function UserList({ medias, setMedias, value, type, id, tab }) {


    return (
        <React.Fragment>
            {medias.length > 0 ? 

                <div className="result-container">
                (tab === 'Movie' ? (
                        <>
                            {medias.map((movie) => movie.mediatype === 'movie' ? <UserCard media={media} type={type} id={id} key={media.id} /> : '') }   
                        </>
                    ) : 
                    tab ===" TV shows" ? (
                        <>
                        {medias.map((tv) => tv.mediatype === 'tv' ? <UserCard media={media} type={type} id={id} key={media.id} /> : '') }   
                    </>
                    ): '')
              : (
                    
                <div className="empty-list"> Nothing added yet. Add to your list by searching or looking at trending</div>
            ) 
    );
        </React.Fragment>
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
