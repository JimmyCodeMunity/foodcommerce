import React from "react";
import logo from "../../Media/Group 5489.png";
import healthy from "../../Media/Clip path group.png";
import { useNavigate } from "react-router-dom";

const Onboard3 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-full w-3/4 left-44 max-lg:left-0 absolute top-8 max-lg:top-24 h-3/4 ">
        <div className="container w-2/5 h-fit  flex flex-col items-center max-lg:w-full max-lg:h-4/5 mt-32 max-lg:justify-between">
          <div className=" mx-auto">
            <img src={healthy} alt="healthy choices" className="w-52 h-52" />
          </div>
          <div className="h-64 max-lg:h-4/5 flex justify-evenly flex-col mt-8">
            <h2 className="text-6xl w-full mx-auto text-center max-lg:text-5xl text-lanternOrange">
              Easy Payment
            </h2>
            <div className=" font-sans w-full flex justify-between flex-col text-lg max-lg:text-base max-lg:w-11/12 max-lg:mx-auto ">
              <h6 className="font-sans font-normal">
                We have adopted the easiest means of payments for your meals for
                faster and safer transactions.
              </h6>
            </div>
          </div>
          <div className="w-20 h-3 rounded border-2 border-lanternOrange mx-auto mb-2">
            <div className="w-1/3 bg-lanternOrange h-full float-right"></div>
          </div>
          <div className="w-full" onClick={() => navigate("/signup")}>
            <button className="w-full h-14 rounded-xl bg-lanternOrange text-white font-sans max-lg:h-12 max-lg:my-6 max-lg:">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard3;
