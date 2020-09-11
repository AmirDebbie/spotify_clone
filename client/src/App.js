import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { List } from "@material-ui/core";
import ArtistListItem from "./components/ArtistListItem";
import SongListItem from "./components/SongListItem";
import NavAppBar from "./components/NavAppBar";
import AlbumListItem from "./components/AlbumListItem";
import PlaylistListItem from "./components/PlaylistListItem";

function App() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

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

    // Get all albums
    (async () => {
      const { data } = await axios.get("top_album");
      setAlbums(data);
    })();

    // Get all playlists
    (async () => {
      const { data } = await axios.get("top_playlist");
      setPlaylists(data);
    })();
  }, []);

  const handleInputChange = async (e) => {
    const search = e.target.value;
    const songsData = await axios.get(`song?search=${search}`);
    setSongs(songsData.data);
    const albumsData = await axios.get(`album?search=${search}`);
    setAlbums(albumsData.data);
    const artistsData = await axios.get(`artist?search=${search}`);
    setArtists(artistsData.data);
    const playlistsData = await axios.get(`playlist?search=${search}`);
    setPlaylists(playlistsData.data);
  }
  return (
    <>
      <NavAppBar />
      <div className="grid-container">
        <div className="grid-item">
          <h2>Top Songs</h2>
          <List>
            {songs.map((song) => (
              <SongListItem key={song.id} song={song} />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>Top Albums</h2>
          <List>
            {albums.map((album) => (
              <AlbumListItem key={album.id} album={album} />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>Top Artists</h2>
          <List>
            {artists.map((artist) => (
              <ArtistListItem key={artist.id} artist={artist} />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>Top Playlists</h2>
          <List>
            {playlists.map((playlist) => (
              <PlaylistListItem key={playlist.id} playlist={playlist} />
            ))}
          </List>
        </div>
      </div>
      <input onChange={handleInputChange} type='text' />
    </>
  );
}

export default App;
