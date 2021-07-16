import '../App.css'
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
require('dotenv').config();

const movieDbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default function TrendingMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get trending movies
    const trendingMoviesApi = `https://api.themoviedb.org/3/trending/movie/day?api_key=${movieDbApiKey}`;

    useEffect(() => {
        async function fetchData() {
            await axios.get(trendingMoviesApi).then((request) => {
                setMovies(request.data.results);
                setLoading(false);
            });
        }
        fetchData();
    }, []);


    if (loading) return 'Loading...';
    return (
        <React.Fragment>
            <div className={'results'}>
                <h2>Top 25 Trending Movies</h2>
            </div>

            <div className='result-container'>
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </React.Fragment>
    );
}
