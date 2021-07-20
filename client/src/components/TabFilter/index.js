import React from 'react';
import './style.css';

const types = ['All', 'Movies', 'TV shows'];

export default function TabFilter({ tab, setTab }) {
    return (
        <React.Fragment>
            {types.map((type) => (
                <button className="tab" key={type} onClick={() => setTab(type)}>
                    {type}
                </button>
            ))}
        </React.Fragment>
    );
}
