import React from 'react'
// import Header from '../components/layout/Header'
import Sidebar from '../components/Home/Sidebar'
import Content from '../components/Home/Content'
import SuggestFriend from '../components/Home/SuggestFriend'

const HomePage = () => {
  return (
    <div className='w-full flex'>
        {/* <Header /> */}
        {/* sidebar */}
        <Sidebar />
        <Content />
        <SuggestFriend />

    </div>
  )
}

export default HomePage