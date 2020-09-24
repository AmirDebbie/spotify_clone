import React from "react";
import { Link } from "react-router-dom";

function NewPlaylistListItem({ playlist }) {
  return (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      to={`/playlist/${playlist.id}`}
    >
      <div className="newAlbumGrid">
        <div>
          {playlist.cover_img && (
            <img
              alt="Go To Playlist"
              className="bigImg"
              src={playlist.cover_img}
            />
          )}
        </div>
        <div style={{ height: 20, marginBottom: 20, marginTop: 5 }}>
          <h3 style={{ margin: 0 }}>{playlist.name}</h3>
        </div>
        <p
          style={{ fontSize: 15, color: "#999", fontWeight: "bold" }}
        >{`${new Date(playlist.createdAt.slice(0, 10)).toDateString()}`}</p>
      </div>
    </Link>
  );
}

export default NewPlaylistListItem;
