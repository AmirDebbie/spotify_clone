import React, { useEffect, useState } from "react";
import NavAppBar from "../NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import PlaylistListItem from "./PlaylistListItem";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("playlist");
      setPlaylists(data);
    })();
  }, []);
  return (
    <>
      <NavAppBar />
      <div className="subjectPage">
        <h1>All Playlists</h1>
        <List>
          {playlists.map((playlist) => (
            <PlaylistListItem key={playlist.id} playlist={playlist} />
          ))}
        </List>
      </div>
    </>
  );
}

export default Playlists;
