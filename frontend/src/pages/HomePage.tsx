// import Header from '../components/layout/Header'
import Sidebar from '../components/Home/Sidebar'
import Content from '../components/Home/Content'
import SuggestFriend from '../components/Home/SuggestFriend'

const HomePage = () => {
  return (
    <div className='w-full flex'>
        {/* sidebar */}
        <div className=" hidden sm:block md:w-[8%] lg:w-[18%]">
        <Sidebar />
        </div>
        <div className="w-full sm:w-[88%] md:w-[92%] lg:w-[52%]">
        <Content />
        </div>
        <div className="hidden lg:block">
        <SuggestFriend />
        </div>

    </div>
  )
}

export default HomePage