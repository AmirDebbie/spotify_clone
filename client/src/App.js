import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { List } from '@material-ui/core'
import ArtistListItem from './components/ArtistListItem';
import SongListItem from './components/SongListItem';

function App() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Get all artists
    (async () => {
      const { data } = await axios.get("top_artist");
      setArtists(data);
    })();

    // Get all songs
    (async () => {
      const { data } = await axios.get("top_song");
      setSongs(data);
    })();

  }, [])

  return (
    <>
      <h1 className="home-title">SPOTIFY CLONE</h1>
      <div className='grid-container'>
        <div className='grid-item'>
          <h2>Top Songs</h2>
          <List>
            {songs.map(song => (
              <SongListItem key={song.id} song={song} />
            ))}
          </List>
        </div>
        <div className='grid-item'>
          <h2>Top Albums</h2>
        </div>
        <div className='grid-item'>
          <h2>Top Artists</h2>
          <List>
            {artists.map(artist => (
              <ArtistListItem key={artist.id} artist={artist} />
            ))}
          </List>
        </div>
        <div className='grid-item'>
          <h2>Top Playlists</h2>
        </div>
      </div>
    </>
  );
}

export default App;
