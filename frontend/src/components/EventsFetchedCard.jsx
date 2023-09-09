import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function EventsFetchedCard({event}) {
  const [cardData, setCardData] = useState({});
  const { id } = useParams();

  const getPostOptions = (body) => ({
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const handleClick=  async(e)=>{
    try{
      let event_id = e.target.id

      let options = getPostOptions({event_id})
      console.log(options)
      const user = await fetch(`/api/deleteJoined/${id}`, options )
      console.log(user)
    }
    catch(error){
        console.log(error)
        return null
    }
  }


  useEffect(()=>{
    const handleFetch = async ()=>{

        const event_id = event.event_id
        const data = await fetch(`/api/showEventDetail/${event_id}`)
        const res = await data.json()

        setCardData(res[0])

    }
    handleFetch()
  }, [event])
{/* <h1>{cardData.event_name}</h1>
    <img src={cardData.img_url} alt='No photo' />
    <h2>{cardData.description}</h2>
    <h2>{cardData.address}</h2> */}

    return (
      <div className="PostCardContainer">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="No Image"
          height="250"
          image={cardData.img_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardData.event_name}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {cardData.description}
          </Typography>
          <br></br>
          <Button color="secondary" onClick={handleClick} id={event.event_id}>Leave Event</Button>
          {/* <button onClick={handleClick} id={event.event_id}>Leave Event</button> */}
          {/* <Typography variant="body2" color="text.primary">
            {cardData.address}
          </Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button size="large" id={event.id} onClick={handleClick}>Join</Button>
        </CardActions> */}
      </Card>
      </div>
    );
}