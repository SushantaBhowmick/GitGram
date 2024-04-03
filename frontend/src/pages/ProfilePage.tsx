import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import ProfileContent from '../components/Profile/ProfileContent.tsx'

const ProfilePage = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <ProfileContent />
    </div>
  )
}

export default ProfilePage