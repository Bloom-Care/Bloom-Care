import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContextProvider from '../contexts/PostContextProvider'
import PostCard from '../components/PostCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


export default function HomePage() {
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
          // console.log(currentPost, 1)
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
        setCurrntPos(value)
        setFiltered(filteredList)
        }else{
            // setFilter(robots)
        }
  }

   
  return <>
  <h1>Home</h1>
  <label >Category: </label>
        <select name="category" id="Category" onChange={handleFilter}>
          <option value="ALL">All</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Shelter">Shelter</option>
        </select>
  <div id='postsContainer'>
    {currentPost.length>0 && currntpos ==='ALL'? 
    currentPost.map((post, idx)=>(
      <div key={idx} id={post.id} className='Post_Card'>
      <PostCard post={post}/>
      <br />
      </div>
    )): filteredPost.length>0 && currntpos!=='ALL'?
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
