import React from 'react'
// import Header from '../components/layout/Header'
import Sidebar from '../components/Home/Sidebar'
import Content from '../components/Home/Content'
import SuggestFriend from '../components/Home/SuggestFriend'

const HomePage = () => {
  return (
    <div className='w-full flex'>
        {/* sidebar */}
        <div className=" hidden sm:block md:[8%] lg:w-[20%]">
        <Sidebar />
        </div>
        <div className="w-full lg:w-[50%]">
        <Content />
        </div>
        <div className="hidden lg:block">
        <SuggestFriend />
        </div>

    </div>
  )
}

export default HomePage