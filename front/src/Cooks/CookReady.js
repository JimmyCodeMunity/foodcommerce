import React from "react";
import {useNavigate } from "react-router-dom";
import { CookData } from "../Reusable/CookData";
import { CooksNav } from "../Reusable/DriverNav";


const CookReady = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
    <div className="max-lg:w-full max-lg:mx-auto w-3/4 ml-5">
        <CookData />
        <div className="h-1/2 overflow-auto flex flex-col justify-between">
          <div className="flex justify-between items-center w-11/12 h-24 mt-3 mx-auto">
            <div className="flex items-center" onClick={() => navigate("")}>
              <div className="w-14 h-14 rounded-full bg-slate-500 mr-3"></div>
              <div className="flex flex-col justify-evenly h-full">
                <div className="flex w-full justify-between flex-col">
                  <h6 className="font-semibold">KSH 5,000</h6>
                  <h6 className="text-sm text-slate-500">Order id:SRD7824</h6>
                </div>
              </div>{" "}
            </div>

            <div>
              <h6 className="font-semibold">OTP: 123456</h6>
              <h6 className="text-slate-500 text-center">12 mins</h6>
            </div>
          </div>
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};
export default CookReady;
