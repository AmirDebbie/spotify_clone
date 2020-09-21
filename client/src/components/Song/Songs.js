import React, { useEffect, useState } from "react";
import NavAppBar from "../NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import SongListItem from "./SongListItem";
import { useCookies } from "react-cookie";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("song", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setSongs(data);
    })();
  }, [cookies]);
  return (
    <>
      <NavAppBar />
      <div className="subjectPage">
        <h1>All Songs</h1>
        <List>
          {songs.map((song) => (
            <SongListItem
              query={{ path: "top_song", id: "true" }}
              key={song.id}
              song={song}
            />
          ))}
        </List>
      </div>
    </>
  );
}

export default Songs;
