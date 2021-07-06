import React from 'react';

export default function MovieCard({ movie }) {
    return (
        <div className={'results-container'}>
            <div
                className={'card-info'}
                data-title={ movie.title }
                data-date={ movie.release_date }
                data-poster={movie.poster_path}
                data-id={ movie.id }
                data-type="movie"
                data-description={movie.overview}
            >
                <img src={movie.poster_path} alt="movie" className={'card-image'} />

                <div className={'title-date'}>
                    <div className={'card-title'}>{movie.title}</div>
                    <div className={'date'}>({movie.release_date})</div>
                </div>
                <div className={'description'}> {movie.overview} </div>

                <div className={'myRating'}></div>
            </div>
        </div>
    );
}
