import React from "react";
import logo from "../../Media/Group 5489.png";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Resetotp = () => {
  const navigate = useNavigate();
  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-44  max-lg:h-4/5">
        <div>
          <h2 className="text-5xl text-lanternOrange">Reset Password</h2>
          <h6 className="font-sans mt-3 font-normal">
            Enter OTP sent to your phone
          </h6>
        </div>
        <div className="flex flex-col">
          <TextField
            margin="dense"
            type="number"
            id="filled-basic"
            placeholder="Enter OTP"
            variant="outlined"
          />
          <div className="w-full">
            <h6 className="font-sans text-end font-normal">Resend OTP</h6>
          </div>
        </div>
        <div
          className="w-full mt-3 mx-auto rounded-lg bg-lanternOrange text-white h-12"
          onClick={() => navigate("/resetpassword")}
        >
          <button className="font-sans w-full h-full">
            Verify Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resetotp;
