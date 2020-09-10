import React, { useEffect, useState } from "react";
import NavAppBar from "./NavAppBar";
import axios from "axios";
import { List } from "@material-ui/core";
import ArtistListItem from "./ArtistListItem";

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
      <div className="subjectPage">
        <h1>All Artists</h1>
        <List>
          {artists.map((artist) => (
            <ArtistListItem key={artist.id} artist={artist} />
          ))}
        </List>
      </div>
    </>
  );
}

export default Artists;
