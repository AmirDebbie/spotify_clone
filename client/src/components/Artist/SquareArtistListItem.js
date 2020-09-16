import React from "react";
import { Link } from "react-router-dom";

function SquareArtistListItem({ artist }) {
  return (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      to={`/artist/${artist.id}`}
    >
      <div className="newAlbumGrid">
        <h3>{artist.name}</h3>
        <div>
          {artist.cover_img && (
            <img alt="Go To Artist" className="bigImg" src={artist.cover_img} />
          )}
        </div>
        <p style={{ fontSize: 15, color: "#1db954" }}>{`${new Date(
          artist.upload_at.slice(0, 10)
        ).toDateString()}`}</p>
      </div>
    </Link>
  );
}

export default SquareArtistListItem;
