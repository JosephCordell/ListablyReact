import React, { useState } from 'react';
import './style.css';
import Similar from '../Similar';
import axios from 'axios';

export default function UserList({ medias }) {

    const [ similar, setSimilar ] = useState([]);

    const getSimilar = (event) => {
        const ID = event.target.dataset.id;
        const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
        const URL = `https://api.themoviedb.org/3/movie/${ ID }/similar?api_key=${ KEY }&language=en-US&page=1`;

        axios.get(URL)
            .then(response => setSimilar(response.data.results))
            .catch(error => console.log(error));
    };

    const reset = (event) => {
        setSimilar([]);
    };

    return (
        <React.Fragment>
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

                                {similar.length
                                    ? <button onClick={ reset }>close</button>
                                    : <button data-id={ media.id } onClick={ getSimilar }>More Like This</button>
                                }

                                <div className="dropDownUser">
                                    <select className="changeStatusUser" value={media.todo}>
                                        <option value="0">Watching</option>
                                        <option value="2">Want to Watch</option>
                                        <option value="4">Completed</option>
                                        <option value="6">Dropped</option>
                                    </select>
                                </div>

                                <div className={'similar-container'}>
                                    { similar.length > 0 
                                        ? similar.map((similarThing) => (
                                            <Similar similarThing={similarThing} key={similarThing.id} />)) 
                                        : '' 
                                    }

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
