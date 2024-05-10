import {
  ChevronLeft,
  CloudQueue,
  Delete,
  PublishedWithChanges,
} from "@mui/icons-material";
import React from "react";
import Topnav from "../Reusable/Topnav";
import { Link } from "react-router-dom";
import { CalendarIcon } from "@mui/x-date-pickers";

const EditdriverImg = () => {
  return (
    <div className="h-full ">
      <div>
        <Topnav />
        <Link
          to="/driver/arrived"
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <ChevronLeft />
          <h6>Upload Images</h6>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-fit mt-2">
        <div className="w-11/12 mx-auto rounded h-44 bg-slate-400"></div>
        <h6 className="text-center text-slate-500">Profile.jpg</h6>
        <div className="flex w-11/12 justify-between mx-auto">
          <div className=" text-lanternOrange flex items-center">
            <PublishedWithChanges />
            <h6>Change</h6>
          </div>
          <div className=" text-slate-500 flex items-center">
            <CalendarIcon />
            <h6>Preview</h6>
          </div>
          <div className=" text-red-600 flex  items-center">
            <Delete />
            <h6>Delete</h6>
          </div>
          <div className=" text-green-600 flex  items-center">
            <CloudQueue />
            <h6>Upload</h6>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-fit mt-2">
        <div className="w-11/12 mx-auto rounded h-44 bg-slate-400"></div>
        <h6 className="text-center text-slate-500">Profile.jpg</h6>
        <div className="flex w-11/12 justify-between mx-auto">
          <div className=" text-lanternOrange flex items-center">
            <PublishedWithChanges />
            <h6>Change</h6>
          </div>
          <div className=" text-slate-500 flex items-center">
            <CalendarIcon />
            <h6>Preview</h6>
          </div>
          <div className=" text-red-600 flex  items-center">
            <Delete />
            <h6>Delete</h6>
          </div>
          <div className=" text-green-600 flex  items-center">
            <CloudQueue />
            <h6>Upload</h6>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-fit mt-2">
        <div className="w-11/12 mx-auto rounded h-44 bg-slate-400"></div>
        <h6 className="text-center text-slate-500">Profile.jpg</h6>
        <div className="flex w-11/12 justify-between mx-auto">
          <div className=" text-lanternOrange flex items-center">
            <PublishedWithChanges />
            <h6>Change</h6>
          </div>
          <div className=" text-slate-500 flex items-center">
            <CalendarIcon />
            <h6>Preview</h6>
          </div>
          <div className=" text-red-600 flex  items-center">
            <Delete />
            <h6>Delete</h6>
          </div>
          <div className=" text-green-600 flex  items-center">
            <CloudQueue />
            <h6>Upload</h6>
          </div>
        </div>
      </div>
      <div className="pb-6 w-full mx-auto fixed bg-white bottom-0">
        <button className=" w-full bg-green-500 text-white mx-auto h-12 rounded">Save Changes</button>
      </div>
    </div>
  );
};

export default EditdriverImg;
