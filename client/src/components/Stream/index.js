/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

const movieDbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default function Stream({ movieID, tvID }) {
    const [stream, setStream] = useState({
        link: null,
    });
    const [provider, setProvider] = useState([]);

    const streamMovieAPI = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${movieDbApiKey}`;
    const streamTVAPI = `https://api.themoviedb.org/3/tv/${tvID}/watch/providers?api_key=${movieDbApiKey}`;

    useEffect(() => {
        movieID
            ? axios.get(streamMovieAPI).then((request) => {
                  setStream({ ...request.data.results.US });
              })
            : axios.get(streamTVAPI).then((request) => {
                  setStream({ ...request.data.results.US });
              });
    }, []);

    useEffect(() => {
        const keys = Object.keys(stream);
        keys.forEach((key) => {
            if (key !== 'link') {
                const providerArr = [];
                stream[key].forEach((element) => {
                    if (element.logo_path !== '') {
                        providerArr.push(element.logo_path);
                    } else {
                        return;
                    }
                });
                setProvider(providerArr);
            }
        });
    }, [stream]);

    return (
        <React.Fragment>
            <div className="logo-container">
                {provider.length > 0 ? (
                    provider.map((logo) => (
                        <img src={`https://image.tmdb.org/t/p/original/${logo}`} alt="provider_logo" className={'provider-logo'} key={logo} />
                    ))
                ) : (
                    <p>Not Available Online</p>
                )}
            </div>
        </React.Fragment>
    );
}
