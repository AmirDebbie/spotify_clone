import React, { useState } from "react";
import axios from "axios";
import {
  ListItem,
  ListItemText,
  Typography,
  Modal,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PlaylistListItemAdmin({ playlist, getPlaylists }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(playlist.name);
  const [coverImg, setCoverImg] = useState(playlist.cover_img);
  const [uploadAt, setUploadAt] = useState(playlist.upload_at.slice(0, 10));

  // Opens the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Closes the modal.
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await axios.delete(`/playlist/${playlist.id}`);
    getPlaylists();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedPlaylist = {
      name,
      cover_img: coverImg,
      upload_at: uploadAt,
    };
    await axios.put(`/playlist/${playlist.id}`, updatedPlaylist);
    getPlaylists();
    handleClose();
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ textAlign: "center" }}>Update Playlist</h2>
      <form onSubmit={handleUpdateSubmit}>
        <TextField
          style={{ width: 400 }}
          label="Playlist Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          label="Cover Img"
          value={coverImg}
          onChange={(e) => {
            setCoverImg(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          label="Uploaded At"
          value={uploadAt}
          onChange={(e) => {
            setUploadAt(e.target.value);
          }}
        />
        <br />
        <Button
          style={{ backgroundColor: "#1db954", margin: 10 }}
          variant="contained"
          color="primary"
          type="submit"
          id="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <div className="linkListItem">
      <ListItem style={{ textAlign: "center" }}>
        <ListItemText
          primary={playlist.name}
          secondary={
            <Typography style={{ color: "#1db954", fontSize: 12 }}>
              {new Date(playlist.upload_at.slice(0, 10)).toDateString()}
            </Typography>
          }
        />
        <button
          className="deleteButton"
          onClick={handleDelete}
          style={{ position: "absolute" }}
        >
          Delete
        </button>
        <button
          className="updateButton"
          onClick={handleOpen}
          style={{ position: "absolute", left: 100 }}
        >
          Update
        </button>
        {playlist.cover_img && (
          <img
            alt="playlist cover"
            className="artistImg"
            src={playlist.cover_img}
          />
        )}
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </div>
  );
}

export default PlaylistListItemAdmin;
