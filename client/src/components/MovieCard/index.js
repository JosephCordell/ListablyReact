import React from 'react';
import ChangeStatus from '../ChangeStatus';

export default function MovieCard({ movie }) {
    return (
        <div key={movie.id} className={'results-container'}>
            {console.log(movie)}
            <div
                className={'card-info'}
                data-title={movie.title}
                data-date={movie.release_date}
                data-poster={movie.poster_path}
                data-id={movie.id}
                data-type="movie"
                data-description={movie.overview}
            >
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" className={'card-image'} />

                <div  className={'title-date'}>
                    <div className={'card-title'}>{movie.title}</div>
                    <div className={'date'}>({movie.release_date})</div>
                </div>
                <div className={'description'}> {movie.overview} </div>

                <div className={'myRating'}></div>
            < ChangeStatus />
            </div>

        </div>
    );
}
