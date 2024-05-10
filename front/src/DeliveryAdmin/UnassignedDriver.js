import React, { useEffect, useState } from "react";
import Topnav from "../Reusable/Topnav";
import { DriverAdminNav } from "../Reusable/DriverNav";
import { Add } from "@mui/icons-material";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useParams } from "react-router-dom";
import { apiDriver } from "../Storage/ApiClient";

const UnassignedDriver = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiDriver
        .get("/delivery-company/drivers")
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="  relative">
        <Topnav />
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
        <div className="flex w-11/12 justify-between my-4 mx-auto">
          <div className="w-1/2 text-center">
            <Link
              to={`/driveradmin/assigneddriver/${Id}`}
              className="text-center  font-[kalam]"
            >
              Assigned
            </Link>
          </div>
          <div className="border-b-2 border-black w-1/2 text-center">
            <h6 className="text-center  font-[kalam]">Unassigned</h6>
          </div>
        </div>
        <div className=" w-full h-4/5 overflow-auto">
          {data[0]?.map((item, index) => {
            return (
              <Link to={`/driveradmin/editdriver/${item.id}`}>
                  <div className="w-11/12 mx-auto my-4" key={index.id}>
                <div className="flex w-11/12 mx-auto h-20 my-4 ">
                  <div className="w-14 h-14 rounded-full bg-slate-400 mr-4"></div>
                  <div>
                    <h6>{item.driver_name}</h6>
                    <h6>{item.phone_number}</h6>
                  </div>
                </div>
              </div>
              </Link>
            
            );
          })}

          <div className="w-11/12 mx-auto">
            <Link to={`/driveradmin/driveredit/${Id}`}>
              <button className="w-full bg-lanternOrange text-white rounded h-10">
                <Add /> Add a driver
              </button>
            </Link>
          </div>
        </div>
        <div className="pb-6 w-full fixed bg-white bottom-0">
          <DriverAdminNav />
        </div>
      </div>
    </div>
  );
};

export default UnassignedDriver;
