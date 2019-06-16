import React from "react"; 

const ArtistListItem = ({ artist, handleOnClick }) => (
  <li className="artists-list-item">
    {artist.name} - {artist.genre}
    <button
      className="artists-list-button"
      type="button"
      onClick={event => handleOnClick(event, artist._id)}
    >
      X
    </button>
  </li>
);

export default ArtistListItem;