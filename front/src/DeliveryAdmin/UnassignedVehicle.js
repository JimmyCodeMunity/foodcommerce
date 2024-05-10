import React, { useEffect, useState } from "react";
import Topnav from "../Reusable/Topnav";
import { Add, ChevronLeft, Search } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import { DriverAdminNav } from "../Reusable/DriverNav";
import { apiDriver } from "../Storage/ApiClient";




const UnassignedVehicle = () => {
  const {Id} = useParams()
  const [data,setData] = useState([])
     // eslint-disable-next-line
  const [loading,setLoading] = useState(false)
     // eslint-disable-next-line
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      apiDriver
        .get("/delivery-company/vehicles")
        .then((response) => {
          setData(response.data.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
    fetchData()
  }, [])

  return (
    <div className="h-full ">
      <div>
        <Topnav />
        {/* <Link
          to={`/driveradmin/assignvehicle/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white "
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Unassign Vehicle
          </h6>
        </Link> */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          className="w-11/12 mx-auto mt-3 border border-slate-700 shadow-none"
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
        <div className="flex w-11/12 justify-between my-4 mx-auto font-[kalam]">
          <div className=" w-1/2 text-center">
            <Link to={`/driveradmin/assignedvehicle/${Id}`}>Assigned</Link>
          </div>
          <div className="border-b-2 border-black w-1/2 text-center">
            <h6 className=" font-[kalam]">Unassigned</h6>
          </div>
        </div>
      </div>
      <div className="w-11/12  h-4/5  mx-auto my-5 overflow-auto">
        {data?.map((item,index)=>{
          return(
            <Link key={index} to={`/driveradmin/viewvehicle/${item.id}`}className="w-11/12 mx-auto my-2">
        <div className="flex  mb-4 items-center">
          <div className="w-14 h-14 bg-slate-300 rounded-full mr-2"></div>
          <div>
            <h6>Reg Number</h6>
            <h6>{item.license_plate}</h6>
          </div>
        </div>
        </Link>  
          )
       
      })
     }
       
       
        <button className=" w-full mx-auto bg-lanternOrange text-white h-14 rounded">
          <Link to={`/driveradmin/addvehicle/${Id}`}>
            <h6 className="text-white pt-2">  <Add />
            Add a vehicle</h6>
          
          </Link>
        </button>
      </div>

      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverAdminNav />
      </div>
    </div>
  );
};

export default UnassignedVehicle;
