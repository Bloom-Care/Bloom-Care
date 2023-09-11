import { useEffect, useState } from "react";
import UserLink from "../components/UserLink";
import EventCard from "../components/EventsCard";


export default function EventsPage() {
  const [events, setEvents] = useState([]);


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
    <h1 className="homeH1">Events page </h1>
    <div id='postsContainer'>
  {events.length>0?
  events.map((event, idx)=>(

    <div key={idx} id='postsContainer'>
    <EventCard event={event}/>
    </div>

  )) : ''}
    </div>
    
  </>;
}