/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
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
            await fetch('/api/media/top20/movie', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            })
            .then((response) => {
                response = response.json()
                console.log(`use effect`);
                    console.log(response);
                    console.log(`response.data.results`);
                    console.log(response.results);
                    setMovies(response.results);
                    setLoading(false);
                })
                .catch((error) => console.log(error));
        }
        fetchData();
    }, []);

    if (loading) return 'Loading...';
    return (
        <React.Fragment>
            <div className={'results'}>
                <h2>Top 20 Trending Movies</h2>
            </div>
            {console.log(`typeof`)}
            {console.log(typeof(movies))}
            <div id='big-shell'>
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </React.Fragment>
    );
}
