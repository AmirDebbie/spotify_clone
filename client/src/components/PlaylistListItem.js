import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function PlaylistListItem({ playlist }) {
  return (
    <div className='linkListItem'>
      <Link style={{ textDecoration: "none", color: 'white' }} to={`/playlist/${playlist.id}`}>
        <ListItem style={{ textAlign: "center" }}>
          <ListItemText
            primary={playlist.name}
            secondary={
              <Typography style={{ color: "#1db954", fontSize: 12 }}>
                {new Date(playlist.upload_at.slice(0, 10)).toDateString()}
              </Typography>
            }
          />
          {playlist.cover_img && (
            <img
              alt="playlist cover"
              className="artistImg"
              src={playlist.cover_img}
            />
          )}
        </ListItem>
      </Link>
    </div>
  );
}

export default PlaylistListItem;
