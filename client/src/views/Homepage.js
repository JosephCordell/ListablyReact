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
            })
            .catch((error) => console.log(error));;
        }
        fetchData();
    }, []);

    if (loading) return 'Loading...';
    return (
        <React.Fragment>
                <h1>Listably</h1>
                <h3>Use Listably to keep track of movies and shows you're watching or want to watch</h3>
            <div id={'big-shell'}>
                    <div className={'home-container'}>
                        <img src= {`https://image.tmdb.org/t/p/w500${ trendingMovie.poster_path }`} alt="Movie" className={'image'}/>
                        <h1><a href="/trending-movies" className={'special-link'}>MOVIES</a></h1>
                    </div> 
                    <div className={'home-container'}>          
                        <img src= {`https://image.tmdb.org/t/p/w500${ trendingTv.poster_path }`} alt="TV" className={'image'} />    
                        <h1><a href="/trending-tv" className={'special-link'}>TV</a></h1>
                    </div>  
            </div>
        </React.Fragment>
    );
}
