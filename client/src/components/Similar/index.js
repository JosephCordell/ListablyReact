import React, {useState} from 'react';
import './style.css';
import RelatedModal from '../RelatedModal';

export default function Similar({ similarThing, type }) {
  const [displayModal, setDisplayModal] = useState(false);

  const openModal= () => {
    setDisplayModal(!displayModal)
  }
    return (
        <>
          <div className={'similar-card'}>
              <div 
                key={ similarThing.id + type}
                data-title={similarThing.name}
                data-poster={similarThing.poster_path}
                data-id={similarThing.id}
                data-type={type}
              />  
              <button onClick={openModal}><img src={`https://image.tmdb.org/t/p/w500${ similarThing.poster_path }`} alt="similarThing" className={'similar-image'} /></button>
              <RelatedModal displayModal={displayModal} setDisplayModal={setDisplayModal} id={similarThing.id} key={similarThing.id} type={type} media={{...similarThing, mediatype:type}}/>
          </div>                      
        </>
    );  
}
