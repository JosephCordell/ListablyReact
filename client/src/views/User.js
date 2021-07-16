/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';

export default function User() {
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('todo') === null) {
            console.log('no local storage');
            setMedias(false);
        } else {
            console.log(localStorage.getItem('todo'));

            const midas =localStorage.getItem('todo')
            console.log(`midus:`, midas);
           const fetchData = async () => {
                console.log('made it to the fetch');
                await fetch('/api/media/todo', {
                    method: 'POST',
                    body: midas,
                    headers: { 'Content-type': 'application/json' },
                })
                .then((response) => response.json())
                .then((data) => {
                    setMedias(data.media)
                    console.log(`here is the data`);
                    console.log(data.media);
                })

            }; 
            fetchData();
        }
    }, []);

    return (
        <React.Fragment>
            <aside>
                <div className="h-100 d-flex flex-column p-3 bg-light" style={{ width: '280px' }}>
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <span className="fs-4">My Lists</span>
                    </a>
                    <div>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <a href="" className="nav-link link-dark" id="filter-all">
                                    Show All
                                </a>
                            </li>
                            <li>
                                <a href="" className="nav-link link-dark" id="filter-movie">
                                    Movies
                                </a>
                            </li>
                            <li>
                                <a href="" className="nav-link link-dark" id="filter-tv">
                                    TV Shows
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            <section>
                <div className="col row-cols-12">

                    <UserList medias={medias} />
                </div>
            </section>
        </React.Fragment>
    );
}
