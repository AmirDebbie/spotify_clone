import React, { useState, useMemo } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography, Tooltip, Zoom, Modal} from '@material-ui/core';
import MyModal from './MyModal'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
    },
  }));

function SongListItem({ song }) {
    const classes = useStyles();
    const modalStyle = getModalStyle();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
    setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className='song-list-item' onClick={handleOpen}>
            <Tooltip
                TransitionComponent={Zoom}
                placement="top"
                arrow title={new Date(song.created_at).toDateString()} 
            >
                <ListItem style={{textAlign: "center"}}>
                    <ListItemText 
                    primary={song.title}
                    secondary={<Typography style={{ color: '#1db954', fontSize: 12 }}>{`${song.artist} | ${song.album} | ${song.length.slice(0,5)}`}</Typography>}
                    />
                    <MyModal youtube_link={song.youtube_link}/>
                </ListItem>
            </Tooltip>
            
        </div>
    )
}

export default SongListItem;

