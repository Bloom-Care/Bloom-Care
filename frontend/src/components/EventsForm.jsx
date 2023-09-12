import { useEffect, useState } from "react";
import { Widget } from '@uploadcare/react-widget';
import { UPLOADCARE_API_KEY } from "../../config";
import { useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



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
      const data = await fetch ('/api/postEvent',body);

      nav('/eventPage')

    }
    catch(error){
      console.log(error)
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    handleFetch(e);
  }
  
  return <>
    <form onSubmit={handleSubmit} className='eventForm'>
    <h1>Events Form </h1>

    <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="event_name">Event Name</InputLabel>
          <Input
            id="event_name"
            name='event_name'
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>

      <br />
      <label >UPLOAD A FILE</label>
      <br />
      <Widget publicKey={UPLOADCARE_API_KEY} id='file' name='img_url' onChange={handleImageURL}/>
      <br />
      <br />

      <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            name='description'
            placeholder="Join me to plant veggies and flowers!!"
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>
      {/* <label htmlFor="eventDescForm">Descriptions:</label> */}
      {/* <input name='description' type="text" id="eventDescForm" placeholder="Eg: Needs some help setting the gnomes around my lawn"/> */}
     
      {/* <label htmlFor="eventAddressForm">Address:</label> */}
      {/* <input name='address' type="text" id="eventAddressForm"  placeholder="Eg: 123 Marcy st"/> */}

      <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="address">Address</InputLabel>
          <Input
            id="address"
            name='address'
            placeholder="123 Marcy Ave"
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>

      {/* <label htmlFor="eventContactForm">Contact Information:</label>
      <input name='contact_info' type="tel" id="eventContactForm" placeholder="Eg: ***-***-0000/ Email"/> */}
     
      <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="contact_info">Contact Information</InputLabel>
          <Input
            id="contact_info"
            name='contact_info'
            placeholder="***-***-0000 or Email"
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>
     
      <button type="submit" className="submitButton">Submit</button>
    </form>
    {/* <UploadImg/> */}
  </>;
}