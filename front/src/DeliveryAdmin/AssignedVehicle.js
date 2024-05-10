import React from "react";
import Topnav from "../Reusable/Topnav";
import { ChevronLeft, Search } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import { DriverAdminNav } from "../Reusable/DriverNav";

const AssignedVehicle = () => {
  const { Id } = useParams();
  return (
    <div className="h-full ">
      <div>
        <Topnav />
        {/* <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
          <h6 className="flex items-center">
            <ChevronLeft />
            Assign Vehicle
          </h6>
        </div> */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            marginY: "1rem",
          }}
          className="w-11/12 mx-auto border border-slate-700 shadow-none"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <div className="flex w-11/12 justify-between mx-auto">
          <div className="border-b-2 border-black w-1/2">
            <h6 className="text-center font-[kalam]">Assigned</h6>
          </div>
          <div className=" w-1/2 text-center font-[kalam]">
            <Link to={`/driveradmin/unassignedvehicle/${Id}`}>Unassigned</Link>
          </div>
        </div>
      </div>
      <div className="h-4/5 overflow-auto">
        <div className="w-11/12 flex flex-col justify-between h-fit border-2  rounded items-center mx-auto my-3">
          <div className="flex justify-between w-11/12 mx-auto mt-2">
            <div>
              <div>
                <h6 className=" font-semibold">Ahmed Abubakar</h6>
                <h6 className="font-normal text-sm">Rider Name</h6>
              </div>
              <div>
                <h6 className="font-semibold">4.6 Stars</h6>
                <h6 className="font-normal text-sm">Ratings</h6>
              </div>
            </div>
            <div>
              <div>
                <h6 className="font-semibold">KMFE 865w</h6>
                <h6 className="font-normal text-sm">Vehicle Reg</h6>
              </div>
              <div>
                <h6 className="font-semibold">Bajaj Motorbike</h6>
                <h6 className="font-normal text-sm">Vehicle Description</h6>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-11/12 my-2">
            <div className="w-fit h-8 rounded-xl">
              <Link to={`/driveradmin/editdriver/ ${Id}`}>
                <button className="bg-red-600 text-white px-2  mr-4 rounded-xl h-8">
                  Unassign Driver
                </button>
              </Link>
            </div>
            <div className="w-20 h-8 rounded-xl">
              <Link to={`/driveradmin/editdriver/ ${Id}`}>
                <button className="text-white w-full bg-green-500 rounded-xl h-8">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-11/12 flex flex-col justify-between h-fit border-2  rounded items-center mx-auto my-3">
          <div className="flex justify-between w-11/12 mx-auto mt-2">
            <div>
              <div>
                <h6 className=" font-semibold">Ahmed Abubakar</h6>
                <h6 className="font-normal text-sm">Rider Name</h6>
              </div>
              <div>
                <h6 className="font-semibold">4.6 Stars</h6>
                <h6 className="font-normal text-sm">Ratings</h6>
              </div>
            </div>
            <div>
              <div>
                <h6 className="font-semibold">KMFE 865w</h6>
                <h6 className="font-normal text-sm">Vehicle Reg</h6>
              </div>
              <div>
                <h6 className="font-semibold">Bajaj Motorbike</h6>
                <h6 className="font-normal text-sm">Vehicle Description</h6>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-11/12 my-2">
            <div className="w-fit h-8 rounded-xl">
              <Link to={`/driveradmin/editdriver/ ${Id}`}>
                <button className="bg-red-600 text-white px-2  mr-4 rounded-xl h-8">
                  Unassign Driver
                </button>
              </Link>
            </div>
            <div className="w-20 h-8 rounded-xl">
              <Link to={`/driveradmin/editdriver/ ${Id}`}>
                <button className="text-white w-full bg-green-500 rounded-xl h-8">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-11/12 flex flex-col justify-between h-fit border-2  rounded items-center mx-auto my-3">
          <div className="flex justify-between w-11/12 mx-auto mt-2">
            <div>
              <div>
                <h6 className=" font-semibold">Ahmed Abubakar</h6>
                <h6 className="font-normal text-sm">Rider Name</h6>
              </div>
              <div>
                <h6 className="font-semibold">4.6 Stars</h6>
                <h6 className="font-normal text-sm">Ratings</h6>
              </div>
            </div>
            <div>
              <div>
                <h6 className="font-semibold">KMFE 865w</h6>
                <h6 className="font-normal text-sm">Vehicle Reg</h6>
              </div>
              <div>
                <h6 className="font-semibold">Bajaj Motorbike</h6>
                <h6 className="font-normal text-sm">Vehicle Description</h6>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-11/12 my-2">
            <div className="w-fit h-8 rounded-xl">
              <Link to={`/driveradmin/editdriver/ ${Id}`}>
                <button className="bg-red-600 text-white px-2  mr-4 rounded-xl h-8">
                  Unassign Driver
                </button>
              </Link>
            </div>
            <div className="w-20 h-8 rounded-xl">
              <Link to={`/driveradmin/editdriver/ ${Id}`}>
                <button className="text-white w-full bg-green-500 rounded-xl h-8">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverAdminNav />
      </div>
    </div>
  );
};

export default AssignedVehicle;
