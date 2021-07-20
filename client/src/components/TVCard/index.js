import React, { useState } from 'react';
import ChangeStatus from '../ChangeStatus';
import Stream from '../Stream';
import ReadMore from '../ReadMore';
import Similar from '../Similar';
import axios from 'axios';
import './style.css';
import noImage from '../../images/placeholder.jpg';

export default function TVCard({ tv }) {
    const [similar, setSimilar] = useState([]);

    const getSimilar = (event) => {
        const ID = event.target.dataset.id;
        const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
        const URL = `https://api.themoviedb.org/3/tv/${ID}/similar?api_key=${KEY}&language=en-US&page=1`;

        axios
            .get(URL)
            .then((response) => setSimilar(response.data.results))
            .catch((error) => console.log(error));
    };

    const reset = (event) => {
        setSimilar([]);
    };

    return (
        <>
            <div className={'results-container'}>
                <div key={tv.id} data-title={tv.name} data-date={tv.release_date} data-poster={tv.poster_path} data-id={tv.id} data-description={tv.overview}>
                    <div className="card-img-date-desc">
                        {!tv.poster_path ? (
                            <img src={noImage} alt="movie" className={'card-image'} />
                        ) : (
                            <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="tv" className={'card-image'} />
                        )}
                        <div className={'card-info'}>
                            <div className={'title-date card-title'}>{tv.name}</div>
<<<<<<< HEAD
                            <div className={'description'}> <ReadMore text={tv.overview}>{tv.overview} </ReadMore> </div>
                                <p className='availability'>Available online at:</p>
                            <div className='stream'>
=======
                            <div className={'description'}>
                                {' '}
                                <ReadMore text={tv.overview}>{tv.overview} </ReadMore>{' '}
                            </div>
                            <div className="stream">
                                <p className="availability">Available online at:</p>
>>>>>>> main
                                <Stream tvID={tv.id} key={tv.id} />
                            </div>
                        </div>
                    </div>
                    <div className={'myRating'}>
                        {similar.length ? (
                            <button onClick={reset}>close</button>
                        ) : (
                            <button data-id={tv.id} onClick={getSimilar}>
                                More Like This
                            </button>
                        )}

                        <ChangeStatus media={tv} />
                    </div>
                    <div className={'similar-container'}>
                        {similar.length > 0
                            ? similar.map((similarThing) => <Similar similarThing={similarThing} key={similarThing.id + 'tv'} type="tv" />)
                            : ''}
                    </div>
                </div>
            </div>
        </>
    );
}
