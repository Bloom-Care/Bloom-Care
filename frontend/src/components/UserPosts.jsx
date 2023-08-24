import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function userPosts() {
  const [usersPosts, setUsersPosts] = useState([]);
  const { id } = useParams();


  useEffect(()=>{
    const handleFetch = async ()=>{
        const data = await fetch(`/api/listPost/${id}`)
        const res = await data.json()
        console.log(res)
    }
    handleFetch()
  }, [userPosts])
  
  return 
  <>
  <h1>Users Posts:</h1>
  </>;
}