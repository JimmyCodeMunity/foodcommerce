import { ChevronLeft, FilterList } from "@mui/icons-material";
import React from "react";
import Topnav from "../Reusable/Topnav";
import { Link, useParams } from "react-router-dom";
import { CalendarIcon } from "@mui/x-date-pickers";

import { DataGrid } from "@mui/x-data-grid";

import { CardContent } from "@mui/material";

const rows = [
  {
    id: 1,
    Plate: "TID436",
    Driver: "World",
    Amount: "deposit"
  },
  {
    id: 1,
    Plate: "TID436",
    Driver: "World",
    Amount: "deposit"
  },
  {
    id: 1,
    Plate: "TID436",
    Driver: "World",
    Amount: "deposit",
  },
];

const columns = [
  { field: "Plate", headerName: "Plate" },
  { field: "Driver", headerName: "Driver" },
  { field: "Amount", headerName: "Amount" },
 
];

const MyFinancials = () => {
  const {Id} = useParams()
  return (
    <div className="  ">
      <Topnav />
      <Link
        to={`/driveradmin/myaccount/${Id}`}
        className="h-14 flex font-sans items-center w-full bg-lanternOrange text-black text-left"
      >
       <h6 className="flex items-center">  <ChevronLeft />
       Your Financials</h6>
      </Link>
      <div className="font-sans w-11/12 mx-auto">
        <div className="h-24 flex flex-col justify-evenly">
          <h6 className=" text-2xl font-[Lambency]  capitalize ml-2">
            Your Financial Analytics
          </h6>
          <h6 className="font-sans ml-2">Sat, 21 Oct 2023</h6>
        </div>
        <div className="font-sans flex border border-gray-300 w-11/12 mx-auto px-2 rounded-xl my-4 justify-between h-10 items-center">
          <CalendarIcon />
          <h6 className="px-2">06-09-2023 - -6-10-2023</h6>
          <FilterList />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 w-full">
          <CardContent className=" bg-lanternOrange/20  text-black w-full rounded">
            <h6 className="text-3xl" gutterBottom>
              45
            </h6>
            <h6 className="text-lg text-slate-700">Number of orders</h6>
          </CardContent>
          <CardContent className=" bg-lanternOrange/20 text-black w-full rounded flex flex-col justify-between">
            <h6 className="text-3xl" gutterBottom>
              24%
            </h6>
            <h6 className="text-lg text-slate-700">Timelines</h6>
          </CardContent>
          <CardContent className=" bg-lanternOrange/20 text-black w-full rounded flex flex-col justify-between">
            <h6 className="text-3xl" gutterBottom>
              24
            </h6>
            <h6 className="text-lg text-slate-700">Total Deliveries</h6>
          </CardContent>
          <CardContent className=" bg-lanternOrange/20 text-black w-full rounded flex flex-col justify-between">
            <h6 className="text-3xl" gutterBottom>
              KES 2,400
            </h6>
            <h6 className="text-lg text-slate-700">Earnings</h6>
          </CardContent>
          <CardContent className=" bg-lanternOrange/20 text-black w-full rounded flex flex-col justify-between">
            <h6 className="text-3xl" gutterBottom>
              2.4
            </h6>
            <h6 className="text-lg text-slate-700">Avg. Rating</h6>
          </CardContent>
        </div>
        <div>
        <h6 className="text-2xl font-semibold">Top vehicles/Riders</h6>

          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default MyFinancials;
