import { useEffect, useState } from "react";
import UserLink from "../components/UserLink";
import EventCard from "../components/EventsCard";


export default function EventsPage() {
  const [events, setEvents] = useState([]);

  const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
    const handleClick = async (e)=> {
     
      try {
      const user = await fetch('/api/me')
      const body = await user.json()
      console.log(e.target.id)
      const user_id = body.id
      const event_id = e.target.id
      const eventInfo = getPostOptions({user_id, event_id})
      const data = await fetch('/api/joinEvent', eventInfo)
      // const res = await data.json();
      // console.log(res)
      }
  
    catch(error){
  console.log(error)
        }
    } 

  useEffect(()=> {
    const handleFetch = async () => {
      try {
        const data = await fetch('/api/listEvents');
        const res = await data.json()
        setEvents(res)

        // console.log(res)
      }
      catch(error){
    console.log(error)
    return null;
      }
    }
    handleFetch();
  },[events])
  
  return <>
    <h1>Events page: </h1>
    <div id="EventContainer">
  {events.length>0?
  events.map((event, idx)=>(

    <div key={idx}>
    <EventCard event={event}/>
    <button id={event.id} onClick={handleClick}>Join</button>
    </div>

  )) : ''}
    </div>
    
  </>;
}