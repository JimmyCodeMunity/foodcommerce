import {
  ChevronLeft,
  CloudQueue,
  Delete,
  Download,
  PublishedWithChanges,
} from "@mui/icons-material";
import React from "react";
import Topnav from "../Reusable/Topnav";
import { Link, useParams } from "react-router-dom";

const UploadImg = () => {
  const {Id} = useParams()
  return (
    <div className="h-full ">
      <div>
        <Topnav />
        <Link
          to={`/driveradmin/addvehicle/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Upload Images
          </h6>
        </Link>
      </div>
      <div className="flex flex-col justify-evenly h-2/3">
        <div className="w-11/12 mx-auto rounded h-44 bg-slate-400"></div>
        <h6 className="text-center text-slate-500">Profile.jpg</h6>
        <div className="flex w-11/12 justify-between mx-auto">
          <div className=" text-lanternOrange flex flex-col items-center">
            <PublishedWithChanges />
            <h6>Change</h6>
          </div>
          <div className=" text-red-600 flex flex-col items-center">
            <Delete />
            <h6>Delete</h6>
          </div>
          <div className=" text-green-600 flex flex-col items-center">
            <CloudQueue />
            <h6>Upload</h6>
          </div>
        </div>
        <div className="w-11/12 mx-auto flex justify-between text-slate-400 border border-slate-400 p-2 rounded">
          <h6>infront.png</h6>
          <Download />
        </div>
        <div className="w-11/12 mx-auto">
          <button className=" bg-lanternOrange text-white w-full h-10 rounded">
            Save Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;
