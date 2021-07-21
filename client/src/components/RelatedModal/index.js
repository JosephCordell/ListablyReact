import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadMore from '../ReadMore';
import ChangeStatus from '../ChangeStatus';
import Stream from '../Stream';
import './style.css';

const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
export default function RelatedModal({ type, id, displayModal, setDisplayModal, media }) {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const getOneMovieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
        const getOneTVAPI = `https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&language=en-US`;

        type === 'movie'
            ? axios.get(getOneMovieAPI).then((request) => {
                  setInfo(request.data);
              })
            : axios.get(getOneTVAPI).then((request) => {
                  setInfo(request.data);
              });
    }, []);

    return (
        <React.Fragment>
            {displayModal ? (
                <>
                    {type === 'movie' ? (
                        <div className="modal-container">
                            <div className="center-modal">
                                <div className="modal-info">
                                    <div className="image-container">
                                        <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt="movie" className={'modal-image'} />
                                    </div>
                                    <div className={'card-title'}>{info.title}</div>
                                    <div className={'modal-description'}>
                                        {' '}
                                        <ReadMore text={info.overview}>{info.overview}</ReadMore>{' '}
                                    </div>
                                    <div className="stream">
                                        <p className="availability">Available online at:</p>
                                        <Stream movieID={id} key={id} />
                                    </div>
                                    <div className="status">
                                        <ChangeStatus media={media} />
                                    </div>
                                    <div className="close-btn">
                                        <button className="close-btn-text" onClick={() => setDisplayModal(!displayModal)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="modal-container">
                            <div className="center-modal">
                                <div className="modal-info">
                                    <div className="image-container">
                                        <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt="tv" className={'modal-image'} />
                                    </div>
                                    <div className={'title-date card-title'}>{info.name}</div>
                                    <div className={'modal-description'}>
                                        {' '}
                                        <ReadMore text={info.overview}>{info.overview} </ReadMore>{' '}
                                    </div>
                                    <div className="stream">
                                        <p className="availability">Available online at:</p>
                                        <Stream tvID={id} key={id} />
                                    </div>
                                    <div className="status">
                                        <ChangeStatus media={media} />
                                    </div>
                                    <div className="close-btn">
                                        <button className="close-btn-text" onClick={() => setDisplayModal(!displayModal)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : null}
        </React.Fragment>
    );
}
