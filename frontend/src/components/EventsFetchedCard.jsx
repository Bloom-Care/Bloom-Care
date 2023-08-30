import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function EventsFetchedCard({event}) {
  const [cardData, setCardData] = useState({});
  const { id } = useParams();


  useEffect(()=>{
    const handleFetch = async ()=>{

        const event_id = event.event_id
        const data = await fetch(`/api/showEventDetail/${event_id}`)
        const res = await data.json()

        setCardData(res[0])

    }
    handleFetch()
  }, [event])


  return <>
    <h1>{cardData.event_name}</h1>
    <img src={cardData.img_url} alt='No photo' />
    <h2>{cardData.description}</h2>
    <h2>{cardData.address}</h2>
  </>;
}