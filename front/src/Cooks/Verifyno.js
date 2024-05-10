import { ChevronLeft } from "@mui/icons-material";
import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Verifyno = () => {
  const {Id} = useParams()
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
            Enter OTP sent to your phone number
          </h6>
          <TextField
            id="input-with-icon-adornment"
            placeholder="OTP"
            variant="outlined" 
            type="number"
          />
          <h6 className="w-full text-right mt-2">Resend OTP</h6>
        </FormControl>
      </div>
      <div className="w-11/12 mx-auto h-10 bg-lanternOrange text-white mt-4 rounded-md">
      <Link to={`/cook/profileinfo/${Id}`}className="text-white">
        <button className="w-full h-full">Verify New Number</button>
        </Link>
      </div>
    </div>
  );
};

export default Verifyno;
