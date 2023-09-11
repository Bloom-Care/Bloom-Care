import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';



export default function PostCard({post}) {  
  const nav = useNavigate()
  const [likeAmount, setLikes] = useState(0)

//come back when finished with Route
  useEffect(()=>{
    const handleFetch = async () => {
      try {
          const data = await fetch(`/api/likeAmount/${post.id}`);
          console.log(data)
          const res = await data.json()
          console.log(res)
          setLikes(res.length)
      } catch (err) {
          console.log(err);
          return null;
      }
    }
    handleFetch()
  }, [])

  const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const getDelOptions = (body) => ({
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const handleLike = async (e)=>{
    let post_id = post.id
    let user = await fetch('/api/me')
    let data = await user.json()
    let user_id = data.id
    console.log(user_id, post_id)
    let check = await fetch(`/api/likes/${user_id}/post/${post_id}`)
    let res = await check.json()
    console.log(res)
    if(res.length === 0){
      let options = getPostOptions({user_id, post_id })
      let liked = await fetch('/api/likedPost', options)
      setLikes(likeAmount+1)
      // let res = deletelike.json()
      // setCurrntPos('LIKE')

    }else{
      let body = getDelOptions({user_id})
      let deletelike = await fetch(`api/unLiked/${post_id}`, body)
      setLikes(likeAmount-1)

      // setCurrntPos('UNLIKE')

    }
    // if(currnt=== e.target.id && clickcount === 1){
    //   let option = getDelOptions({user_id, post_id})
    //   clickcount =0;
    //   console.log(option)
    // }
  }

  function handleClick(e){
    // console.log(e.target)
    if(e.target.id == post.id){
      nav(`/post/${post.id}`)
    }
    
  }

  return (
    
  <div id={post.id} onClick={handleClick} className="PostCardContainer">
    <Card sx={{ maxWidth: 345 }} id={post.id}>
      <CardMedia
        component="img"
        height="250"
        image={post.img_url}
        alt="No Image"
        id={post.id}
      />
      <CardContent id={post.id}>
        <Typography variant="body2" color="text.secondary" id={post.id}>
          {post.description}
        </Typography>
      </CardContent >
      <IconButton aria-label="add to favorites" id='heart' onClick={handleLike}>
          <FavoriteIcon id='heart'/> {likeAmount}
      </IconButton>
    </Card>
  </div>
  );
}