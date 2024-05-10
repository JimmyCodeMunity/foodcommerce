import {  ChevronLeft, Star } from "@mui/icons-material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Topnav from "../Reusable/Topnav";

const Viewdriver = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const {Id} = useParams()

  return (
    <div className="font-sans   ">
      <Topnav />
      <Link
        to="/driver/arrived"
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
      >
        <ChevronLeft />
        <h6>View Active Orders</h6>
      </Link>
      <div className="bg-black h-2/5 py-5">
        <div className="h-full w-1/2 mx-auto text-white font-sans">
          <div className="w-24 h-24 rounded-full bg-gray-600 mx-auto mb-4"></div>
          <div>
            <h6 className="text-xl font-bold text-white w-full text-center">
              Ahmed Abubakar
            </h6>
            <h6 className="text-center w-full">+254 689 076 124</h6>
            <div className="flex justify-evenly4 items-center w-11/12 text-center">
              <h6 className="flex justify-between items-center w-full text-center">
                <Star />
                4.3<span>(312 Reviews)</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 justify-between mx-auto my-4">
        <div className="w-1/2 mr-4 h-16 flex justify-between flex-col">
          <h6 className=" font-light">License plate number</h6>
          <h6 className="border-b border-slate-500">kdc 24578</h6>
        </div>
        <div className="w-1/2 h-16 flex justify-between flex-col">
          <h6 className="font-light">Vehicle</h6>
          <h6 className="border-b border-slate-500">Nissan</h6>
        </div>
      </div>
      <div className="flex items-center mt-5">
        <Switch {...label} />
        <h6>Deactivate Driver</h6>
      </div>
      <div className="flex w-11/12 mx-auto justify-between mt-5">
        <button className=" w-1/2 h-14 mr-2 rounded border-2 border-slate-700 text-slate-700">
          <Link to={`/driveradmin/editdriver/ ${Id}`} className="no-underline text-slate-700">Edit Driver Details</Link>
        </button>
        <button className="w-1/2 rounded bg-green-500 text-white">
          <Link to={`/driveradmin/assignvehicle/${Id}`}> Assign Vehicle</Link>
         
        </button>
      </div>
    </div>
  );
};

export default Viewdriver;
