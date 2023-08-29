import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsCard from '../components/EventsCard'


export default function usersEvents() {
  const [usersEvents, setUsersEvents] = useState([]);
  const { id } = useParams();


  useEffect(()=>{
    const handleFetch = async ()=>{
        const data = await fetch(`/api/showEvent/${id}`)
        const res = await data.json()
        setUsersEvents(res)
        console.log(usersEvents)
    }
    handleFetch()
  }, [id])
  console.log(usersEvents)
  
  return (<>
    {usersEvents.length > 0 ? usersEvents.map((event, idx)=>(
      <div key={idx}>
       <EventsCard event={event}/>
       {/* <button onClick={handleClick} id={post.id}>DELETE</button> */}
      </div>
    )):''}
    </>)
}