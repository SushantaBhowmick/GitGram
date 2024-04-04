import { Search } from "lucide-react"
import { useState } from "react"
import { MdOutlineEditNotifications } from "react-icons/md"

const MobileHeader = () => {
    const [open,setOpen] = useState(false)
  return (
    <div className=" px-4 flex justify-between items-center w-full border-t-2 bg-gray-600 border-gray-500 mb-5 rounded-b-md p-2">
        <h1 className="text-[25px] md:font-[700]">GitGram</h1>
       <div className="flex gap-3 items-center">
         
       <div className="flex items-center">
            {open===false && <Search className="  absolute z-10 top-4" color="gray" />}
            <input type="text" className="relative bg-gray-300 w-[90%] h-8 rounded-2xl pl-7" placeholder="Search" onClick={()=>setOpen(true)} />
        </div>
        <MdOutlineEditNotifications size={25} />
       </div>
    </div>
  )
}

export default MobileHeader