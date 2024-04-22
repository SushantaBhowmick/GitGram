import { useSelector } from "react-redux";
import store, { RootState } from "../../app/store";
import { Button } from "../../@/components/ui/button";
import { HiPlusSmall } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Textarea } from "../../@/components/ui/textarea";
import { newPost } from "../../features/posts/postsSlice";
import Posts from "../Posts/Posts";
import { getMyPosts } from "../../features/users/userSlice";


const ProfileContent = () => {
  const { user,myPosts } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.post);
  const [open, setOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [post, setPost] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setPost(file);
  };

  const handleView = () => {
    setOpen(true);
  };

  const submitPostHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const formData = new FormData();
    formData.append('caption',caption)
    formData.append('file',post as Blob)

    await store.dispatch(newPost(formData))
    await store.dispatch(getMyPosts())
    setPost(null)
    setPostOpen(false)
  }

  useEffect(()=>{
    store.dispatch(getMyPosts())
  },[])

  return (
    <>
      <div className="mt-8 mx-2 h-[96vh] overflow-y-auto">
        {/* info */}
        <div className="flex md:gap-32 gap-5 items-center ">
          <div
            className=" border rounded-full border-green-600"
            onClick={handleView}
          >
            <img
              src={user?.avatar}
              alt="dp"
              className=" rounded-full h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-cover"
            />
          </div>
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed w-full h-screen bg-[#000000de] top-0 left-0 z-40 flex items-center justify-center"
            >
              <div className=" border rounded-full border-green-600">
                <img
                  src={user?.avatar}
                  alt="dp"
                  className=" rounded-full h-[200px] w-[200px] md:h-[400px] md:w-[400px] object-contain"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-5 ">
            <div className="block sm:flex gap-3 items-center">
              <h3 className="text-[22px] sm:mb-0 mb-2">{user?.username}</h3>
              <Button variant={"secondary"}>Edit Profile</Button>
              <Button variant={"secondary"}>View archived</Button>
            </div>
            <div className="flex gap-10 items-start  text-[#443bb4]">
              <span className="!font-[500]">25 posts</span>
              <span className="!font-[500]">200 followers</span>
              <span className="!font-[500]">25 following</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-[18px] font-bold">{user?.name}</h2>
              <p className=" text-gray-600">if you not then who?</p>
              <p className=" text-gray-600">if not now then when?</p>
            </div>
          </div>
        </div>

        <div className="mx-2 mt-3 block sm:hidden">
          <h2 className="text-[18px] font-bold">{user?.name}</h2>
          <p className=" text-gray-600">if you not then who?</p>
          <p className=" text-gray-600">if not now then when?</p>
        </div>

        <br />
        <br />
        {/* new post icon */}
        <div
          title="New Post"
          className=" mb-10 border border-gray-500 rounded-full flex items-center justify-center"
          onClick={() => setPostOpen(true)}
        >
          <HiPlusSmall size={40} />
          <h3>New</h3>
        </div>

        <div className="border w-full xl:w-[900px]"></div>

        {/* posts */}
        <div className="mt-3">
          <h3 className="text-center font-bold text-[25px] text-gray-400">My Posts</h3>
          <Posts posts={myPosts} />
        </div>
      </div>


      {postOpen && (
        <div className="fixed w-full h-screen bg-[#000000de] top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-gray-600 rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setPostOpen(false)}
              cursor={'pointer'}
            />

            <h1 className=" text-center text-[30px] font-bold">New Post</h1>

            <div className="w-full flex items-center justify-center flex-col h-[70vh] ">
              <form
              onSubmit={submitPostHandler}
                action=""
                className="flex flex-col items-center justify-center w-full sm:w-[40%] h-[50vh]"
              >
                 <Textarea
                  className=" bg-white text-black border-none w-full rounded-none !rounded-t-sm "
                  placeholder="Write your caption"
                  value={caption}
                  onChange={(e)=>setCaption(e.target.value)}
                />
                {post ? (
                  <div className="w-[100%] h-[100%]">
                    <img
                      src={URL.createObjectURL(post)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                 <div className="border border-white h-full w-full bg-gray-200">
                  <div className="flex justify-center items-center h-[20vh]">
                  <p className="text-center text-gray-400">No Choosen File</p>
                  </div>
                 </div>
                )}
                <label
                  htmlFor="file-input"
                  className=" h-[60px] w-full text-center items-center justify-center px-4 py-2  rounded-b-sm shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Choose an File
                  <input
                    required
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                </label>
               
                <Button variant={'secondary'} className="w-full h-[70px] mt-5" type="submit" disabled={loading}>
                  Upload Post
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileContent;
