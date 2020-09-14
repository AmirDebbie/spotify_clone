import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
  },
}));

export default function YoutubeModal({ youtube_link, title }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const video_id = useMemo(() => {
    let video_id = youtube_link.split("v=")[1];
    if (video_id) {
      const ampersandPosition = video_id.indexOf("&");
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
    }
    return video_id;
  }, [youtube_link]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <iframe
        title={title}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video_id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  return (
    <span className="playModal">
      <IconButton onClick={handleOpen}>
        <PlayCircleFilledIcon style={{ color: "white", fontSize: 30 }} />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </span>
  );
}
