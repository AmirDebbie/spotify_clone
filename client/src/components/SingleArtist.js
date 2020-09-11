import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "./NavAppBar";
import SongListItem from "./SongListItem";
import AlbumListItem from "./AlbumListItem"

function SingleArtist() {
  const [artistSongs, setArtistSongs] = useState([]);
  const [artist, setArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/artistsongs/${id}`);
      setArtistSongs(data);
    })();

    (async () => {
        const { data } = await axios.get(`/artistalbums/${id}`);
        setArtistAlbums(data);
      })();

    (async () => {
      const { data } = await axios.get(`/artist/${id}`);
      setArtist(data[0]);
    })();
  }, [id]);

  return (
    <div>
      {artist && (
        <>
          <NavAppBar />
          <div style={styles.container}>
            <h1>{artist.name}</h1>
            <p>{`Uploaded At ${new Date(artist.upload_at.slice(0, 10)).toDateString()}`}</p>
            <img alt='artist' style={{height: 200}} src={artist.cover_img} />
            <div style={styles.gridContainer}>
                <div className="subjectArtistPage">
                    <h2>Albums</h2>
                    <List>
                    {artistAlbums.map((album) => (
                        <AlbumListItem key={album.id} album={album} />
                    ))}
                    </List>
                </div>
                <div className="subjectArtistPage">
                    <h2>Songs</h2>
                    <List>
                    {artistSongs.map((song) => (
                        <SongListItem key={song.id} song={song} />
                    ))}
                    </List>
                </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr"
    },
    container: {
        color: 'white',
        textAlign: 'center'
    }
}

export default SingleArtist;
