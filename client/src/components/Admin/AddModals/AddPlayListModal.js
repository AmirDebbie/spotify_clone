import React, { useState } from "react";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
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

function AddPlaylistModal({ getPlaylists }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [cookies] = useCookies();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlaylist = {
      name,
      cover_img: coverImg,
      upload_at: new Date().toISOString().slice(0, 10),
    };
    await axios.post(`/playlist`, newPlaylist, {
      headers: {
        Authorization: cookies.token,
      }
     });
    getPlaylists();
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ textAlign: "center" }}>Add New Playlist</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Playlist Name"
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

export default AddPlaylistModal;
