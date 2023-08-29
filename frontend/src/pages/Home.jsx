import { useState, useContext, useEffect } from 'react';
import PostContextProvider from '../contexts/PostContextProvider'
import PostCard from '../components/PostCard';

export default function HomePage() {
  // const [ PostList, setPostList ] = useState([]);
  // const { currentPosts } = useContext(PostContextProvider);
  const [currentPost, setCurrentPost] = useState({});
  // const context = { currentPost, setCurrentPost };

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

   
  return <>
  <h1>Home</h1>
  <div id='postsContainer'>
    {currentPost.length>0? 
    currentPost.map((post, idx)=>(
      <PostCard key={idx} post={post}/>
    )):''}
  </div>
  </>;
}
