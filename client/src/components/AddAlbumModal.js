import React, { useState } from "react";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
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

function AddAlbumModal({ getAlbums }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [open, setOpen] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [name, setName] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlbum = {
      artist_id: artistId,
      name,
      cover_img: coverImg,
      created_at: createdAt,
      upload_at: new Date().toISOString().slice(0, 10),
    };
    await axios.post(`/album`, newAlbum);
    getAlbums();
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ textAlign: "center" }}>Add New Album</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ width: 400 }}
          label="Artist ID"
          onChange={(e) => {
            setArtistId(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          label="Album Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          label="Cover Img"
          onChange={(e) => {
            setCoverImg(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          label="Created At"
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
      <button onClick={handleOpen} className="updateButton">
        Add
      </button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}

export default AddAlbumModal;