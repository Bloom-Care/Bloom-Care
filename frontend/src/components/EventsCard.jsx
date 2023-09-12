import { useEffect, useState } from "react";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function EventsCard({event}) {
  const [Event, setEvent] = useState('Join')
  const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const getDeleteOptions = (body) => ({
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
    const handleClick = async (e)=> {
      const user = await fetch('/api/me')
      const body = await user.json()
      try {
      if(Event ==="Join"){
      const user_id = body.id
      const event_id = e.target.id
      const eventInfo = getPostOptions({user_id, event_id})
      const data = await fetch('/api/joinEvent', eventInfo)
      setEvent('Leave Event')
      }else {
        let event_id = e.target.id
        let id = body.id
        let options = getDeleteOptions({event_id})
        const user = await fetch(`/api/deleteJoined/${id}`, options )
      setEvent('Join')

      }
      }
  
    catch(error){
  console.log(error)
        }
    } 


  return (
    <div className="PostCardContainer">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="No Image"
        height="250"
        image={event.img_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.event_name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.primary">
           Address: {event.address}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Contact: {event.contact_info}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" id={event.id} onClick={handleClick}>{Event}</Button>
      </CardActions>
    </Card>
    </div>
  );
}