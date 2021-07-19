import React, { useState } from 'react';
import ChangeStatus from '../ChangeStatus';
import Stream from '../Stream';
import ReadMore from '../ReadMore';
import Similar from '../Similar';
import axios from 'axios';
import './style.css';
import noImage from '../../images/placeholder.jpg'

export default function MovieCard({ movie }) {
    const [similar, setSimilar] = useState([]);

    const getSimilar = (event) => {
        const ID = event.target.dataset.id;
        const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
        const URL = `https://api.themoviedb.org/3/movie/${ID}/similar?api_key=${KEY}&language=en-US&page=1`;

        axios
            .get(URL)
            .then((response) => setSimilar(response.data.results))
            .catch((error) => console.log(error));
    };

    const reset = (event) => {
        setSimilar([]);
    };

    return (
        <React.Fragment>
            <div key={movie.id} className={'results-container'}>
                <div
                    data-title={movie.title}
                    data-date={movie.release_date}
                    data-poster={movie.poster_path}
                    data-id={movie.id}
                    data-type="movie"
                    data-description={movie.overview}
                >
                    <div className="card-img-date-desc">
                        {!movie.poster_path ? (
                            <img src={noImage} alt="movie" className={'card-image'} />
                        ) : (
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" className={'card-image'} />
                        )}
                        <div className={'card-info'}>
                            <div className={'title-date'}>
                                <h2>{movie.title}</h2>
                                <h3>{movie.release_date}</h3>
                            </div>
                            <div className={'description'}>
                                {' '}
                                <ReadMore text={movie.overview}>{movie.overview}</ReadMore>{' '}
                            </div>
                                <p className="availability">Available online at:</p>
                            <div className="stream">
                                <Stream movieID={movie.id} key={movie.id} />
                            </div>
                        </div>
                    </div>
                    <div className={'myRating'}>
                        {similar.length ? (
                            <button onClick={reset}>close</button>
                        ) : (
                            <button data-id={movie.id} onClick={getSimilar}>
                                More Like This
                            </button>
                        )}

                        <ChangeStatus media={movie} />
                    </div>

                    <div className={'similar-container'}>
                        {similar.length > 0 ? similar.map((similarThing) => <Similar similarThing={similarThing} key={similarThing.id} />) : ''}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
