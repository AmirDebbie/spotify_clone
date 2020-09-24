import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { List } from "@material-ui/core";
import SongListItem from "./SongListItem";
import NavAppBar from "../NavAppBar";
import { useCookies } from "react-cookie";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SingleSong() {
  const query = useQuery();
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [list, setList] = useState([]);
  const [idForObj, setIdForObj] = useState();
  const [path, setPath] = useState();
  const [goodRequest, setGoodRequest] = useState(true);
  const [cookies] = useCookies();

  const video_id = useMemo(() => {
    let youtube_link = song.youtube_link;
    if (youtube_link) {
      let video_id = youtube_link.split("v=")[1];
      if (video_id) {
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
      }
      return video_id;
    }
  }, [song]);

  useEffect(() => {
    (async () => {
      try {
        const { data: song } = await axios.get(`/song/${id}`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        if (!song) {
          setGoodRequest(false);
        }
        setSong(song);
        if (query.get("artist")) {
          const { data: artist } = await axios.get(`/artist/${query.get("artist")}`, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setList(artist.Songs);
          setPath("artist");
          setIdForObj(query.get("artist"));
        } else if (query.get("album")) {
          const { data: album } = await axios.get(`/album/${query.get("album")}`, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setList(album.Songs);
          setPath("album");
          setIdForObj(query.get("album"));
        } else if (query.get("playlist")) {
          const { data: playlist } = await axios.get(`/playlist/${query.get("playlist")}`, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setList(playlist.Playlists_songs);
          setPath("playlist");
          setIdForObj(query.get("playlist"));
        } else {
          const { data: topSongs } = await axios.get(`/song/top`, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setList(topSongs);
        }
      } catch (e) {
        console.log(e.message);
        setGoodRequest(false);
      }
    })();
    // eslint-disable-next-line
  }, [id]);

  return goodRequest ? (
    <>
      <NavAppBar />
      {song.title && (
        <div style={styles.gridContainer}>
          <iframe
            title={song.title}
            width="100%"
            height="600"
            src={`https://www.youtube.com/embed/${video_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <List>
            {list.map((listSong) => (
              <SongListItem
                query={{ path: path, id: idForObj }}
                key={listSong.id}
                song={listSong}
              />
            ))}
          </List>
        </div>
      )}
    </>
  ) : (
    <NotFound />
  );
}

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
  },
};

export default SingleSong;
