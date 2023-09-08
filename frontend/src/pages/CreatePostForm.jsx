import { useEffect, useState, useRef } from "react";
import { Widget } from '@uploadcare/react-widget';
import { UPLOADCARE_API_KEY } from "../../config";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // cloud upload
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//export default function SelectVariants() {
 

export default function UsersPage() {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
    };
  
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState("");
  const nav = useNavigate();

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
      // console.log(formInfo)
      let Owner = await fetch("/api/me")
      Owner = await Owner.json()
      let Owner_id = Owner.id
      let img_url = url
      let Description = formInfo.description;
      let Address = formInfo.address;
      let Category = formInfo.category

      let body = getPostOptions({Description, img_url, Owner_id, Address, Category})
      
      const data = await fetch ('/api/createPost',body);
      nav('/')
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
      <form onSubmit={formhandler} className='createForm'>

      <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            name='description'
            placeholder="I am donating summer clothing."
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>
        {/* <label >Enter description:</label>
        <input name='description' type="text" /> */}
        <br />


        <label>UPLOAD A FILE </label>
        <Widget publicKey={UPLOADCARE_API_KEY} id='file' name='img_url' onChange={handleImageURL}/>
       
        <br />
        <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="address">Pick-up Address</InputLabel>
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
        {/* <label >Pick-up Address:</label>
        <input name='address' type="text" /> */}

<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
        name="category"
          labelId="category"
          id="category"
          value={category}
          onChange={handleChange}
          label="category"
        >
          <MenuItem value={'Food'}>Food</MenuItem>
          <MenuItem value={'Clothing'}>Clothing</MenuItem>
          <MenuItem value={'Shelter'}>Shelter</MenuItem>
        </Select>
      </FormControl>

        {/* <label >Category: </label>
        <select name="category" id="Category">
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Shelter">Shelter</option>
        </select> */}

        <button type="submit" className="submitButton">Submit</button>
      </form>
    </>);
}