import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'

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
        <List>
          {artists.map(artist => (
            <ListItem style={{textAlign: "center"}}>
              <ListItemText 
                primary={artist.name}
                secondary={<Typography style={{ color: '#1db954', fontSize: 12 }}>{new Date(artist.upload_at.slice(0, 10)).toDateString()}</Typography>}
                sec
              />
              <img className='artistImg' src={artist.cover_img} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className='grid-item'>
        <h1>Albums</h1>
        <List>
          {artists.map(artist => (
            <ListItem style={{textAlign: "center"}}>
              <ListItemText 
                primary={artist.name}
                secondary={<Typography style={{ color: '#1db954', fontSize: 12 }}>{new Date(artist.upload_at.slice(0, 10)).toDateString()}</Typography>}
                sec
              />
              <img className='artistImg' src={artist.cover_img} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className='grid-item'>
        <h1>Artists</h1>
        <List>
          {artists.map(artist => (
            <ListItem style={{textAlign: "center"}}>
              <ListItemText 
                primary={artist.name}
                secondary={<Typography style={{ color: '#1db954', fontSize: 12 }}>{new Date(artist.upload_at.slice(0, 10)).toDateString()}</Typography>}
                sec
              />
              <img alt='Artist Cover' className='artistImg' src={artist.cover_img} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className='grid-item'>
        <h1>Playlists</h1>
        <List>
          {artists.map(artist => (
            <ListItem style={{textAlign: "center"}}>
              <ListItemText 
                primary={artist.name}
                secondary={<Typography style={{ color: '#1db954', fontSize: 12 }}>{new Date(artist.upload_at.slice(0, 10)).toDateString()}</Typography>}
                sec
              />
              <img className='artistImg' src={artist.cover_img} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
