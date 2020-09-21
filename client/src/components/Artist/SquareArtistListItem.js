import React from "react";
import { Link } from "react-router-dom";

function SquareArtistListItem({ artist }) {
  return (
    <Link
      style={{ textDecoration: "none", color: "white" }}
      to={`/artist/${artist.id}`}
    >
      <div className="newAlbumGrid">
        <div>
          {artist.cover_img && (
            <img alt="Go To Artist" className="bigImg" src={artist.cover_img} />
          )}
        </div>
        <div style={{ height: 20, marginBottom: 20, marginTop: 5 }}>
          <h3 style={{ margin: 0 }}>{artist.name}</h3>
        </div>
        <p
          style={{ fontSize: 15, color: "#999", fontWeight: "bold" }}
        >{`${new Date(artist.upload_at.slice(0, 10)).toDateString()}`}</p>
      </div>
    </Link>
  );
}

export default SquareArtistListItem;
