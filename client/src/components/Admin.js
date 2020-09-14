import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "@material-ui/core";
import SongListItemAdmin from "./SongListItemAdmin";
import NavAppBar from "./NavAppBar";
import AlbumListItemAdmin from "./AlbumListItemAdmin";
import PlaylistListItemAdmin from "./PlaylistListItemAdmin";
import ArtistListItemAdmin from "./ArtistListItemAdmin";
import AddAlbumModal from "./AddAlbumModal";
import AddArtistModal from "./AddArtistModal";
import AddSongModal from "./AddSongModal";
import AddPlaylistModal from "./AddPlayListModal";

function Admin() {
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
      const { data } = await axios.get("song");
      setSongs(data);
    })();

    // Get all albums
    (async () => {
      const { data } = await axios.get("album");
      setAlbums(data);
    })();

    // Get all playlists
    (async () => {
      const { data } = await axios.get("playlist");
      setPlaylists(data);
    })();
  }, []);

  const getAlbums = async () => {
    const { data } = await axios.get("album");
    setAlbums(data);
  }

  const getArtists = async () => {
    const { data } = await axios.get("artist");
    setArtists(data);
  }

  const getSongs = async () => {
    const { data } = await axios.get("song");
    setSongs(data);
  }

  const getPlaylists = async () => {
    const { data } = await axios.get("playlist");
    setPlaylists(data);
  }

  return (
    <>
      <NavAppBar />
      <div className="grid-container">
        <div className="grid-item">
          <h2>Top Songs</h2>
          <AddSongModal getSongs={getSongs} />
          <List>
            {songs.map((song) => (
              <SongListItemAdmin key={song.id} getSongs={getSongs} song={song} />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>Top Albums</h2>
          <AddAlbumModal getAlbums={getAlbums}/>
          <List>
            {albums.map((album) => (
              <AlbumListItemAdmin key={album.id} getAlbums={getAlbums} album={album} />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>Top Artists</h2>
          <AddArtistModal getArtists={getArtists} />
          <List>
            {artists.map((artist) => (
              <ArtistListItemAdmin key={artist.id} getArtists={getArtists} artist={artist} />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>Top Playlists</h2>
          <AddPlaylistModal getPlaylists={getPlaylists} />
          <List>
            {playlists.map((playlist) => (
              <PlaylistListItemAdmin key={playlist.id} getPlaylists={getPlaylists} playlist={playlist} />
            ))}
          </List>
        </div>
      </div>
    </>
  );
}

export default Admin;
