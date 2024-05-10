import React from "react";
import logo from "../../Media/Group 5489.png";
import healthy from "../../Media/Layer 5.png";
import { useNavigate } from "react-router-dom";

const Onboard1 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-full w-3/4 left-44 max-lg:left-0 absolute top-24 max-lg:top-14 h-fit ">
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
          <div className="h-64 max-lg:h-4/5 flex justify-evenly flex-col mt-8">
            <h2 className="text-5xl w-full mx-auto text-center max-lg:text-5xl text-lanternOrange">
              Healthy Choices
            </h2>
            <div className=" font-sans h-1/3 w-full flex justify-evenly flex-col text-lg max-lg:text-base font-normal max-lg:w-11/12 max-lg:mx-auto">
              <h6  className="font-sans font-normal text-center">Healthy food should not be traded off for convenience.</h6>
              <h6  className="font-sans font-normal text-center">
                Let your loved ones be nourished with nutritious food even when
                you have a busy day.
              </h6>
              <h6  className="font-sans font-normal text-center">Check out our wide variety of choices available for you.</h6>
            </div>
            <div className="w-20 h-3 rounded border-2 border-lanternOrange mx-auto my-3 max-lg:my-0">
              <div className="w-1/4 bg-lanternOrange h-full"></div>
            </div>
          </div>
          <div className="w-11/12 mx-auto" onClick={() => navigate("/Onboard2")}>
            <button className="w-full h-14 rounded-xl bg-lanternOrange text-white font-sans max-lg:h-12 max-lg:mb-5 max-lg:">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard1;
