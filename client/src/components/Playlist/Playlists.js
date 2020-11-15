import React, { useEffect, useState } from "react";
import NavAppBar from "../NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import PlaylistListItem from "./PlaylistListItem";
import { useCookies } from "react-cookie";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8080/playlist", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setPlaylists(data);
    })();
  }, [cookies]);
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
