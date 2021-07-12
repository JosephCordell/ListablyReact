import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import TVCard from '../components/TVCard';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Fuse from 'fuse.js';
require('dotenv').config();

const movieDbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default function SearchResults({query}) {

    const [movies, setMovies] = useState([]);
    const [tv, setTV] = useState([]);
    const search = query;
    const [loading, setLoading] = useState(true);

    
    
    const fetchData = (search) => {
        console.log(search);
        const urlMovieResults = `https://api.themoviedb.org/3/search/movie?api_key=${movieDbApiKey}&query=` + search;
        const urlTvResults = `https://api.themoviedb.org/3/search/tv?api_key=${movieDbApiKey}&query=` + search;
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
            fetchData(search)
        }, [])
        
        
        if (loading) return 'Loading...';
        
        return (
            <React.Fragment>
            <div className={'results'}>
                <h2>Search Results</h2>
            </div>

            {movies.map((movie) => (
                <MovieCard movie={movie}/>
                ))}
            {tv.map((tv) => (
                <TVCard tv={tv} />
                ))}

        </React.Fragment>
    )
}

