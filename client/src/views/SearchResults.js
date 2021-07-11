import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
require('dotenv').config();

const movieDbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default function MovieResults({ movieResults, tvResults }) {

    const [movies, setMovies] = useState([]);
    const [tv, setTV] = useState([]);
    const [loading, setLoading] = useState(true);

    const urlMovieResults = `https://api.themoviedb.org/3/search/movie?api_key=${movieDbApiKey}&query=hotel` /* + search */;
    const urlTvResults = `https://api.themoviedb.org/3/search/tv?api_key=${movieDbApiKey}&query=hotel` /* + search */;

    const fetchData = () => {

        const getMovieResults = axios.get(urlMovieResults)
        const getTVResults = axios.get(urlTvResults)
        axios.all([getMovieResults, getTVResults]).then(
            axios.spread((...allData) => {
                const getAllMovies = allData[0]
                const getAllTV = allData[1]

                setMovies(getAllMovies.data.results);
                setTV(getAllTV.data.results);
                setLoading(false)
            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) return 'Loading...';

    return (
        <React.Fragment>
            <div className={'results'}>
                <h2>Search Results</h2>
            </div>

            {movies.map((movie) => (
                <MovieCard movie={movie} />
            ))}
{/*             {tv.map((tv) => (
                <TVCard tv={tv} />
            ))} */}

        </React.Fragment>
    )
}
