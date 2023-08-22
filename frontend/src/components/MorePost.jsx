import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MorePost() {
  const [PostInfo, setPostInfo] = useState({});
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
            setPostInfo(res)
            console.log(PostInfo)
        }
        catch(error){
            console.log(error)
            return null
        }
    } 
    handleFetch()
  },[id])

  
  return <>
  <h1>Catergory:</h1>
  <h2>{PostInfo.category}</h2>

    <img src={PostInfo.img_url} alt="No Photo" />
    <h1>Discription:</h1>
    <h2>{PostInfo.description}</h2>
    <h1>Address:</h1>
    <h2>{PostInfo.address}</h2>
  </>;
}