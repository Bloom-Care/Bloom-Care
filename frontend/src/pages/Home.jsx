import { useState, useContext, useEffect } from 'react';
import PostContextProvider from '../contexts/PostContextProvider'
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [ currntpos, setCurrntPos ] = useState('LIKE');
  // const { currentPosts } = useContext(PostContextProvider);
  const [currentPost, setCurrentPost] = useState({});
  // const context = { currentPost, setCurrentPost };
  let clickcount = 0;
  let currnt;

  const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const getDelOptions = (body) => ({
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const handleClick = async (e)=>{
    let post_id = Number(e.target.id)
    let user = await fetch('/api/me')
    let data = await user.json()
    let user_id = data.id
    console.log(user_id, post_id)
    let check = await fetch(`/api/likes/${user_id}/post/${post_id}`)
    let res = await check.json()
    console.log(res)
    if(res.length > 0){
      let body = getDelOptions({user_id})
      let deletelike = await fetch(`api/unLiked/${post_id}`, body)
      let res = deletelike.json()
      setCurrntPos('LIKE')

    }else{
      let options = getPostOptions({user_id, post_id })
      let liked = await fetch('/api/likedPost', options)
      setCurrntPos('UNLIKE')

    }
    // if(currnt=== e.target.id && clickcount === 1){
    //   let option = getDelOptions({user_id, post_id})
    //   clickcount =0;
    //   console.log(option)
    // }
  }

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
      <div key={idx}>
      <PostCard post={post}/>
      <button  onClick={handleClick} id={post.id}>{currntpos}</button>
      </div>
    )):''}
  </div>
  </>;
}
