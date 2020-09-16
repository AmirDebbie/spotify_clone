import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "../NavAppBar";
import SongListItem from "../Song/SongListItem";
import NotFound from "../NotFound/NotFound";

function SingleAlbum() {
  const [albumSongs, setAlbumSongs] = useState([]);
  const [goodRequest, setGoodRequest] = useState(true);
  const [album, setAlbum] = useState();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/albumsongs/${id}`);
        setAlbumSongs(data);
        data = await axios.get(`/album/${id}`);
        if (!data.data[0]) {
          setGoodRequest(false);
        }
        setAlbum(data.data[0]);
        console.log(data.data[0]);
      } catch (e) {
        console.log(e.message);
        setGoodRequest(false);
      }
    })();
  }, [id]);

  return (
    <div>
      {goodRequest ? (
        <div>
          {album && (
            <>
              <NavAppBar />
              <div className="subjectPage">
                <h1>{album.name}</h1>
                <p>{`${album.artist} | ${new Date(
                  album.created_at.slice(0, 10)
                ).toDateString()}`}</p>
                {album.cover_img && (
                  <img
                    alt="album"
                    style={{ height: 200, width: 200 }}
                    src={album.cover_img}
                  />
                )}
                <List>
                  {albumSongs.map((song) => (
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
