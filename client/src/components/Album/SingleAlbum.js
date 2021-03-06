import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "../NavAppBar";
import SongListItem from "../Song/SongListItem";
import { useCookies } from "react-cookie";
import NotFound from "../NotFound/NotFound";

function SingleAlbum() {
  const [goodRequest, setGoodRequest] = useState(true);
  const [album, setAlbum] = useState();
  const { id } = useParams();
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/album/${id}`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        setAlbum(data);
        // data = await axios.get(`/album/${id}`, {
        //   headers: {
        //     Authorization: cookies.token,
        //   },
        // });
        // if (!data.data[0]) {
        //   setGoodRequest(false);
        // }
        // setAlbum(data.data[0]);
      } catch (e) {
        console.log(e.message);
        setGoodRequest(false);
      }
    })();
  }, [id, cookies]);

  return (
    <div>
      {goodRequest ? (
        <div>
          {album && (
            <>
              <NavAppBar />
              <div className="subjectPage">
                <h1>{album.name}</h1>
                <p>{`${album.Artist.name} | ${new Date(
                  album.createdAt.slice(0, 10)
                ).toDateString()}`}</p>
                {album.coverImg && (
                  <img
                    alt="album"
                    style={{ height: 200, width: 200 }}
                    src={album.coverImg}
                  />
                )}
                <List>
                  {album.Songs.map((song) => (
                    <SongListItem
                      query={{ path: "album", id: album.id }}
                      key={song.id}
                      song={song}
                    />
                  ))}
                </List>
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

export default SingleAlbum;
