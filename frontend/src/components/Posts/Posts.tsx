import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { MdSaveAlt } from "react-icons/md";
import { FaRegHeart, FaShareSquare } from "react-icons/fa";
import { TbMessageCirclePlus } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";

const Posts = () => {

  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold as needed
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div className="w-[100%] flex justify-center py-3 mb-12">
      <div className="w-[80%] md:w-[70%]">
        {/* post card */}

        <div className="w-full border-b">
          {/* name and options */}
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/7.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />

              <div className="flex gap-2 items-center">
                <h1 className="text-[18px] font-bold">rammcodes</h1>
                <span className=" text-gray-400">.13h</span>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CiMenuKebab />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* post images */}
          <div className="">
          {/* <img
            src="https://gitgram.s3.ap-south-1.amazonaws.com/dp.jpeg"
            className="h-[400px] md:h-[500px] w-full rounded-sm"
            alt=""
          /> */}
          <video
           ref={videoRef}
          controls
            src="https://gitgram.s3.ap-south-1.amazonaws.com/sample.mp4"
            className="h-[400px] md:h-[500px] w-full rounded-sm"
            autoPlay
            controlsList="nodownload noremoteplayback"
            loop
          />
         
        </div>
          <div className="flex justify-between mt-0 py-2">
            <div className="flex gap-4">
              <FaRegHeart size={27} />
              <TbMessageCirclePlus size={27} />
              <FaShareSquare size={27} />
            </div>
            <div>
              <MdSaveAlt size={27} />
            </div>
          </div>
          <h1 className=" text-[18px] font-bold py-2">256 Likes</h1>
        </div>

        <div className="w-full border-b">
          {/* name and options */}
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/7.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />

              <div className="flex gap-2 items-center">
                <h1 className="text-[18px] font-bold">rammcodes</h1>
                <span className=" text-gray-400">.13h</span>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CiMenuKebab />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* post images */}
          <div className="">
          <img
            src="https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1391499.jpg&fm=jpg"
            className="h-[400px] md:h-[500px] w-full rounded-sm"
            alt=""
          />
        </div>
          <div className="flex justify-between mt-0 py-2">
            <div className="flex gap-4">
              <FaRegHeart size={27} />
              <TbMessageCirclePlus size={27} />
              <FaShareSquare size={27} />
            </div>
            <div>
              <MdSaveAlt size={27} />
            </div>
          </div>
          <h1 className=" text-[18px] font-bold py-2">256 Likes</h1>
        </div>

        <div className="w-full border-b">
          {/* name and options */}
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/7.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />

              <div className="flex gap-2 items-center">
                <h1 className="text-[18px] font-bold">rammcodes</h1>
                <span className=" text-gray-400">.13h</span>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CiMenuKebab />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* post images */}
          <div className="">
          <img
            src="https://i.pinimg.com/474x/5a/93/b0/5a93b0c36ba7cd5399c9293db71b2663.jpg"
            className="h-[400px] md:h-[500px] w-full rounded-sm"
            alt=""
          />
        </div>
          <div className="flex justify-between mt-0 py-2">
            <div className="flex gap-4">
              <FaRegHeart size={27} />
              <TbMessageCirclePlus size={27} />
              <FaShareSquare size={27} />
            </div>
            <div>
              <MdSaveAlt size={27} />
            </div>
          </div>
          <h1 className=" text-[18px] font-bold py-2">256 Likes</h1>
        </div>
      </div>
    </div>
  );
};

export default Posts;
