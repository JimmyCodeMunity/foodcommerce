import { ChevronLeft, Search } from "@mui/icons-material";
import React from "react";
import Topnav from "../Reusable/Topnav";
import { Link, useParams } from "react-router-dom";
import { CalendarIcon } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";

import {
  CardContent,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";

const rows = [
  {
    id: 1,
    TID: "TID436",
    OrderID: "World",
    Transactiontype: "deposit",
    Date: "12/12/2023",
    Status: "pending",
  },
  {
    id: 1,
    TID: "TID436",
    OrderID: "World",
    Transactiontype: "deposit",
    Date: "12/12/2023",
    Status: "pending",
  },
  {
    id: 1,
    TID: "TID436",
    OrderID: "World",
    Transactiontype: "deposit",
    Date: "12/12/2023",
    Status: "pending",
  },
];

const columns = [
  { field: "TID", headerName: "TID" },
  { field: "OrderID", headerName: "Order ID" },
  { field: "Transactiontype", headerName: "Transaction Type" },
  { field: "Date", headerName: "Date" },
  { field: "Status", headerName: "Status" },
];

const Analytics = () => {
  const {Id} = useParams()
  return (
    <div className="  ">
      <Topnav />
      <Link
        to={`/driveradmin/myaccount/${Id}`}
        className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Analytics
        </h6>
      </Link>
      <div className="font-sans w-11/12 mx-auto">
        <div>
          <h6 className=" text-2xl font-semibold capitalize ml-2">
            Your Financial Analytics
          </h6>
          <h6 className="font-sans ml-2">Sat, 21 Oct 2023</h6>
        </div>
        <Paper
          component="form"
          className="w-full justify-between my-4 mx-auto  border border-slate-700"
          sx={{
            p: "2px 4px",
            ml: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <CalendarIcon />
          </IconButton>
          <InputBase
            placeholder="01-10-2001 - 20-01-2002"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <div className="flex justify-between mb-4 w-full">
          <CardContent className=" bg-gradient-to-b from-lanternOrange/90 via-lanternOrange/700 to-slate-800  mr-4 text-white w-full rounded">
            <h6 className="text-4xl" gutterBottom>
              24
            </h6>
            <h6 className="text-lg">Unpaid Deliveries</h6>
            <Typography sx={{ fontSize: 24 }} color="white">
              KES 2,400
            </Typography>
          </CardContent>
          <CardContent className=" bg-gradient-to-b from-lanternOrange/90 via-lanternOrange/700 to-slate-800    rounded text-white w-full">
            <h6 className="text-4xl" gutterBottom>
              24
            </h6>
            <h6 className="text-lg">Unpaid Deliveries</h6>
            <Typography sx={{ fontSize: 24 }} color="white">
              KES 2,400
            </Typography>
          </CardContent>
        </div>

        <Paper
          component="form"
          className="w-full justify-between mt-5 mx-auto  border border-slate-700"
          sx={{
            p: "2px 4px",
            ml: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <CalendarIcon />
          </IconButton>
          <InputBase
            placeholder="01-10-2001 - 20-01-2002"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <div>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
