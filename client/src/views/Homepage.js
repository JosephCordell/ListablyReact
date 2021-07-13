import React, {useState, useEffect} from 'react';
import axios from 'axios';
require('dotenv').config();

const KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
const URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${ KEY }`;

export default function Homepage() {
const [ trendingMovie, setTrendingMovie ] = useState([]);
const [ trendingTv, setTrendingTv ] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
        async function fetchData() {
            await axios.get(URL).then((request) => {
                const trendyMovie = request.data.results.find(entry => entry.media_type === 'movie');
                const trendyTv = request.data.results.find(entry => entry.media_type === 'tv');
                setTrendingMovie(trendyMovie);
                setTrendingTv(trendyTv);
                setLoading(false);
            });
        }
        fetchData();
    }, []);

    if (loading) return 'Loading...';
    return (
        <React.Fragment>
            <div className={'p-4 mb-4 bg-light rounded-3'}>
                <div className={'container-fluid py-5'}>
                    <h1 className={'listably display-5 fw-bold'}>Listably</h1>
                    <p className={'col-md-8 fs-4'}>Use Listably to keep track of movies and shows you're watching or want to watch</p>
                </div>
            </div>

            <div className={'container-xl'}>
                <div className={'row row-cols-2'}>
                    <div className={'col p-2'}>
                        <div className={'container'}>
                            <img src= {`https://image.tmdb.org/t/p/w500${ trendingMovie.poster_path }`} alt="Movie" className={'image'} />
                            <div className={'overlay'}>
                                <div className={'col-lg text'}>
                                    <a href="/trending-movies" className={'fancy'}>
                                        Movies
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'col p-2'}>
                        <div className={'container'}>

                            <img src= {`https://image.tmdb.org/t/p/w500${ trendingTv.poster_path }`} alt="TV" className={'image'} />
                            <div className={'overlay'}>
                                <div className={'col-lg text'}>
                                    <a href="/trending-tvshows" className={'fancy'}>
                                        TV Shows
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
