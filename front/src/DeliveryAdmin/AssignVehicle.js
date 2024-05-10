import React, { useEffect, useState } from "react";
import Topnav from "../Reusable/Topnav";
import { ChevronLeft } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { apiDriver } from "../Storage/ApiClient";
import { Alert, Backdrop, CircularProgress } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AssignVehicle = () => {
  const {Id} = useParams()
  const [data, setData] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);  // eslint-disable-next-line
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

const handleCheckboxChange = (event, vehicleId) => {
  setSelectedVehicleId(vehicleId);
};

const assignVehicle = async () => {
  if (!selectedVehicleId) {
    setError("Please select a vehicle");
    return;
  }

  setLoading(true);
  try {
    const response = await apiDriver.post("/delivery-company/driver-allocate", {
      driver_id: Id,
      vehicle_id: selectedVehicleId,
    });
    console.log(response.data);
    setLoading(false);

  } catch (error) {
    console.log(error);
    setError("Failed to allocate vehicle");
    setLoading(false);
  }
};
  return (
    <div className="h-full ">
      <div>
        <Topnav />
        <Link
          to={`/driveradmin/assignedvehicle/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          
          <h6 className="flex items-center"><ChevronLeft />Assign Vehicle</h6>
        </Link>
      </div>
      <div className="h-4/5 overflow-auto">
       {data?.map((item,index)=>
     <div className="w-11/12 flex justify-between h-14 items-center mx-auto my-5" key={index}>
          <div className="w-14 h-14 bg-slate-500 rounded-full"></div>
          <div>
            <h6>Reg Number</h6>
            <h6>{item.license_plate}</h6>
          </div>
           <Checkbox
              {...label}
              checked={selectedVehicleId === item.id}
              onChange={(event) => handleCheckboxChange(event, item.id)}
            />
        </div>) }
    
        <div className="pb-6 w-11/12 flex justify-center mx-auto bg-white">
          <button className="w-full mx-auto bg-lanternOrange text-white  h-12 rounded" onClick={assignVehicle}>
            Assign Vehicle
          </button>
        </div>
      </div>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative h-44 w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      
      </div>
    </div>
  );
};

export default AssignVehicle
