import React from "react";
import logo from "../../Media/Group 5489.png";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Resetpswrd = () => {
  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-44  max-lg:h-4/5">
        <div>
          <h2 className="text-5xl text-lanternOrange">Reset Password</h2>
          <h6 className="font-sans font-normal">
            Set password to secure your account
          </h6>
        </div>
        <div className="flex flex-col">
          <TextField
            margin="dense"
            type="password"
            id="filled-basic"
            placeholder="New Password"
            variant="outlined"
          />
          <TextField
            margin="dense"
            type="password"
            id="filled-basic"
            placeholder="Confirm new Password"
            variant="outlined"
          />
        </div>
        <div className="w-full mx-auto mt-3 rounded-lg bg-lanternOrange text-white h-12">
          <Link to="/login" className="text-white">
            <button className="font-sans w-full h-full">Secure Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resetpswrd;
