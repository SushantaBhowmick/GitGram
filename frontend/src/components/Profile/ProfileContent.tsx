import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Button } from "../../@/components/ui/button";
import { HiPlusSmall } from "react-icons/hi2";

const ProfileContent = () => {
  const {user} = useSelector((state: RootState) => state.user);

  return (
  <>
    <div className="mt-8 mx-2">
      {/* info */}
      <div className="flex md:gap-32 gap-5 items-center ">
        <div className=" border rounded-full border-green-600">
          <img src={user?.avatar} alt="dp" className=" rounded-full h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-cover" />
        </div>

        <div className="flex flex-col gap-5 ">
          <div className="block sm:flex gap-3 items-center">
          <h3 className="text-[22px] sm:mb-0 mb-2">{user?.username}</h3>
          <Button variant={'secondary'}>Edit Profile</Button>
          <Button variant={'secondary'}>View archived</Button>
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
      <div title="New Post" className=" mb-10 border border-gray-500 rounded-full flex items-center justify-center">
      <HiPlusSmall size={40}/>
      <h3>New</h3>
      </div>
      
      <div className="border w-full xl:w-[900px]"></div>

      {/* posts */}
      <div className="mt-3">
        <h3>Posts</h3>
      </div>
    </div>
  </>
  )
}

export default ProfileContent