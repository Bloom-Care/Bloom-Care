import { useEffect, useState } from "react";
// import JoinButton from "./JoinButton";


export default function EventsCard({event}) {
//   const [users, setUsers] = useState([]);

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
    const res = await data.json();
    console.log(res)
    }

  catch(error){
console.log(error)
      }
  } 

  return <>
    <h1>{event.event_name}</h1>
    {/* <UploadImg/> */}
    <img src={event.img_url} alt='No photo' />
    <h2>{event.description}</h2>
    <h2>{event.address}</h2>
    {/* <h2># of participants</h2> */}
    <button id={event.id} onClick={handleClick}>Join</button>
  </>;
}