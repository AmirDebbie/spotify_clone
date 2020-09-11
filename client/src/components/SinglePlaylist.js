import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "./NavAppBar";
import SongListItem from "./SongListItem";

function SinglePlaylist() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlist, setPlaylist] = useState();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/playlistsongs/${id}`);
      setPlaylistSongs(data);
    })();

    (async () => {
      const { data } = await axios.get(`/playlist/${id}`);
      setPlaylist(data[0]);
    })();
  }, [id]);

  return (
    <div>
      {playlist && (
        <>
          <NavAppBar />
          <div className="subjectPage">
            <h1>{playlist.name}</h1>
            <p>{`Uploaded At ${new Date(playlist.upload_at.slice(0, 10)).toDateString()}`}</p>
            <img alt='playlist' style={{height: 200}} src={playlist.cover_img} />
            <List>
              {playlistSongs.map((song) => (
                <SongListItem key={song.id} song={song} />
              ))}
            </List>
          </div>
        </>
      )}
    </div>
  );
}

export default SinglePlaylist;
