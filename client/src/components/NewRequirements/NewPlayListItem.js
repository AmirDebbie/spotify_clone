import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NewPlaylistListItem({ playlist }) {
  return (
    <div className="linkListItem">
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/playlist/${playlist.id}`}
      >
          <div className='newAlbumGrid'>
            <h3>{playlist.name}</h3>
              <div>
            {playlist.cover_img && (
            <img
              alt="Go To Playlist"
              className="bigImg"
              src={playlist.cover_img}
            /> )}</div>
            <p style={{ fontSize: 15, color: "#1db954" }}>{`${new Date(playlist.upload_at.slice(0, 10)).toDateString()}`}</p>
            </div>
      </Link>
    </div>
  );
}

export default NewPlaylistListItem;
