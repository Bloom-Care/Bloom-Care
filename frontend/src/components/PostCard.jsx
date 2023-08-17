import { useEffect, useState } from "react";

export default function PostCard({post}) {  
  return (
  <div id={post.id}>
    <img src={post.img_url} alt="error" />
    <h3>{post.address}</h3>
    <h2>{post.description}</h2>
  </div>
  );
}