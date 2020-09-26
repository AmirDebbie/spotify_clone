import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function ArtistListItem({ artist }) {
  return (
    <div className="linkListItem">
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/artist/${artist.id}`}
      >
        <ListItem style={{ textAlign: "center" }}>
          <ListItemText
            primary={artist.name}
            secondary={
              <Typography style={{ color: "#1db954", fontSize: 12 }}>
                {new Date(artist.createdAt.slice(0, 10)).toDateString()}
              </Typography>
            }
          />
          {artist.coverImg && (
            <img
              alt="artist cover"
              className="artistImg"
              src={artist.coverImg}
            />
          )}
        </ListItem>
      </Link>
    </div>
  );
}

export default ArtistListItem;
