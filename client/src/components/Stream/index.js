import React, { useState, useEffect } from 'react'
import './style.css';
import axios from 'axios';

const movieDbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export default function Stream({ movieID, tvID }) {
    const [stream, setStream] = useState({
        link: null
    })
    const [provider, setProvider] = useState([]);
    const [movie, setMovie] = useState(false)
    const [tv, setTV] = useState(false)
    
    
    const streamMovieAPI = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${movieDbApiKey}`
    const movieResults = (movieID) => {
        axios.get(streamMovieAPI).then((request) => {
            setMovie(true)
            setStream({ ...request.data.results.US })
        });
    }

    const streamTVAPI = `https://api.themoviedb.org/3/tv/${tvID}/watch/providers?api_key=${movieDbApiKey}`
    const tvResults = (tvID) => {
        axios.get(streamTVAPI).then((request) => {
            setTV(true)
            setStream({ ...request.data.results.US })
        });
    }

    useEffect(() => {

        axios.get(streamMovieAPI).then((request) => {
            setStream({ ...request.data.results.US })
        });
        axios.get(streamTVAPI).then((request) => {
            setStream({ ...request.data.results.US })
        });
    }, [])


    useEffect(() => {
        const keys = Object.keys(stream);
        // console.log(keys);
        keys.forEach((key) => {
            if (key !== "link") {
                const providerArr = [];
                stream[key].forEach((element) => {
                    console.log(element);
                    if(element.logo_path !== ''){
                    providerArr.push(element.logo_path)
                    }else{
                        return
                    }
                })
                setProvider(providerArr)
            }
        })

    }, [stream]);



    return (

        <React.Fragment>
            {provider.map(logo => <img src={`https://image.tmdb.org/t/p/original/${logo}`} alt="provider_logo" className={'provider-logo'} key={logo}/>)}
        </React.Fragment>
    )
}

// .US.flatrate_and_buy[0].provider_name