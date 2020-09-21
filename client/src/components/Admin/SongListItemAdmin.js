import React, { useState } from "react";
import axios from "axios";
import {
  ListItem,
  ListItemText,
  Typography,
  Modal,
  TextField,
  Button,
  Zoom,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YoutubeModal from "../YoutubeModal";
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

function SongListItemAdmin({ song, getSongs }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [open, setOpen] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(song.youtube_link);
  const [title, setTitle] = useState(song.title);
  const [length, setLength] = useState(song.length.slice(3, 8));
  const [trackNumber, setTrackNumber] = useState(song.track_number);
  const [lyrics, setLyrics] = useState(song.lyrics);
  const [createdAt, setCreatedAt] = useState(song.created_at.slice(0, 10));
  const [uploadAt, setUploadAt] = useState(song.upload_at.slice(0, 10));
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
    await axios.delete(`/song/${song.id}`, {
      headers: {
        Authorization: cookies.token,
      },
    });
    getSongs();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (
      String(new Date(createdAt)) === "Invalid Date" ||
      String(new Date(uploadAt)) === "Invalid Date"
    ) {
      alert("Invalid Date Entered");
    } else if (isNaN(trackNumber)) {
      alert("Invalid Track Number Entered");
    } else if (!/^([0-5][0-9]):([0-5][0-9])$/.test(length)) {
      alert('Invalid Length Entered (Length should look like: "xx:xx")');
    } else {
      const updatedSong = {
        youtube_link: youtubeLink,
        title,
        length: "00:".concat(length),
        track_number: trackNumber,
        lyrics,
        created_at: new Date(createdAt).toISOString().slice(0, 10),
        upload_at: new Date(uploadAt).toISOString().slice(0, 10),
      };
      await axios.put(`/song/${song.id}`, updatedSong, {
        headers: {
          Authorization: cookies.token,
        },
      });
      getSongs();
      handleClose();
    }
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ textAlign: "center" }}>Update Song</h2>
      <form onSubmit={handleUpdateSubmit}>
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Youtube Link"
          value={youtubeLink}
          onChange={(e) => {
            setYoutubeLink(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Length"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Track Number"
          value={trackNumber}
          onChange={(e) => {
            setTrackNumber(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          label="Lyrics"
          value={lyrics}
          onChange={(e) => {
            setLyrics(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: 400 }}
          required={true}
          label="Created At"
          value={createdAt}
          onChange={(e) => {
            setCreatedAt(e.target.value);
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
    <div className="song-list-item">
      <Tooltip
        TransitionComponent={Zoom}
        placement="top"
        arrow
        title={new Date(song.created_at).toDateString()}
      >
        <ListItem style={{ textAlign: "center" }}>
          <ListItemText
            primary={song.title}
            secondary={
              <Typography style={{ color: "#1db954", fontSize: 12 }}>{`${
                song.artist
              } | ${song.album} | ${song.length.slice(3, 8)}`}</Typography>
            }
          />
          <YoutubeModal title={song.name} youtube_link={song.youtube_link} />
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
        </ListItem>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </div>
  );
}

export default SongListItemAdmin;
