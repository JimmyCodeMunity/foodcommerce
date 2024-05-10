import React, { useContext, useState } from "react";
import logo from "../../Media/Group 5489.png";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { EmailContext } from "../../Helper/Context";
import axios from "axios";

const DriverSecure = () => {
  const history = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_RIDER_URL + "/set-rider-password",
        {
          phone_number:phoneNumber,
          password: password,
        }
      );
      {
        setLoading(false);
        setMessage(response.data.message);
        history("/driver/login");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-44  max-lg:h-4/5">
        <div>
          <h2 className="text-5xl">Secure your account</h2>
          <h6 className="font-sans font-normal">
            Set password to secure your account. Do not share this with anyone
            for your security.
          </h6>
        </div>
        <div className="flex flex-col">
        <TextField
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter Phone Number"
            variant="outlined"
          />
          <TextField
            margin="normal"
            type="password"
            id="filled-basic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
            variant="outlined"
          />
         
        </div>
        <div className="w-11/12 mx-auto mt-5 rounded-lg bg-lanternOrange text-white h-12">
          <button className="font-sans w-full h-full" onClick={handleSubmit}>
            Secure Account
          </button>
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
          {message && (
            <Alert severity="error" className="w-full absolute top-1/2 ">
              {message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverSecure;
