import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

function AlbumListItem({ album }) {
  return (
    <div>
      <ListItem style={{ textAlign: "center" }}>
        <ListItemText
          primary={album.name}
          secondary={
            <Typography style={{ color: "#1db954", fontSize: 12 }}>{`${
              album.artist
            } | ${new Date(
              album.created_at.slice(0, 10)
            ).toDateString()}`}</Typography>
          }
        />
        {album.cover_img && (
          <img alt="album cover" className="artistImg" src={album.cover_img} />
        )}
      </ListItem>
    </div>
  );
}

export default AlbumListItem;
