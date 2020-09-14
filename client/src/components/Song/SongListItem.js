import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import YoutubeModal from "../YoutubeModal";

function SongListItem({ song }) {
  return (
    <div className="song-list-item">
      <Tooltip
        TransitionComponent={Zoom}
        placement="top"
        arrow
        title={new Date(song.created_at).toDateString()}
      >
        <ListItem style={{ textAlign: "center" }}>
          <ListItemText
            primary={song.title}
            secondary={
              <Typography style={{ color: "#1db954", fontSize: 12 }}>{`${
                song.artist
              } | ${song.album} | ${song.length.slice(3, 8)}`}</Typography>
            }
          />
          <YoutubeModal title={song.name} youtube_link={song.youtube_link} />
        </ListItem>
      </Tooltip>
    </div>
  );
}

export default SongListItem;
