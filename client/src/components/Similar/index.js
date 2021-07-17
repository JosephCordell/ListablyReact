import React from 'react';
import './style.css';

export default function Similar({ similarThing }) {
    return (
        <>
          <div className={'similar-card'}>
              <div 
                key={ similarThing.id }
                data-title={similarThing.name}
                data-poster={similarThing.poster_path}
                data-id={similarThing.id}
              />  
              <img src={`https://image.tmdb.org/t/p/w500${ similarThing.poster_path }`} alt="similarThing" className={'similar-image'} />
          </div>                      
        </>
    );  
}
