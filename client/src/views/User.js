import React from 'react';
import UserList from '../components/UserList';

export default function User() {
    return (
        <React.Fragment>
            <aside>
                <div className="h-100 d-flex flex-column p-3 bg-light"  style={{"width": "280px"}} >
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
                    <UserList />
                </div>
            </section>
        </React.Fragment>
    );
}
