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
import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../types/posts";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import store, { RootState } from "../../app/store";
import { getAPost } from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";


interface PostsProps {
  posts: Post[]|undefined;
}

const Posts: React.FC<PostsProps>  = ({posts}) => {
  const [commentOpen,setCommentOpen]=useState(false)

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

  const sortedPosts = posts?.filter((post) => !!post) // Filter out any undefined posts
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  function calculateTimeDifference(postCreatedAt: string): string {
    // Get current timestamp in milliseconds
    const now = Date.now();
  
    // Parse the post's createdAt string into a Date object
    const postDate = new Date(postCreatedAt);
  
    // Calculate the difference in milliseconds
    const differenceInMs = now - postDate.getTime();
  
    // Calculate seconds, minutes, hours, and days
    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // Determine the most appropriate unit (seconds, minutes, hours, or days)
    let unit: string;
    let timeValue: number;
    if (days > 0) {
      unit = 'd';
      timeValue = days;
    } else if (hours > 0) {
      unit = 'h';
      timeValue = hours;
    } else if (minutes > 0) {
      unit = 'm';
      timeValue = minutes;
    } else {
      unit = 's';
      timeValue = seconds;
    }
  
    // Format the time difference string
    return `${timeValue}${unit}${timeValue > 1 ? '' : '' } ago`;
  }
    
  return (
    <div className="w-[100%] flex justify-center py-3 mb-12">
      <div className="w-[98%] md:w-[75%]">
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
          <video
           ref={videoRef}
          controls
            src="https://gitgram.s3.ap-south-1.amazonaws.com/sample.mp4"
            className="h-[400px] md:h-[500px] w-full rounded-sm"
            // autoPlay
            muted
            controlsList="nodownload noremoteplayback"
            loop  
          />
         
        </div>
          <div className="flex justify-between mt-0 py-2">
            <div className="flex gap-4">
              <FaRegHeart size={27} />
              <TbMessageCirclePlus size={27} onClick={()=>setCommentOpen(true)} />
              <FaShareSquare size={27} />
            </div>
            <div>
              <MdSaveAlt size={27} />
            </div>
          </div>
          <h1 className=" text-[18px] font-bold py-2">256 Likes</h1>
        </div>

       

{
  sortedPosts && sortedPosts.map((item,i)=>(
    <div className="w-full border-b" key={i}>
  {/* name and options */}
  <div className="flex justify-between items-center py-3">
    <div className="flex items-center gap-3">
     <Link to={`/user/${item.user?._id}`}>
     <img
        src={item.user?.avatar}
        alt=""
        className="w-[35px] h-[35px] rounded-full object-cover"
      />
     
     </Link>
      <div className="flex gap-2 items-center">
        <h1 className="text-[18px] font-bold">{item.user?.username}</h1>
        <span className=" text-gray-400">.{calculateTimeDifference(item.createdAt)}</span>
      </div>
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-gray-500 p-3 cursor-pointer">
          <DropdownMenuSeparator />
          <DropdownMenuItem>About this Account</DropdownMenuItem>
          <DropdownMenuItem>Visit Profile</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  <div className="ml-1 mb-2 w-full">
        <span className="text-[16px] font-[500] font-serif text-break">
          {item.caption.length<40?item.caption+"...":item.caption.slice(0,40) + " see more"}
        </span>
      </div>

  {/* post images */}
  <div className="">
  <img
    src={item.image}
    className="h-[400px] md:h-[500px] w-full rounded-sm"
    alt=""
  />
</div>
  <div className="flex justify-between mt-0 py-2">
    <div className="flex gap-4">
      <FaRegHeart size={27} />
      <TbMessageCirclePlus size={27} onClick={()=>{setCommentOpen(true)}} cursor={'pointer'}/>
      <FaShareSquare size={27} />
    </div>
    <div>
      <MdSaveAlt size={27} />
    </div>
  </div>
  <h1 className=" text-[18px] font-bold py-2">256 Likes</h1>

  {
  commentOpen &&
<Comment
setCommentOpen={setCommentOpen}
postId={item._id}
/>
}

</div>
  ))
  
}


      </div>
    </div>
  );
};

interface CommentProps {
  setCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string; // Assuming postId is of type string, adjust the type accordingly
}

const Comment:React.FC<CommentProps> =({setCommentOpen,postId})=>{
  console.log(postId)

  const {singlePost} =useSelector((state:RootState)=>state.post)
  console.log(singlePost)

  useEffect(()=>{
    store.dispatch(getAPost(postId))
  },[postId])

  return (
    <div className="fixed w-full h-screen bg-[#00000030] top-0 left-0 z-50 flex items-center justify-center">
    <div className="w-[80%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-gray-600 rounded-md shadow-sm relative p-4">
      <RxCross1 
        size={30}
        className="absolute right-3 top-3 z-50"
        onClick={() => setCommentOpen(false)}
        cursor={'pointer'}
      />
        {/* <h1 className=" text-[25px] font-bold underline text-center">Comments</h1> */}
      <div className=" w-full flex justify-center h-full p-1 gap-5">
          {singlePost && 
           <>
            <div className=" w-[50%]">
              <img src={singlePost.image} alt="" className=" w-full h-full rounded-sm" />
            </div>
            <div className=" w-[50%]">comms</div>
           </>
          }
        </div>
  
      </div>
      </div>
  )
}

export default Posts;
