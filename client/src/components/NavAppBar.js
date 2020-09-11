import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import AlbumIcon from "@material-ui/icons/Album";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PlaylistPlayOutlinedIcon from "@material-ui/icons/PlaylistPlayOutlined";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import { Link } from "react-router-dom";

function NavAppBar() {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(true);
  };
  return (
    <div>
      <AppBar style={{ backgroundColor: "#1db954" }} position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            color="inherit"
            edge="start"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography style={{ fontWeight: "bold" }} variant="h4">
            Spotify-Clone
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="drawer">
          <Link style={{ textDecoration: "none" }} to="/">
            <div className="drawerItem">
              Home Page
              <HomeOutlinedIcon style={{ position: "absolute", right: 10 }} />
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/songs">
            <div className="drawerItem">
              All Songs
              <MusicNoteOutlinedIcon
                style={{ position: "absolute", right: 10 }}
              />
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/albums">
            <div className="drawerItem">
              All Albums
              <AlbumIcon style={{ position: "absolute", right: 10 }} />
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/artists">
            <div className="drawerItem">
              All Artists
              <LibraryMusicIcon style={{ position: "absolute", right: 10 }} />
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/playlists">
            <div className="drawerItem">
              All Playlists
              <PlaylistPlayOutlinedIcon
                style={{ position: "absolute", right: 10 }}
              />
            </div>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}

export default NavAppBar;