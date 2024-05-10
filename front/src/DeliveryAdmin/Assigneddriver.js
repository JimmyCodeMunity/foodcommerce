import React from "react";
import Topnav from "../Reusable/Topnav";
import { DriverAdminNav } from "../Reusable/DriverNav";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useParams } from "react-router-dom";

const Assigneddriver = () => {
  const {Id} = useParams()
  return (
    <div className="  ">
      <Topnav />
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
        <h6 className="ml-4">Assign Driver</h6>
      </div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
        className="w-11/12 mx-auto mt-2 border border-slate-700 shadow-none"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className="flex w-11/12  my-4 mx-auto">
        <div className="border-b-2 border-black w-1/2">
          <h6 className="text-center font-[kalam]">Assigned</h6>
        </div>
        <div className=" w-1/2 text-center">
          <Link to={`/driveradmin/unassigneddriver/${Id}`} className=" font-[kalam]">Unassigned</Link>
        </div>
      </div>
      <div className="w-full h-4/5 overflow-auto">
        <Link to={`/driveradmin/editdriver/ ${Id}`}className="w-11/12 mx-auto my-2">
          <div className="flex w-11/12 mx-auto my-4 ">
            <div className="w-14 h-14 rounded-full bg-slate-400 mr-4"></div>
            <div>
              <h6 className="text-slate-600">Driver's Name</h6>
              <h6 className="text-slate-600">254 123 456 789</h6>
            </div>
          </div>
        </Link>
        <Link to={`/driveradmin/editdriver/ ${Id}`} className="w-11/12 mx-auto my-2">
          <div className="flex w-11/12 mx-auto my-4 ">
            <div className="w-14 h-14 rounded-full bg-slate-400 mr-4"></div>
            <div>
              <h6 className="text-slate-600">Driver's Name</h6>
              <h6 className="text-slate-600">254 123 456 789</h6>
            </div>
          </div>
        </Link>
        <Link to={`/driveradmin/editdriver/ ${Id}`}className="w-11/12 mx-auto my-2">
          <div className="flex w-11/12 mx-auto my-4 ">
            <div className="w-14 h-14 rounded-full bg-slate-400 mr-4"></div>
            <div>
              <h6 className="text-slate-600">Driver's Name</h6>
              <h6 className="text-slate-600">254 123 456 789</h6>
            </div>
          </div>
        </Link>
        <Link to={`/driveradmin/editdriver/ ${Id}`}className="w-11/12 mx-auto my-2">
          <div className="flex w-11/12 mx-auto my-4 ">
            <div className="w-14 h-14 rounded-full bg-slate-400 mr-4"></div>
            <div>
              <h6 className="text-slate-600">Driver's Name</h6>
              <h6 className="text-slate-600">254 123 456 789</h6>
            </div>
          </div>
        </Link>
      </div>
      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverAdminNav />
      </div>
    </div>
  );
};

export default Assigneddriver;
