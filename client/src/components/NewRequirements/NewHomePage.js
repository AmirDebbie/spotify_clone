import React, { useState, useEffect } from "react";
import axios from "axios";
import NewArtistListItem from "./NewArtistListItem";
import NewSongListItem from "./NewSongListItem";
import NavAppBar from "../NavAppBar";
import NewAlbumListItem from "./NewAlbumListItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import Carousel from 'react-elastic-carousel';
import NewPlaylistListItem from "./NewPlayListItem";

function NewHomePage() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  let timer;

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

  const handleInputTimer = (e) => {
    if(timer) {
      console.log(e.target.value)
      clearTimeout(timer);
    }
    if (!loading) {
      setLoading(true);
    }
    const search = e.target.value;
    timer = setTimeout(() => { handleInputChange(search) }, 2000)
  }

  const handleInputChange = async (search) => {
    const songsData = await axios.get(`song?search=${search}`);
    setSongs(songsData.data);
    const albumsData = await axios.get(`album?search=${search}`);
    setAlbums(albumsData.data);
    const artistsData = await axios.get(`artist?search=${search}`);
    setArtists(artistsData.data);
    const playlistsData = await axios.get(`playlist?search=${search}`);
    setPlaylists(playlistsData.data);
    setLoading(false);
  }

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2 },
    { width: 700, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ]
  return (
    <>
      <NavAppBar />
      <div style={{textAlign: 'center'}}>
        <input placeholder='Search' className='searchInput' onChange={handleInputTimer} type='text' />
        {loading && <CircularProgress style={{ color: 'white', marginTop: 10, position: 'absolute'}} />}
      </div>
          <h2 className='listTitle'>Top Songs</h2>
          <Carousel color="white" breakPoints={breakPoints}>
            {songs.map((song) => (
              <NewSongListItem query={{path: 'top-song', id: 'true'}} key={song.id} song={song} />
            ))}
          </Carousel>
          <br /><br />
          <h2 className='listTitle'>Top Albums</h2>
          <Carousel color="white" breakPoints={breakPoints}>
            {albums.map((album) => (
              <NewAlbumListItem key={album.id} album={album} />
            ))}
          </Carousel>
          <br /><br />
          <h2 className='listTitle'>Top Artists</h2>
          <Carousel color="white" breakPoints={breakPoints}>
            {artists.map((artist) => (
              <NewArtistListItem key={artist.id} artist={artist} />
            ))}
          </Carousel>
          <br /><br />
          <h2 className='listTitle'>Top Playlists</h2>
          <Carousel color="white" breakPoints={breakPoints}>
            {playlists.map((playlist) => (
              <NewPlaylistListItem key={playlist.id} playlist={playlist} />
            ))}
          </Carousel>
    </>
  );
}

export default NewHomePage;
