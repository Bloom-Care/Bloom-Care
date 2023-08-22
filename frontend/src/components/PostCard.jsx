import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({post}) {  
  const nav = useNavigate()

  function handleClick(){
    nav(`/post/${post.id}`)
  }

  return (
  <div onClick={handleClick} id={post.id}>
    <img src={post.img_url} alt="error" />
    <h3>{post.address}</h3>
    <h2>{post.description}</h2>
  </div>
  );
}