import { useParams } from "react-router-dom";
import FriendProfileContent from "../components/Profile/FriendProfileContent.tsx";
import { useEffect } from "react";
import store, { RootState } from "../app/store.ts";
import { singleUser } from "../features/users/userSlice.ts";
import { useSelector } from "react-redux";
import ProfileContent from "../components/Profile/ProfileContent.tsx";

const FriendProfile = () => {
  const { existsUser, user } = useSelector((state: RootState) => state.user);


  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      store.dispatch(singleUser(id));
    }
  }, [id]);

  return (
    <div className="w-[100%] sm:w-[88%] md:w-[92%] lg:w-[82%] flex relative mt-16 sm:mt-0 justify-center md:justify-start">
      <div className="w-full flex justify-center">
        {existsUser?._id === user?._id ? (
          <ProfileContent />
        ) : (
          <FriendProfileContent user={existsUser} />
        )}
      </div>
    </div>
  );
};

export default FriendProfile;
