import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsFetchedCard from "./EventsFetchedCard";


export default function UsersEvents() {
  const [usersEvents, setUsersEvents] = useState([]);
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
        const data = await fetch(`/api/showEvents/${id}`)
        const res = await data.json()
        setUsersEvents(res)
    }
    handleFetch()
  }, [id, usersEvents])
  
  return (<>
    {usersEvents.length > 0 ? usersEvents.map((event, idx)=>(
      <div key={idx}>
       <EventsFetchedCard event={event}/>
       <button onClick={handleClick} id={event.event_id}>Leave Event</button>
      </div>
    )):''}
    </>)
}