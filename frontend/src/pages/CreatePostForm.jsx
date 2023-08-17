import { useEffect, useState, useRef } from "react";
import { Widget } from '@uploadcare/react-widget';
import { UPLOADCARE_API_KEY } from "../../config";


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState("");

  const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const handleFetch = async (e) => {
    try {
      const form = e.target;
      const formData = new FormData(form);
      const formInfo = Object.fromEntries(formData.entries());
      console.log(formInfo)
      let Owner = await fetch("/api/me")
      Owner = await Owner.json()
      let Owner_id = Owner.id
      // console.log(user_id)
      let img_url = url
      let Description = formInfo.description;
      let Address = formInfo.address;
      let Category = formInfo.category
      let body = getPostOptions({ Description, img_url, Owner_id, Address, Category})
      console.log(body)
      const data = await fetch ('/api/createPost',body);

    }
    catch(error){
      console.log(error)
    }
  }

  function formhandler(e) {
    e.preventDefault()
    handleFetch(e)
    // console.log(e.target)
    
  }

  function handleImageURL(fileInfo) {
    setUrl(fileInfo.cdnUrl);
  }

  console.log(url);

  return (
    <>
      <h1>Create Post: </h1>
      <form onSubmit={formhandler}>
        <label>Upload Image: </label>
        <label >Enter description:</label>
        <input name='description' type="text" />
        <br />
        <Widget publicKey={UPLOADCARE_API_KEY} id='file' onChange={handleImageURL}/>
        <br />
        <br />
        <label >Pick-up Address:</label>
        <input name='address' type="text" />
        <label >Category: </label>
        <select name="category" id="Category">
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Shelter">Shelter</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>);
}
