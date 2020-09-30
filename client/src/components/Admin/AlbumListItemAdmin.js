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

function AlbumListItemAdmin({ album, getAlbums }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(album.name);
  const [coverImg, setCoverImg] = useState(album.coverImg);
  const [uploadAt, setUploadAt] = useState(album.uploadAt.slice(0, 10));
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
      await axios.delete(`/album/${album.id}`, {
        headers: {
          Authorization: cookies.token,
        },
      });
      getAlbums();
    } catch (e) {
      if (e.response.status === 401) {
        alert('You are not an admin!')
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (String(new Date(uploadAt)) === "Invalid Date") {
      alert("Invalid Date Entered");
    } else {
      const updatedAlbum = {
        name,
        coverImg: coverImg,
        uploadAt: new Date(uploadAt).toISOString().slice(0, 10),
      }; 
      try {
        await axios.put(`/album/${album.id}`, updatedAlbum, {
          headers: {
            Authorization: cookies.token,
          },
        });
        getAlbums();
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
      <h2 style={{ textAlign: "center" }}>Update Album</h2>
      <form onSubmit={handleUpdateSubmit}>
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Album Name"
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
          required={true}
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
    <>
      <ListItem style={{ textAlign: "center" }}>
        <ListItemText
          primary={album.name}
          secondary={
            <Typography style={{ color: "#1db954", fontSize: 12 }}>{`${
              album.Artist.name
            } | ${new Date(
              album.createdAt.slice(0, 10)
            ).toDateString()}`}</Typography>
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
        {album.coverImg && (
          <img alt="album cover" className="artistImg" src={album.coverImg} />
        )}
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </>
  );
}

export default AlbumListItemAdmin;
