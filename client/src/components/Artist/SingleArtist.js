import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "../NavAppBar";
import SongListItem from "../Song/SongListItem";
import SquareAlbumListItem from "../Album/SquareAlbumListItem";
import Carousel from "react-elastic-carousel";
import NotFound from "../NotFound/NotFound";
import { useCookies } from "react-cookie";

function SingleArtist() {
  const [artist, setArtist] = useState();
  const [goodRequest, setGoodRequest] = useState(true);
  const { id } = useParams();
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/artist/${id}`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        if (!data) {
          setGoodRequest(false);
        }
        setArtist(data);
      } catch (e) {
        console.log(e.message);
        setGoodRequest(false);
      }
    })();
  }, [id, cookies]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2 },
    { width: 700, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];

  return (
    <div>
      {goodRequest ? (
        <div>
          {artist && (
            <>
              <NavAppBar />
              <div style={styles.container}>
                <h1>{artist.name}</h1>
                <p>{`Uploaded At ${new Date(
                  artist.createdAt.slice(0, 10)
                ).toDateString()}`}</p>
                {artist.coverImg && (
                  <img
                    alt="artist"
                    style={{ height: 200 }}
                    src={artist.coverImg}
                  />
                )}
                <div className="subjectPage">
                  <h2>Top Songs</h2>
                  <List>
                    {artist.Songs.slice(0, 5).map((song) => (
                      <SongListItem
                        query={{ path: "artist", id: artist.id }}
                        key={song.id}
                        song={song}
                      />
                    ))}
                  </List>
                </div>
                <div className="subjectArtistPage">
                  <br />
                  <br />
                  <h2>Albums</h2>
                  <Carousel Carousel color="white" breakPoints={breakPoints}>
                    {artist.Albums.map((album) => (
                      <SquareAlbumListItem key={album.id} album={album} />
                    ))}
                  </Carousel>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  container: {
    color: "white",
    textAlign: "center",
  },
};

export default SingleArtist;
