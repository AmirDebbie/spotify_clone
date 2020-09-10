import React, { useEffect, useState } from "react";
import NavAppBar from "./NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import AlbumListItem from "./AlbumListItem";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("album");
      setAlbums(data);
    })();
  }, []);
  return (
    <>
      <NavAppBar />
      <div className="subjectPage">
        <h1>All Albums</h1>
        <List>
          {albums.map((album) => (
            <AlbumListItem key={album.id} album={album} />
          ))}
        </List>
      </div>
    </>
  );
}

export default Albums;
