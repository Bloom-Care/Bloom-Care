import { useState, useEffect } from 'react';
import CurrentPostContext from './current-post-context';

export default function CurrentPostContextProvider({ children }) {
  const [currentPost, setCurrentPost] = useState(null);
  const context = { currentPost, setCurrentPost };

  useEffect(()=>{
    const handleFetch = async () => {
      try {
          const data = await fetch('/api/listPost');
          const res = await data.json()
          setCurrentPost(res)
          console.log(res)
      } catch (err) {
          console.log(err);
          return null;
      }
    }
  }, [])

  return (
    <CurrentPostContext.Provider value={ context }>
      {children}
    </CurrentPostContext.Provider>
  );
}
