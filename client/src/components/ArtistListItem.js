import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';

function ArtistListItem({ artist }) {
    return (
        <div>
            <ListItem style={{textAlign: "center"}}>
                <ListItemText 
                  primary={artist.name}
                  secondary={<Typography style={{ color: '#1db954', fontSize: 12 }}>{new Date(artist.upload_at.slice(0, 10)).toDateString()}</Typography>}
                />
                {artist.cover_img && 
                    <img alt='artist cover' className='artistImg' src={artist.cover_img} />
                }
              </ListItem>
        </div>
    )
}

export default ArtistListItem;

