import React from 'react';
import sampleMovie from '../images/sample-movie.jpg';
import sampleTV from '../images/sample-tv.jpg';

export default function homepage() {
    return (
        <React.Fragment>
            <div className={'p-4 mb-4 bg-light rounded-3'}>
                <div className={'container-fluid py-5'}>
                    <h1 className={'listably display-5 fw-bold'}>Listably</h1>
                    <p className={'col-md-8 fs-4'}>Use Listably to keep track of movies and shows you're watching or want to watch</p>
                </div>
            </div>

            <div className={'container-xl'}>
                <div className={'row row-cols-2'}>
                    <div className={'col p-2'}>
                        <div className={'container'}>
                            <img src= {sampleMovie} alt="Movie" className={'image'} />
                            <div className={'overlay'}>
                                <div className={'col-lg text'}>
                                    <a href="/trending-movies" className={'fancy'}>
                                        Movies
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'col p-2'}>
                        <div className={'container'}>

                            <img src= {sampleTV} alt="TV" className={'image'} />
                            <div className={'overlay'}>
                                <div className={'col-lg text'}>
                                    <a href="/trending-tvshows" className={'fancy'}>
                                        TV Shows
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
