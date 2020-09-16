import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { List } from "@material-ui/core";
import SongListItem from "./SongListItem";
import NavAppBar from "../NavAppBar";

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
        let { data } = await axios.get(`/song/${id}`);
        if (!data[0]) {
          setGoodRequest(false);
        }
        setSong(data[0]);
        if (query.get("artist")) {
          data = await axios.get(`/artistsongs/${query.get("artist")}`);
          setList(data.data);
          setPath("artist");
          setIdForObj(query.get("artist"));
        } else if (query.get("album")) {
          data = await axios.get(`/albumsongs/${query.get("album")}`);
          setList(data.data);
          setPath("album");
          setIdForObj(query.get("album"));
        } else if (query.get("playlist")) {
          data = await axios.get(`/playlistsongs/${query.get("playlist")}`);
          setList(data.data);
          setPath("playlist");
          setIdForObj(query.get("playlist"));
        } else {
          data = await axios.get(`/top_song`);
          setList(data.data);
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
