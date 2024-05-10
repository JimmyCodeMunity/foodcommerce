import { ChevronLeft } from "@mui/icons-material";
import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NewNumber = () => {
  return (
    <div>
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white">
        <Link to="/cook/home" className="text-white">
          <h6 className="flex items-center">
            <ChevronLeft />
            Change Mpesa Number
          </h6>
        </Link>
      </div>
      <div className="max-lg:w-11/12 w-1/2 mt-4 mx-auto">
        <FormControl variant="standard" className="w-full">
          <h6>
            Enter your new number
          </h6>
          <TextField
            id="input-with-icon-adornment"
            placeholder="Phone number"
            variant="outlined" 
            type="number"
          />
          
        </FormControl>
      </div>
      <div className="w-11/12 mx-auto h-10 bg-lanternOrange text-white mt-4 rounded-md">
        <Link to='/cook/verifyno' className="text-white">
           <button className="w-full h-full">Change Number</button>  
        </Link>
       
      </div>
    </div>
  );
};

export default NewNumber;
