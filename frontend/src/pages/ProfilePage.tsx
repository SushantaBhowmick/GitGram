// import Sidebar from '../components/Home/Sidebar'
import ProfileContent from '../components/Profile/ProfileContent.tsx'

const ProfilePage = () => {
  return (
    <>
   
   <div className='w-[100%] sm:w-[88%] md:w-[92%] lg:w-[82%] flex relative mt-16 sm:mt-0 justify-center md:justify-start'> 
        <div className="w-full flex justify-center">
        <ProfileContent />
        </div>
    </div>
   
    </>
  )
}

export default ProfilePage