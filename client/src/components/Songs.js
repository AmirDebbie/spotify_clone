import React, { useEffect, useState } from "react";
import NavAppBar from "./NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import SongListItem from "./SongListItem";

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("song");
      setSongs(data);
    })();
  }, []);
  return (
    <>
      <NavAppBar />
      <div className="subjectPage">
        <h1>All Songs</h1>
        <List>
          {songs.map((song) => (
            <SongListItem key={song.id} song={song} />
          ))}
        </List>
      </div>
    </>
  );
}

export default Songs;
