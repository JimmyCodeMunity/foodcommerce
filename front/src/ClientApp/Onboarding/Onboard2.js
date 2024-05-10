import React from "react";
import logo from "../../Media/Group 5489.png";
import healthy from "../../Media/Layer 5.png";
import { useNavigate } from "react-router-dom";

const Onboard2 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-full w-3/4 left-44 max-lg:left-0 absolute top-24 max-lg:top-14 h-3/4 ">
        <h6
          className=" font-sans font-normal text-gray-600  mr-36  mt-10 max-lg:mt-32 text-end max-lg:mr-4"
          onClick={() => navigate("/signup")}
        >
          Skip
        </h6>
        <div className="container w-2/5 h-fit mx-auto flex flex-col items-center max-lg:w-full max-lg:h-full max-lg:justify-between">
          <div className=" mx-auto">
            <img src={healthy} alt="healthy choices" className="w-40 h-40" />
          </div>
          <div className="h-64 max-lg:h-4/5 flex justify-evenly flex-col mt-5">
            <h2 className="text-6xl w-full mx-auto text-center max-lg:text-5xl text-lanternOrange">
              Fast Delivery
            </h2>
            <div className=" font-sans w-1/2 text-center flex justify-between flex-col text-lg max-lg:text-base max-lg:w-11/12 mx-auto">
              <h6 className="font-sans font-normal">
                Our vast systems and partnerships are geared towards ensuring
                your meal is delivered to your doorstep as quickly and safely as
                possible.
              </h6>
            </div>
            <div className="w-20 h-3 rounded border-2 border-lanternOrange mx-auto mb-2">
              <div className="w-1/2 bg-lanternOrange h-full mx-auto"></div>
            </div>
            <div className="w-full" onClick={() => navigate("/Onboard3")}>
              <button className="w-full h-14 rounded-xl bg-lanternOrange text-white font-sans max-lg:h-12 max-lg:my-4 max-lg:">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard2;
