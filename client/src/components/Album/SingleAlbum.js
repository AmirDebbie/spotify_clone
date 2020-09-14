import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "../NavAppBar";
import SongListItem from "../Song/SongListItem";

function SingleAlbum() {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [album, setAlbum] = useState();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/albumsongs/${id}`);
      setAlbumSongs(data);
    })();

    (async () => {
      const { data } = await axios.get(`/album/${id}`);
      setAlbum(data[0]);
    })();
  }, [id]);

  return (
    <div>
      {album && (
        <>
          <NavAppBar />
          <div className="subjectPage">
            <h1>{album.name}</h1>
            <p>{`${album.artist} | ${new Date(
              album.created_at.slice(0, 10)
            ).toDateString()}`}</p>
            {album.cover_img && (
              <img
                alt="album"
                style={{ height: 200, width: 200 }}
                src={album.cover_img}
              />
            )}
            <List>
              {albumSongs.map((song) => (
                <SongListItem key={song.id} song={song} />
              ))}
            </List>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleAlbum;
