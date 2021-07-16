import React from 'react';
import ChangeStatus from '../ChangeStatus';
import Stream from '../Stream';
import ReadMore from '../ReadMore';
import './style.css';

export default function TVCard({ tv }) {
    return (
        <>
            <div className={'results-container'}>
                <div
                    key={ tv.id }
                    className={'card-info'}
                    data-title={tv.name}
                    data-date={tv.release_date}
                    data-poster={tv.poster_path}
                    data-id={tv.id}
                    data-description={tv.overview}
                >
                    <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="tv" className={'card-image'} />

                    <div className={'title-date card-title'}>{tv.name}</div>

                    <div className={'description'}> <ReadMore text={tv.overview}>{tv.overview} </ReadMore> </div>
                    <Stream tvID={tv.id} key={tv.id}/>
                    <div className={'myRating'}></div>
                    < ChangeStatus media={ tv }/>
                </div>
            </div>
        </>
    );
}
