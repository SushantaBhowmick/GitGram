
import { RxCross1 } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import React, {useEffect, useState } from "react";
import store, { RootState } from "../../app/store";
import { toast } from "react-toastify";
import { addComment, getAPost } from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

interface CommentProps {
  setCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string | undefined; // Assuming postId is of type string, adjust the type accordingly
}

const Comment: React.FC<CommentProps> = ({ setCommentOpen, postId }) => {

    const [commentData,setCommentData]=useState("")
    const {singlePost,loading} = useSelector((state:RootState)=>state.post)
    const comments = useSelector((state: RootState) =>state.post.singlePost?.comments || []);

   const sortedComments = comments
    ?.filter((c) => !!c) // Filter out any undefined posts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  function calculateTimeDifference(postCreatedAt: string): string | undefined {
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
      unit = "d";
      timeValue = days;
    } else if (hours > 0) {
      unit = "h";
      timeValue = hours;
    } else if (minutes > 0) {
      unit = "m";
      timeValue = minutes;
    } else {
      unit = "s";
      timeValue = seconds;
    }

    // Format the time difference string
    return `${timeValue}${unit}${timeValue > 1 ? "" : ""} ago`;
  }

  const submitComment=async(e:React.FormEvent<HTMLFormElement>,postId:string|undefined)=>{
        e.preventDefault();
        if(commentData===''||commentData===undefined||commentData===null){
            toast.warning("You can't send empty comment")
            return
        }
        await store.dispatch(addComment({postId,text:commentData}))
        setCommentData('');
        await store.dispatch(getAPost(postId));
  }

  useEffect(() => {
    if(postId){
   store.dispatch(getAPost(postId))
  }
  }, [postId])
  

  return (
    <div className="fixed w-full h-screen bg-[#000000ae] top-0 left-0 z-50 flex items-center justify-center">
      <div className="w-[90%] sm:w-[80%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-gray-600 rounded-md shadow-sm relative p-4">
        <RxCross1
          size={30}
          className="absolute right-3 top-3 z-50"
          onClick={() => setCommentOpen(false)}
          cursor={"pointer"}
        />
        {/* <h1 className=" text-[25px] font-bold underline text-center">Comments</h1> */}
        {
          loading? 
         ( <div className="flex items-center justify-center h-[80vh]">
          <Loader />
            {/* <h1 className=" text-[25px] text-gray-400">Loading...</h1> */}
          </div>) :
        (<div className=" w-full flex justify-center h-full p-1 gap-5">
          <div className=" hidden md:block lg:w-[50%]">
            <img
              src={singlePost?.image}
              alt=""
              className=" w-full h-full rounded-sm"
            />
          </div>
          <div className=" w-full md:w-[50%] h-full relative">
            {/* header comment: title */}
            <div className="flex justify-between items-center py-3  border-b border-white ">
              <div className="flex items-center gap-3 ">
                <Link to={`/user/${singlePost?.user?._id}`}>
                  <img
                    src={singlePost?.user?.avatar}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                </Link>
                <div className="gap-2 flex ">
                  <h1 className="text-[18px] font-bold">{singlePost?.user?.name}</h1>
                  {/* <span className=" text-gray-400">
                      .{calculateTimeDifference(item.createdAt)}
                    </span> */}
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
            {/* caption */}
            <div className="h-[70vh] overflow-y-auto p-2">
              <div className="flex items-center gap-3 mt-3">
                <Link to={`/user/${singlePost?.user?._id}`}>
                  <img
                    src={singlePost?.user?.avatar}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                </Link>
                <div className="gap-2 flex">
                  <h1 className="text-[16px] font-[500]   ">
                    Caption :{" "}
                    <span className="font-[200] text-[14px]">
                      {singlePost?.caption}
                    </span>
                  </h1>
                  <span className=" text-gray-400">
                    {/* .{calculateTimeDifference(singlePost?.createdAt)} */}
                  </span>
                </div>
              </div>

              {/*comments  */}
              <div >
                <h1 className=" text-gray-400 mt-5">Comments:</h1>
                {sortedComments.length!==0 ?
                  sortedComments.map((item, i) => (
                    <div className="flex items-center gap-3 mt-3" key={i}>
                      <Link to={`/user/${singlePost?.user?._id}`}>
                        <img
                          src={item.user?.avatar}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full object-cover"
                        />
                      </Link>
                      <div className=" flex flex-col">
                        <div className="flex gap-2">
                          <h1 className="font-[600] text-[16px]">
                            {item.user?.username}
                          </h1>
                          <h1 className=" text-gray-300">{item.text}</h1>
                        </div>
                        <span className=" text-gray-400">
                          .{calculateTimeDifference(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))
                : <div className="flex items-center justify-center h-[50vh]">
                  <h1 className="text-[25px] text-gray-400">No comments available</h1>
                </div>
                }
              </div>
            </div>
            {/* Add a comment */}
            <div className=" absolute w-full bottom-1 z-50 bg-gray-500 p-4">
              <form className="flex items-center gap-2 " onSubmit={(e)=>submitComment(e,singlePost?._id)}>
                <Input
                  placeholder="write a comment"
                  className=" bg-gray-400 text-black font-[500] text-[16px] border-none placeholder:text-white"
                  value={commentData}
                  onChange={(e)=>setCommentData(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </form>   
            </div>
          </div>
        </div>)
        }
      </div>
    </div>
  );
};

export default Comment;
