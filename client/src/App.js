import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("top_artist");
      setArtists(data);
    })()
  }, [])

  return (
    <div className='grid-container'>
      <div className='grid-item'>
        <h1>Songs</h1>
      </div>
      <div className='grid-item'>
        <h1>Albums</h1>
      </div>
      <div className='grid-item'>
        <h1>Artists</h1>
        <ul>
          {artists.map(artist => (
            <li>{artist.name}</li>
          ))}
        </ul>
      </div>
      <div className='grid-item'>
        <h1>Playlists</h1>
      </div>
    </div>
  );
}

export default App;
