import React, { useState, useEffect } from "react";
import axios from "axios";
import SquareArtistListItem from "./Artist/SquareArtistListItem";
import SquareSongListItem from "./Song/SquareSongListItem";
import NavAppBar from "./NavAppBar";
import SquareAlbumListItem from "./Album/SquareAlbumListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Carousel from "react-elastic-carousel";
import SquarePlaylistListItem from "./Playlist/SquarePlaylistListItem";

function HomePage() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  let timer;

  useEffect(() => {
    // Get all artists
    (async () => {
      try {
        const { data } = await axios.get("top_artist");
        setArtists(data);
      } catch (e) {
        console.log(e.message);
      }
    })();

    // Get all songs
    (async () => {
      try {
        const { data } = await axios.get("top_song");
        setSongs(data);
      } catch (e) {
        console.log(e.message);
      }
    })();

    // Get all albums
    (async () => {
      try {
        const { data } = await axios.get("top_album");
        setAlbums(data);
      } catch (e) {
        console.log(e.message);
      }
    })();

    // Get all playlists
    (async () => {
      try {
        const { data } = await axios.get("top_playlist");
        setPlaylists(data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const handleInputTimer = (e) => {
    if (timer) {
      console.log(e.target.value);
      clearTimeout(timer);
    }
    if (!loading) {
      setLoading(true);
    }
    const search = e.target.value;
    timer = setTimeout(() => {
      handleInputChange(search);
    }, 2000);
  };

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
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 510, itemsToShow: 2, itemsToScroll: 2 },
    { width: 770, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1040, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1280, itemsToShow: 5, itemsToScroll: 5 },
  ];
  return (
    <>
      <NavAppBar />
      <div style={{ textAlign: "center" }}>
        <input
          placeholder="Search"
          className="searchInput"
          onChange={handleInputTimer}
          type="text"
        />
        {loading && (
          <CircularProgress
            style={{ color: "white", marginTop: 10, position: "absolute" }}
          />
        )}
      </div>
      <h2 className="listTitle">Top Songs</h2>
      <div style={{ padding: 20 }}>
        <Carousel breakPoints={breakPoints}>
          {songs.map((song) => (
            <SquareSongListItem
              query={{ path: "top-song", id: "true" }}
              key={song.id}
              song={song}
            />
          ))}
        </Carousel>
      </div>
      <br />
      <br />
      <h2 className="listTitle">Top Albums</h2>
      <div style={{ padding: 20 }}>
        <Carousel color="white" breakPoints={breakPoints}>
          {albums.map((album) => (
            <SquareAlbumListItem key={album.id} album={album} />
          ))}
        </Carousel>
      </div>
      <br />
      <br />
      <h2 className="listTitle">Top Artists</h2>
      <div style={{ padding: 20 }}>
        <Carousel breakPoints={breakPoints}>
          {artists.map((artist) => (
            <SquareArtistListItem key={artist.id} artist={artist} />
          ))}
        </Carousel>
      </div>
      <br />
      <br />
      <h2 className="listTitle">Top Playlists</h2>
      <div style={{ padding: 20 }}>
        <Carousel breakPoints={breakPoints}>
          {playlists.map((playlist) => (
            <SquarePlaylistListItem key={playlist.id} playlist={playlist} />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default HomePage;
