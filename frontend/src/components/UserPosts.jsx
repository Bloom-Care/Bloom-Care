import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function userPosts() {
  const [usersPosts, setUsersPosts] = useState([]);
  const { id } = useParams();
  const deleteOptions = {
    method: 'DELETE',
    credentials: 'include',
  };

  const handleClick=  async(e)=>{
    try{
        let post_id = e.target.id;
        const post = await fetch(`/api/deletePost/${post_id}`, deleteOptions)
    }
    catch(error){
        console.log(error)
        return null
    }
  }

  useEffect(()=>{
    const handleFetch = async ()=>{
        const data = await fetch(`/api/userPosts/${id}`)
        const res = await data.json()
        setUsersPosts(res)
    }
    handleFetch()
  }, [id, usersPosts])
  
  return (<>
  {usersPosts.length > 0 ? usersPosts.map((post, idx)=>(
    <div key={idx}>
     <PostCard post={post}/>
     <Button color="secondary" onClick={handleClick} id={post.id}>DELETE</Button>

     {/* <button onClick={handleClick} id={post.id}>DELETE</button> */}
    </div>
  )):''}
  </>)
}