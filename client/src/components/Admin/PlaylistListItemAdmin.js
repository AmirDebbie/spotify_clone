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
import { useCookies } from "react-cookie";

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
  const [coverImg, setCoverImg] = useState(playlist.coverImg);
  const [createdAt, setCreatedAt] = useState(playlist.createdAt.slice(0, 10));
  const [cookies] = useCookies();

  // Opens the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Closes the modal.
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/playlist/${playlist.id}`, {
        headers: {
          Authorization: cookies.token,
        },
      });
      getPlaylists();
    } catch (e) {
      if (e.response.status === 401) {
        alert('You are not an admin!')
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (String(new Date(createdAt)) === "Invalid Date") {
      alert("Invalid Date Entered");
    } else {
      const updatedPlaylist = {
        name,
        coverImg: coverImg,
        createdAt: new Date(createdAt).toISOString().slice(0, 10),
      };
      try {
        await axios.put(`/playlist/${playlist.id}`, updatedPlaylist, {
          headers: {
            Authorization: cookies.token,
          },
        });
        getPlaylists();
        handleClose();
      } catch (e) {
        if (e.response.status === 401) {
          alert('You are not an admin!')
        }
      }
    }
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ textAlign: "center" }}>Update Playlist</h2>
      <form onSubmit={handleUpdateSubmit}>
        <TextField
          style={{ width: 400 }}
          required={true}
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
          label="Created At"
          value={createdAt}
          onChange={(e) => {
            setCreatedAt(e.target.value);
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
    <>
      <ListItem style={{ textAlign: "center" }}>
        <ListItemText
          primary={playlist.name}
          secondary={
            <Typography style={{ color: "#1db954", fontSize: 12 }}>
              {new Date(playlist.createdAt.slice(0, 10)).toDateString()}
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
        {playlist.coverImg && (
          <img
            alt="playlist cover"
            className="artistImg"
            src={playlist.coverImg}
          />
        )}
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </>
  );
}

export default PlaylistListItemAdmin;
