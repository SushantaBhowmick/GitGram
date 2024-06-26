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
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegHeart, FaShareSquare } from "react-icons/fa";
import { TbMessageCirclePlus } from "react-icons/tb";
import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../types/posts";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import store, { RootState } from "../../app/store";
import { getAllPost, likeOrUnlike } from "../../features/posts/postsSlice";

interface PostsProps {
  posts: Post[] | undefined;
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [post, setPost] = useState<Post>();

  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
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
  }, [posts]);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  const sortedPosts = posts
    ?.filter((post) => !!post) // Filter out any undefined posts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

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

  const handleCommentOpen = (item: Post) => {
    setCommentOpen(true);
    setPost(item);
  };

  const likeHandler = async(id: string) => {
      await store.dispatch(likeOrUnlike(id))
      await store.dispatch(getAllPost());
  };

  return (
    <div className={`w-[100%] flex justify-center py-3 mb-12 `}>
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
              <TbMessageCirclePlus
                size={27}
                onClick={() => setCommentOpen(true)}
              />
              <FaShareSquare size={27} />
            </div>
            <div>
              <MdSaveAlt size={27} />
            </div>
          </div>
          <h1 className=" text-[18px] font-bold py-2">256 Likes</h1>
        </div>

        {sortedPosts &&
          sortedPosts.map((item, i) => (
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
                    <h1 className="text-[18px] font-bold">
                      {item.user?.username}
                    </h1>
                    <span className=" text-gray-400">
                      .{calculateTimeDifference(item.createdAt)}
                    </span>
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
                  {item.caption.length > 50
                    ? item.caption.slice(0, 50) + "..."
                    : item.caption 
                  }
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
                <div className="flex gap-4 ml-2">
                  {item.likes?.find((like) => like === user?._id) ? (
                    <AiFillHeart 
                    size={27} 
                    color="crimson"
                    onClick={()=>likeHandler(item._id)}
                    cursor={'pointer'}
                    />
                  ) : (
                    <AiOutlineHeart 
                    size={27} 
                    onClick={()=>likeHandler(item._id)}
                    cursor={'pointer'}
                    />
                  )}
                  <TbMessageCirclePlus
                    size={27}
                    onClick={() => handleCommentOpen(item)}
                    cursor={"pointer"}
                    className=" text-gray-400"
                  />

                  <FaShareSquare size={24} 
                    className=" text-gray-400"
                  />
                </div>
                <div>
                  <MdSaveAlt size={27}
                    className=" text-gray-400"
                  />
                </div>
              </div>
              <h1 className=" text-[16px] font-bold py-2 text-gray-500">
                {item.likes?.length} Likes
              </h1>
            </div>
          ))}
        {commentOpen && (
          <Comment setCommentOpen={setCommentOpen} postId={post?._id} />
        )}
      </div>
    </div>
  );
};

export default Posts;
