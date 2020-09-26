import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function PlaylistListItem({ playlist }) {
  return (
    <div className="linkListItem">
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/playlist/${playlist.id}`}
      >
        <ListItem style={{ textAlign: "center" }}>
          <ListItemText
            primary={playlist.name}
            secondary={
              <Typography style={{ color: "#1db954", fontSize: 12 }}>
                {new Date(playlist.createdAt.slice(0, 10)).toDateString()}
              </Typography>
            }
          />
          {playlist.coverImg && (
            <img
              alt="playlist cover"
              className="artistImg"
              src={playlist.coverImg}
            />
          )}
        </ListItem>
      </Link>
    </div>
  );
}

export default PlaylistListItem;
