import React from 'react';

export default function index({ tv }) {
    return (
        <React.Fragment>
            <div className={'results-container'}>
                <div
                    className={'card-info'}
                    data-title={tv.name}
                    data-date={tv.release_date}
                    data-poster={tv.poster_path}
                    data-id={tv.id}
                    data-type="tv"
                    data-description={tv.overview}
                >
                    <img src={tv.poster_path} alt="tv" className={'card-image'} />

                    <div className={'title-date card-title'}>{tv.name}</div>

                    <div className={'description'}> {tv.overview} </div>

                    <div className={'myRating'}></div>
                </div>
            </div>
        </React.Fragment>
    );
}
