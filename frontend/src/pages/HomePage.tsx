// import Header from '../components/layout/Header'
// import Sidebar from '../components/Home/Sidebar'
import Content from '../components/Home/Content'
import SuggestFriend from '../components/Home/SuggestFriend'

const HomePage = () => {
  return (
    <>

    <div className='w-[100%] sm:w-[88%] md:w-[92%] lg:w-[82%] flex relative mt-16 sm:mt-0 justify-center md:justify-start'> 
        <div className="w-full sm:w-[100%] md:w-[92%] lg:w-[60%] px-10">
        <Content />
        </div>
        <div className="hidden lg:block">
        <SuggestFriend />
        </div>
    </div>
  
    </>
  )
}

export default HomePage