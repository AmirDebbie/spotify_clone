import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "@material-ui/core";
import SongListItemAdmin from "./SongListItemAdmin";
import NavAppBar from "../NavAppBar";
import AlbumListItemAdmin from "./AlbumListItemAdmin";
import PlaylistListItemAdmin from "./PlaylistListItemAdmin";
import ArtistListItemAdmin from "./ArtistListItemAdmin";
import AddAlbumModal from "./AddModals/AddAlbumModal";
import AddArtistModal from "./AddModals/AddArtistModal";
import AddSongModal from "./AddModals/AddSongModal";
import AddPlaylistModal from "./AddModals/AddPlayListModal";
import { useCookies } from "react-cookie";

function Admin() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    // Get all artists
    (async () => {
      const { data } = await axios.get("top_artist", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setArtists(data);
    })();

    // Get all songs
    (async () => {
      const { data } = await axios.get("song", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setSongs(data);
    })();

    // Get all albums
    (async () => {
      const { data } = await axios.get("album", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setAlbums(data);
    })();

    // Get all playlists
    (async () => {
      const { data } = await axios.get("playlist", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setPlaylists(data);
    })();
  }, [cookies]);

  const getAlbums = async () => {
    const { data } = await axios.get("album", {
      headers: {
        Authorization: cookies.token,
      },
    });
    setAlbums(data);
  };

  const getArtists = async () => {
    const { data } = await axios.get("artist", {
      headers: {
        Authorization: cookies.token,
      },
    });
    setArtists(data);
  };

  const getSongs = async () => {
    const { data } = await axios.get("song", {
      headers: {
        Authorization: cookies.token,
      },
    });
    setSongs(data);
  };

  const getPlaylists = async () => {
    const { data } = await axios.get("playlist", {
      headers: {
        Authorization: cookies.token,
      },
    });
    setPlaylists(data);
  };

  return (
    <>
      <NavAppBar />
      <div className="grid-container">
        <div className="grid-item">
          <h2>All Songs</h2>
          <AddSongModal albums={albums} artists={artists} getSongs={getSongs} />
          <List>
            {songs.map((song) => (
              <SongListItemAdmin
                key={song.id}
                getSongs={getSongs}
                song={song}
              />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>All Albums</h2>
          <AddAlbumModal getAlbums={getAlbums} artists={artists} />
          <List>
            {albums.map((album) => (
              <AlbumListItemAdmin
                key={album.id}
                getAlbums={getAlbums}
                album={album}
              />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>All Artists</h2>
          <AddArtistModal getArtists={getArtists} />
          <List>
            {artists.map((artist) => (
              <ArtistListItemAdmin
                key={artist.id}
                getArtists={getArtists}
                artist={artist}
              />
            ))}
          </List>
        </div>
        <div className="grid-item">
          <h2>All Playlists</h2>
          <AddPlaylistModal getPlaylists={getPlaylists} />
          <List>
            {playlists.map((playlist) => (
              <PlaylistListItemAdmin
                key={playlist.id}
                getPlaylists={getPlaylists}
                playlist={playlist}
              />
            ))}
          </List>
        </div>
      </div>
    </>
  );
}

export default Admin;
