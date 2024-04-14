
import { MdOutlineEditNotifications } from "react-icons/md"
import { Input } from "../../@/components/ui/input"

const MobileHeader = () => {


  return (
    <div className=" px-4 gap-2 flex justify-between items-center w-full border-t-2 bg-gray-600 border-gray-500 mb-5 rounded-b-md p-2">
        <h1 className="text-[25px] font-[700] text-white">GitGram</h1>
       <div className="flex gap-2 items-center">
       <Input placeholder="Search here..." className=" rounded-xl" />
        <MdOutlineEditNotifications size={30} color="white" />
       </div>
    </div>
  )
}

export default MobileHeader