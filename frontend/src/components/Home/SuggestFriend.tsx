import React from "react";
import { Button } from "../../@/components/ui/button";

const SuggestFriend = () => {
  return (
    <div className=" w-full">
      {/* Your profile */}
      <div className="flex justify-between py-5 gap-16">
        <div className="flex gap-4 items-center">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            className=" w-[55px] h-[55px] rounded-full"
            alt=""
          />
          <div>
            <h1 className=" font-[600] text-[18px]">sushanta8514</h1>
            <span className=" text-gray-500">Sushanta Bhowmick</span>
          </div>
        </div>

        <Button className=" rounded-full m-2">Switch</Button>
      </div>

      {/* Suggest to make friends */}
      <div>
        <div className="flex gap-32">
          <h1 className=" text-[20px] font-[600] text-gray-500">
            Suggested For You
          </h1>
          <span className="font-[500] text-blue-600">See all</span>
        </div>
        {/* friends */}
        
        <div className="flex justify-between py-2 gap-16">
          <div className="flex gap-4 items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className=" w-[55px] h-[55px] rounded-full"
              alt=""
            />
            <div>
              <h1 className=" font-[600] text-[18px]">sushanta8514</h1>
              <span className=" text-gray-500">Sushanta Bhowmick</span>
            </div>
          </div>

          <Button className=" rounded-full m-2">Follow</Button>
        </div>
        
        <div className="flex justify-between py-2 gap-16">
          <div className="flex gap-4 items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className=" w-[55px] h-[55px] rounded-full"
              alt=""
            />
            <div>
              <h1 className=" font-[600] text-[18px]">sushanta8514</h1>
              <span className=" text-gray-500">Sushanta Bhowmick</span>
            </div>
          </div>

          <Button className=" rounded-full m-2">Follow</Button>
        </div>
        
        <div className="flex justify-between py-2 gap-16">
          <div className="flex gap-4 items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className=" w-[55px] h-[55px] rounded-full"
              alt=""
            />
            <div>
              <h1 className=" font-[600] text-[18px]">sushanta8514</h1>
              <span className=" text-gray-500">Sushanta Bhowmick</span>
            </div>
          </div>

          <Button className=" rounded-full m-2">Follow</Button>
        </div>
        
        <div className="flex justify-between py-2 gap-16">
          <div className="flex gap-4 items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className=" w-[55px] h-[55px] rounded-full"
              alt=""
            />
            <div>
              <h1 className=" font-[600] text-[18px]">sushanta8514</h1>
              <span className=" text-gray-500">Sushanta Bhowmick</span>
            </div>
          </div>

          <Button className=" rounded-full m-2">Follow</Button>
        </div>
          
          <div className="flex justify-between py-2 gap-16">
            <div className="flex gap-4 items-center">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                className=" w-[55px] h-[55px] rounded-full"
                alt=""
              />
              <div>
                <h1 className=" font-[600] text-[18px]">sushanta8514</h1>
                <span className=" text-gray-500">Sushanta Bhowmick</span>
              </div>
            </div>

            <Button className=" rounded-full m-2">Follow</Button>
          </div>

      </div>
    </div>
  );
};

export default SuggestFriend;
