import React from "react";
import Topnav from "../Reusable/Topnav";
import { TextField } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditVehicle = () => {
  const navigate = useNavigate()
  const {Id} = useParams()
  return (
    <div>
      <div>
        <Topnav />
        <Link
          to={`/driveradmin/editdriver/ ${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
         
          <h6 className="flex items-center"> <ChevronLeft />Edit Vehicle</h6>
        </Link>
      </div>
      <div className="w-11/12 mx-auto">
        <TextField
          id="filled-search"
          placeholder="Registration number"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          placeholder="Vehicle Make"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          placeholder="Vehicle model"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          placeholder="Description"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
        />
       
      </div>
      <div className="w-11/12 mx-auto">
        <button className=" bg-green-500 text-white w-full h-10 rounded" onClick={()=>navigate("/driveradmin/unassignedvehicle")}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditVehicle;
