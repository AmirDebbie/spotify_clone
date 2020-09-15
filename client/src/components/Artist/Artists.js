import React, { useEffect, useState } from "react";
import NavAppBar from "../NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import NewArtistListItem from "../NewRequirements/NewArtistListItem";

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("artist");
      setArtists(data);
    })();
  }, []);
  return (
    <>
      <NavAppBar />
        <h1>All Artists</h1>
        <div style={styles.gridContainer}>
          {artists.map((artist) => (
            <NewArtistListItem key={artist.id} artist={artist} />
          ))}
        </div>
    </>
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridGap: 20
  }
}

export default Artists;
