import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex h-[793px] w-[740px] animate-pulse flex-col items-center justify-start bg-icon-white mt-3">
        <div className="flex flex-row items-start w-full gap-2 mt-1 mb-5">
          <div className="h-[37px] w-[41px] bg-[#F2F3F4]"></div>
          <div className="h-[37px] w-[138px] bg-[#F2F3F4]"></div>
          <div className="h-[37px] w-[138px] bg-[#F2F3F4]"></div>
          <div className="h-[37px] w-[138px] bg-[#F2F3F4]"></div>
          <div className="h-[37px] w-[138px] bg-[#F2F3F4]"></div>
          <div className="h-[37px] w-[138px] bg-[#F2F3F4]"></div>
        </div>

        <div className="mb-5 h-[100px] w-full bg-[#F2F3F4]"></div>
        <div className=" mb-5 h-[330px] w-full  rounded bg-[#F2F3F4] "></div>


          <div className="flex h-[500px] w-full flex-row items-center justify-between gap-8 ">
          <div className="flex h-full w-[376px] flex-col  gap-3">
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
              <div className="h-[45px] w-full rounded bg-[#F2F3F4]"></div>
            </div>

          <div className=" h-full w-[376px] rounded bg-[#F2F3F4]"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
