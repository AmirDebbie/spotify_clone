import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

function NewSongListItem({ query, song }) {
  return (
    <Link to={`/song/${song.id}?${query.path}=${query.id}`} style={{ textDecoration: "none", color: "white" }}>
    <div className="newSongGrid">
      <div>
        <Tooltip
          TransitionComponent={Zoom}
          placement="top"
          arrow
          title={new Date(song.created_at).toDateString()}
        >
        <h3>{song.title}</h3>
        </Tooltip>
          <PlayCircleFilledIcon style={{ color: "white", fontSize: 150 }} />
      </div>
      <div>
        <p style={{ fontSize: 15, color: "#1db954" }}>{`${song.artist} | ${
          song.album
        } | ${song.length.slice(3, 8)}`}</p>
      </div>
    </div>
    </Link>
  );
}

export default NewSongListItem;
