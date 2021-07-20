/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import TabFilter from '../components/TabFilter';
import API from '../js/API';

export default function User() {
    const [medias, setMedias] = useState(true);
    const [tab, setTab] = useState(['all']);

    useEffect(() => {
        const todoArr = JSON.parse(localStorage.getItem('todo'))
        if (todoArr === 'null') {
            setMedias(false);
        } else {
            API.media.get().then((response) => {
                if(!response){
                    return
                }
                response.forEach((element, index) => {
                    for (let i = 0; i < todoArr.length; i++) {
                        if (todoArr[i].id === element.id) {
                            response[index].todo = todoArr[i].todo;
                            break
                        }
                    }
                });
                setMedias(response);
            });
        }
    }, []);

    return (
        <React.Fragment>
            {/*            <aside>
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
            </aside> */}

            <TabFilter tab={tab} setTab={setTab} />

            <section>
                <div className="">
                    <UserList medias={medias} setMedias={setMedias} />
                </div>
            </section>
        </React.Fragment>
    );
}
