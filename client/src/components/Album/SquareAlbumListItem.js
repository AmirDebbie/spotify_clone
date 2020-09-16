import React from "react";
import { Link } from "react-router-dom";

function SquareAlbumListItem({ album }) {
  return (
    <div className="linkListItem">
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/album/${album.id}`}
      >
        <div className="newAlbumGrid">
          <h3>{album.name}</h3>
          <div>
            {album.cover_img && (
              <img alt="Go To Album" className="bigImg" src={album.cover_img} />
            )}
          </div>
          <p style={{ fontSize: 15, color: "#1db954" }}>{`${
            album.artist
          } | ${new Date(album.created_at.slice(0, 10)).toDateString()}`}</p>
        </div>
      </Link>
    </div>
  );
}

export default SquareAlbumListItem;
