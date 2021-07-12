import React, { useState, useEffect } from 'react';
import TVCard from '../components/TVCard';
import axios from 'axios';
require('dotenv').config();

const key = process.env.REACT_APP_MOVIE_DB_API_KEY;
const URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${key}`

export default function TrendingTv({ tvResults }) {
const [tvShows, setTvShows] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
      await axios.get(URL).then((request) => {
          setTvShows(request.data.results);
          setLoading(false);
      });
  }
  fetchData();
}, []);

if (loading) return 'Loading...';
return (
  <React.Fragment>
    <div className={'results'}>
      <h2>Top 25 Trending TV Shows</h2>
    </div>
      
    {tvShows.map((tv) => (
      <TVCard tv={ tv } key={ tv.id }/>
    ))}
</React.Fragment>
);
};