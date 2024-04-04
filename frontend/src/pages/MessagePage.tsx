import Sidebar from '../components/Home/Sidebar'
import SuggestFriend from '../components/Home/SuggestFriend'
import Message from '../components/Messages/Message'

const MessagePage = () => {
  return (
   <>
    <div className='flex w-full'>
       <div className=" hidden sm:block md:w-[8%] lg:w-[18%]">
        <Sidebar />
        </div>
        <div className="w-full sm:w-[88%] md:w-[92%] lg:w-[52%]">
        <Message />
        </div>
        <div className="hidden lg:block">
        <SuggestFriend />
        </div>
    </div>
  
   </>
  )
}

export default MessagePage