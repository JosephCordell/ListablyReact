import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReadMore from '../ReadMore';
import ChangeStatus from '../ChangeStatus';
import './style.css';

const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
export default function RelatedModal({ type, id, displayModal, setDisplayModal }) {
    const [info, setInfo] = useState([]);


    useEffect(() => {
        const getOneMovieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
        const getOneTVAPI = `https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&language=en-US`

        type === "movie"
            ? axios.get(getOneMovieAPI).then((request) => {
                setInfo(request.data);
            })
            : axios.get(getOneTVAPI).then((request) => {
                setInfo(request.data);
                console.log(request.data);
            })
    }, [])

    return (
        <React.Fragment>

            {displayModal
                ? <>
                    {type === 'movie'
                        ? <div className='modal-container'>
                            <div className='modal-info'>
                                <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt="movie" className={'card-image'} />
                                <div className={'card-title'}>{info.title}</div>
                                <div className={'description'}> <ReadMore text={info.overview}>{info.overview}</ReadMore>  </div>
                                < ChangeStatus media={type} />
                            </div>
                        </div>
                        : <div className='modal-container'>
                            <div className='modal-info'>
                                <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt="tv" className={'card-image'} />
                                <div className={'title-date card-title'}>{info.name}</div>
                                <div className={'description'}> <ReadMore text={info.overview}>{info.overview} </ReadMore> </div>
                                < ChangeStatus media={type} />
                            </div>
                        </div>}
                </>
                : null}

        </React.Fragment>
    )
}
