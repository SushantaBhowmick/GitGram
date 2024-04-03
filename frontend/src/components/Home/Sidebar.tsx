import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { RiHomeHeartFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { MdExplore, MdOutlineEditNotifications } from "react-icons/md";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-[12%] border-r h-screen md:w-[20%]">
      <div className="py-10 pl-5">
        <h1 className=" text-[0] md:text-[25px] md:font-[700]">GitGram</h1>
        <div>
        <FaGithub className="size-7 md:size-0" />
        </div>
      </div>

      <div className=" flex flex-col gap-10">
        <Link
          onClick={() => setActive(1)}
          to={"/"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===1 && "text-[red]"}`}
        >
          <RiHomeHeartFill size={35} />
          <span className=" text-[0px] md:text-[18px]">
          Home
          </span>
        </Link>

        <div className="flex items-center text-[18px] font-[500] gap-4 pl-5">
          <IoSearch size={35} />
          <span className=" text-[0px] md:text-[18px]" >
          Search
          </span>
        </div>

        <Link
          onClick={() => setActive(2)}
          to={"/explore"}
          className="flex items-center text-[18px] font-[500] gap-4 pl-5"
        >
          <MdExplore size={35} />
          <span className=" text-[0px] md:text-[18px]" >
          Explore
          </span>
        </Link>

        <Link
          to={"/reels"}
          className="flex items-center text-[18px] font-[500] gap-4 pl-5"
        >
          <MdOutlineVideogameAsset size={35} />
          <span className=" text-[0px] md:text-[18px]" >
          Reels
          </span>
        </Link>
        <Link
          to={"/message"}
          className="flex items-center text-[18px] font-[500] gap-4 pl-5"
        >
          <BiMessageRoundedDetail size={35} />
          <span className=" text-[0px] md:text-[18px]" >
          Messages
          </span>
        </Link>
        <Link
          to={"/notification"}
          className="flex items-center text-[18px] font-[500] gap-4 pl-5"
        >
          <MdOutlineEditNotifications size={35} />
          <span className=" text-[0px] md:text-[18px]" >
          Notification
          </span>
        </Link>

        <Link
          onClick={() => setActive(6)}
          to={"/profile"}
          className={`flex items-center text-[18px] font-[500] gap-4 pl-5 ${active===6 && "text-[red]"}`}
        >
          <RxAvatar size={35} />
          <span className=" text-[0px] md:text-[18px]" >
          Profile
          </span>
        </Link>

        <div className="flex items-center text-[18px] font-[500] gap-4 pl-5">
          <ModeToggle />
          <span className=" text-[0px] md:text-[18px]" >
          Color Mode
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
