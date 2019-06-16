import React from 'react';
import ArtistsListItem from './artists-list-item';

const ArtistsList = ({artists, handleOnClick}) => artists.map(artist => (
    <ul key={artist._id}>
        <ArtistsListItem artist={artist} handleOnClick={handleOnClick}/>
    </ul>
  ));

  export default ArtistsList;