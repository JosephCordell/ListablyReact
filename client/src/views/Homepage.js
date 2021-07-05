import React from 'react'

export default function homepage () {
    return (

<React.Fragment>

<div class="p-4 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
        <h1 class="listably display-5 fw-bold">Listably</h1>
        <p class="col-md-8 fs-4">Use Listably to keep track of movies and shows you're watching or want to watch</p>
    </div>
</div>

<div class="container-xl">
    <div class="row row-cols-2">
        <div class="col p-2">
            <div class="container">
                <img src="assets/sample-movie.jpg" alt="Movie" class="image" />
                <div class="overlay">
                    <div class="col-lg text"><a href="/trending-movies" class="fancy">Movies</a></div>
                </div>
            </div>
        </div>

        <div class="col p-2">
            <div class="container">
                <img src="assets/sample-tv.jpg" alt="TV" class="image" />
                <div class="overlay">
                    <div class="col-lg text"><a href="/trending-tvshows" class="fancy">TV Shows</a></div>
                </div>
            </div>
        </div>
    </div>
</div>
</React.Fragment>

)
}