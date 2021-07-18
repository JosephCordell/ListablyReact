import React, { useState, useEffect } from 'react'
import axios from 'axios';

const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
export default function RelatedModal({ type, id, displayModal}) {
    const [info, setInfo] = useState([]);

    const getOneMovieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
    const getOneTVAPI = `https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&language=en-US`

    useEffect(() => {
        type === "movie"
            ? axios.get(getOneMovieAPI).then((request) => {
                setInfo(request.data.results);
            })
            : axios.get(getOneTVAPI).then((request) => {
                setInfo(request.data.results);
            })
    }, [])

    return (
        <React.Fragment>
            {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" className={'card-image'} />
            <div className={'card-title'}>{movie.title}</div>
            <div className={'description'}> <ReadMore text={movie.overview}>{movie.overview}</ReadMore>  </div>
            < ChangeStatus media={movie} /> */}
            {displayModal
            ? <p>Modal Display Here</p>
            : null}

        </React.Fragment>
    )
}
