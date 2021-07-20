/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import TabFilter from '../components/TabFilter';
import API from '../js/API';

export default function User() {
    const [medias, setMedias] = useState(true);
    const [tab, setTab] = useState(['all']);

    useEffect(() => {
        const todoArr = JSON.parse(localStorage.getItem('todo'));
        if (todoArr === 'null') {
            setMedias(false);
        } else {
            API.media.get().then((response) => {
                if (!response) {
                    return;
                }
                response.forEach((element, index) => {
                    for (let i = 0; i < todoArr.length; i++) {
                        if (todoArr[i].id === element.id) {
                            response[index].todo = todoArr[i].todo;
                            break;
                        }
                    }
                });
                setMedias(response);
            });
        }
    }, []);

    return (
        <React.Fragment>
            <TabFilter tab={tab} setTab={setTab} />

            <section>
                <div className="">
                    <UserList medias={medias} tab={tab} setMedias={setMedias} />
                </div>
            </section>
        </React.Fragment>
    );
}
