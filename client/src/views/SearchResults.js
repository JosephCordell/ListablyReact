/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import TVCard from '../components/TVCard';
import axios from 'axios';
import TabFilter from '../components/TabFilter';
require('dotenv').config();

const movieDbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default function SearchResults({ user, setUser }) {

    const [movies, setMovies] = useState([]);
    const [tv, setTV] = useState([]);
    const [tab, setTab] = useState(["all"]);
    const search = user.query;
    const loading = user.searchLoad;

    const fetchData = (search) => {

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
                setUser({ ...user, searchLoad: false })
            })
        ).catch((error) => console.log(error));
    }

    useEffect(() => {
        if (loading && search !== "") {
            fetchData(search)
        }
    }, [search])

    if (loading && search !== "") { return 'Loading ...' }
    else if (loading) { return 'Please input a term' };
    return (
        <React.Fragment>
            <div className={'results'}>
                <h2>Searching {tab} Results: {search}</h2>
            </div>
            <TabFilter tab={tab} setTab={setTab} />
            <div className='result-container'>
            {tab === 'Movies' ?
                <>
                    {
                        movies.length > 0 ? movies.map((movie) =>
                        (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                        ) : <p>No movies found</p>
                    }
                </> :
                tab === 'TV shows' ?
                    <>{
                        tv.length > 0 ? tv.map((tv) => (
                            
                                <TVCard tv={tv} key={tv.id} />
                            
                        )) : <p>No TV shows found</p>
                    }
                    </> :
                    <>
                        
                        {
                            movies.length > 0 ? movies.map((movie) =>
                            (
                                <MovieCard movie={movie} key={movie.id} />
                            )
                            ) : <p>No movies found</p>
                        }

                        
                        {
                            tv.length > 0 ? tv.map((tv) => (
                                
                                    <TVCard tv={tv} key={tv.id} />
                                
                            )) : <p>No TV shows found</p>
                        }
                    </>
            }
            </div>

        </React.Fragment>
    )
}

