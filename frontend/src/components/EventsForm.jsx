import { useEffect, useState } from "react";
import { Widget } from '@uploadcare/react-widget';
import { UPLOADCARE_API_KEY } from "../../config";
import { useNavigate } from "react-router-dom";



export default function EventsForm() {
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState("");
  const nav = useNavigate();

  const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  function handleImageURL(fileInfo) {
    setUrl(fileInfo.cdnUrl);
  }
  const handleFetch = async (e) => {
    try {
      const form = e.target;
      const formData = new FormData(form);
      const formInfo = Object.fromEntries(formData.entries());
      formInfo.img_url = url;
      let Owner = await fetch("/api/me")
      Owner = await Owner.json()
      formInfo.owner_id = Owner.id
      let body = getPostOptions(formInfo)
      console.log(body)
      const data = await fetch ('/api/postEvent',body);
      console.log(data)

      nav('/eventPage')

    }
    catch(error){
      // console.log(error)
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    handleFetch(e);
  }
  
  return <>
    <h1>Events Form: </h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor='eventNameForm'>Event Name:</label>
      <input name='event_name' type="text" id='eventNameForm' placeholder="Eg: Gardening Gnomes"/>
      <label htmlFor="EventImageForm">Upload Image:</label>
      <br />
      <Widget publicKey={UPLOADCARE_API_KEY} id='file' onChange={handleImageURL}/>
      <br />
      <br />
      <label htmlFor="eventDescForm">Descriptions</label>
      <input name='description' type="text" id="eventDescForm" placeholder="Eg: Needs some help setting the gnomes around my lawn"/>
      <label htmlFor="eventAddressForm">Address:</label>
      <input name='address' type="text" id="eventAddressForm"  placeholder="Eg: 123 Marcy st"/>
      <label htmlFor="eventContactForm">Contact Information:</label>
      <input name='contact_info' type="tel" id="eventContactForm" placeholder="Eg: ***-***-1570"/>
      <button type="submit">Submit</button>
    </form>
    {/* <UploadImg/> */}
  </>;
}