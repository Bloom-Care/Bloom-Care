import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MorePost() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  const basicFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  useEffect(()=>{
    const handleFetch = async ()=>{
        try{
            const post = await fetch(`/api/listPost/${id}`, basicFetchOptions)
            const res = await post.json()
            setPostInfo(res[0])
        }
        catch(error){
            console.log(error)
            return null
        }
    } 
    handleFetch()
  },[id])

  if (!postInfo) return <div>NOTHING</div>
  return <>
  <div id='morepostContainer'>
  <h1>Category:</h1>
  <h2>{postInfo.category}</h2>

    <img src={postInfo.img_url} alt="No Photo" />
    <h1>Description:</h1>
    <h2>{postInfo.description}</h2>
    <h1>Address:</h1>
    <h2>{postInfo.address}</h2>
    </div>
  </>;
}