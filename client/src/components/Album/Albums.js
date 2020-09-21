import React, { useEffect, useState } from "react";
import NavAppBar from "../NavAppBar";
import axios from "axios";
import SquareAlbumListItem from "./SquareAlbumListItem";
import { useCookies } from "react-cookie";


function Albums() {
  const [albums, setAlbums] = useState([]);
  const [cookies] = useCookies();


  useEffect(() => {
    (async () => {
      const { data } = await axios.get("album", {
        headers: {
          Authorization: cookies.token,
        }
       });
      setAlbums(data);
    })();
  }, []);
  return (
    <>
      <NavAppBar />
      <h1 style={{ color: "white", textAlign: "center" }}>All Albums</h1>
      <div style={styles.gridContainer}>
        {albums.map((album) => (
          <SquareAlbumListItem key={album.id} album={album} />
        ))}
      </div>
    </>
  );
}

const styles = {
  gridContainer: {
    width: "80%",
    marginLeft: "4%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridGap: 30,
  },
};

export default Albums;
