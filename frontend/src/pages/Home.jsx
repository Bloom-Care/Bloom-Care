import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContextProvider from '../contexts/PostContextProvider'
import PostCard from '../components/PostCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function HomePage() {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
    };

  const [ currntpos, setCurrntPos ] = useState('ALL');
  const [filteredPost, setFiltered] = useState({})
  // const { currentPosts } = useContext(PostContextProvider);
  const [currentPost, setCurrentPost] = useState({});
  const nav = useNavigate()


  useEffect(()=>{
    const handleFetch = async () => {
      try {
          const data = await fetch('/api/listPost');
          const res = await data.json()
          setCurrentPost(res)
      } catch (err) {
          console.log(err);
          return null;
      }
    }
    handleFetch()
  }, [currentPost])

  function handleFilter(e){
    const { value } = e.target
        if(value.length > 0){
        const filteredList = currentPost.filter(post => post.category === value)
    setCategory(e.target.value);
    setCurrntPos(value)
        setFiltered(filteredList)
        }else{
        }
  }

   
  return <>
  <div className='homeH1'>
  <h1 className='homeH1'> Home</h1>
  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
        name="category"
          labelId="category"
          id="category"
          value={category}
          onChange={handleFilter}
          label="category"
        >
          <MenuItem value={'ALL'}>ALL</MenuItem>
          <MenuItem value={'Food'}>Food</MenuItem>
          <MenuItem value={'Clothing'}>Clothing</MenuItem>
          <MenuItem value={'Shelter'}>Shelter</MenuItem>
        </Select>
      </FormControl>
  </div>
  <div id='postsContainer' >
    {currentPost.length>0 && currntpos ==='ALL'? 
    currentPost.map((post, idx)=>(
      <div key={idx} id={post.id} className='PostCardContainer' >
      <PostCard post={post}/>
      <br />
      </div>
    )): filteredPost.length>0 && category!=='ALL'?
    filteredPost.map((post,idx)=>(
      <div key={idx} id={post.id} className='Post_Card'>
      <PostCard post={post}/>
      <br />
      </div>
    )):''
    }
  </div>
  </>;
}
