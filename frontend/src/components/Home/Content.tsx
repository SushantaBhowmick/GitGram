import { useSelector } from 'react-redux';
import store, { RootState } from '../../app/store';
import { ModeToggle } from '../ModeToggle'
import Posts from '../Posts/Posts'
import Header from '../layout/Header'
import React, { useEffect } from 'react';
import { getAllPost } from '../../features/posts/postsSlice';

const Content:React.FC = () => {

  const {posts}= useSelector((state: RootState) => state.post);

  useEffect(()=>{
    store.dispatch(getAllPost())
  },[])

  return (
    <div className='h-screen overflow-y-scroll relative w-full justify-center items-center'>
      <Header />
      <Posts posts={posts} />
      <div className='fixed bottom-14 right-2'>
        <ModeToggle />
      </div>
    </div>

  )
}

export default Content