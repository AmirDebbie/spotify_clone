import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { List } from "@material-ui/core";
import NavAppBar from "../NavAppBar";
import SongListItem from "../Song/SongListItem";
import NotFound from "../NotFound/NotFound";
import { useCookies } from "react-cookie";


function SinglePlaylist() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [goodRequest, setGoodRequest] = useState(true);
  const [playlist, setPlaylist] = useState();
  const { id } = useParams();
  const [cookies] = useCookies();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/playlistsongs/${id}`, {
          headers: {
            Authorization: cookies.token,
          }
         });
        setPlaylistSongs(data);
        data = await axios.get(`/playlist/${id}`, {
          headers: {
            Authorization: cookies.token,
          }
         });
        if (!data.data[0]) {
          setGoodRequest(false);
        }
        setPlaylist(data.data[0]);
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
          {playlist && (
            <>
              <NavAppBar />
              <div className="subjectPage">
                <h1>{playlist.name}</h1>
                <p>{`Uploaded At ${new Date(
                  playlist.upload_at.slice(0, 10)
                ).toDateString()}`}</p>
                {playlist.cover_img && (
                  <img
                    alt="playlist"
                    style={{ height: 200 }}
                    src={playlist.cover_img}
                  />
                )}
                <List>
                  {playlistSongs.map((song) => (
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
