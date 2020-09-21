import React, { useEffect, useState } from "react";
import NavAppBar from "../NavAppBar";
import axios from "axios";
import SquareArtistListItem from "./SquareArtistListItem";
import { useCookies } from "react-cookie";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("artist", {
        headers: {
          Authorization: cookies.token,
        },
      });
      setArtists(data);
    })();
  }, [cookies]);
  return (
    <>
      <NavAppBar />
      <h1 style={{ color: "white", textAlign: "center" }}>All Artists</h1>
      <div style={styles.gridContainer}>
        {artists.map((artist) => (
          <SquareArtistListItem key={artist.id} artist={artist} />
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

export default Artists;
