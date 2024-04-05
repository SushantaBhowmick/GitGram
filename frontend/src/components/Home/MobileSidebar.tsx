import { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { MdExplore, MdOutlineVideogameAsset } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  const [active, setActive] = useState<number>(1);
    
  return (
    <div className="w-full border-t-2 rounded-t-2xl bg-gray-600 border-gray-500">
        <div className="flex justify-around py-2">
        <Link
          onClick={() => setActive(1)}
          to={"/"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===1 ? "text-[red]":"text-white"}`}
        >
          <RiHomeHeartFill size={35} />
        </Link>

        <Link
          onClick={() => setActive(2)}
          to={"/explore"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===2 ? "text-[red]":"text-white"}`}
        >
          <MdExplore size={35} />
        </Link>

        <Link
          onClick={() => setActive(3)}
          to={"/reels"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===3 ? "text-[red]":"text-white"}`}
        >
          <MdOutlineVideogameAsset size={35} />
        </Link>
        <Link
          onClick={() => setActive(3)}
          to={"/reels"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===4 ? "text-[red]":"text-white"}`}

        >
          <FiPlusCircle size={35} title="New Post"/>
        </Link>
        <Link
        onClick={() => setActive(5)}
          to={"/message"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===5 ? "text-[red]":"text-white"}`}
        >
          <BiMessageRoundedDetail size={35} />
        </Link>

        <Link
          onClick={() => setActive(6)}
          to={"/login"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===6 ? "text-[red]":"text-white"}`}

        >
          <RxAvatar size={35} />
        </Link>

        </div>
    </div>
  )
}

export default MobileSidebar