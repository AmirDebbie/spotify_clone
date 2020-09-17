import React from "react";
import { Link } from "react-router-dom";

function SquareAlbumListItem({ album }) {
  return (
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/album/${album.id}`}
      >
        <div className="newAlbumGrid">
          <div style={{textAlign: 'center'}}>
            {album.cover_img && (
              <img alt="Go To Album" className="bigImg" src={album.cover_img} />
            )}
          </div>
          <div style={{height: 20, marginBottom: 20, marginTop: 5}}>
          <h3 style={{margin: 0}}>{album.name}</h3>
          </div>
          <p style={{ fontSize: 15, color: "#999", fontWeight: 'bold' }}>{`${
            album.artist
          } | ${new Date(album.created_at.slice(0, 10)).toDateString()}`}</p>
        </div>
      </Link>
  );
}

export default SquareAlbumListItem;
