import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "../NavAppBar";
import SongListItem from "../Song/SongListItem";
import NotFound from "../NotFound/NotFound";
import { useCookies } from "react-cookie";

function SinglePlaylist() {
  const [goodRequest, setGoodRequest] = useState(true);
  const [playlist, setPlaylist] = useState();
  const { id } = useParams();
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/playlist/${id}`,
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        );
        if (!data) {
          setGoodRequest(false);
        }
        setPlaylist(data);
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
          {playlist && (
            <>
              <NavAppBar />
              <div className="subjectPage">
                <h1>{playlist.name}</h1>
                <p>{`Created At ${new Date(
                  playlist.createdAt.slice(0, 10)
                ).toDateString()}`}</p>
                {playlist.coverImg && (
                  <img
                    alt="playlist"
                    style={{ height: 200 }}
                    src={playlist.coverImg}
                  />
                )}
                <List>
                  {playlist.Playlists_songs.map((song) => (
                    <SongListItem
                      query={{ path: "playlist", id: playlist.id }}
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

export default SinglePlaylist;
