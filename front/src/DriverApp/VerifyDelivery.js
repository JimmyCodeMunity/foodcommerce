import React, { useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
import auth from "../Media/arcticons_otp-authenticator.png";
import wrong2 from "../Media/error-alert-filled.png";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Topnav from "../Reusable/Topnav";
import { apiRider } from "../Storage/ApiClient";

const VerifyDelivery = () => {
  const {Id} = useParams()
  const [wrong] = useState(true);
  const Navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [otp,setOtp] = useState("")

  
  const authenticateOrder = async () => {
    setLoading(true)
    try {
      const response = await apiRider.post(`/driver/client-delivery-order/${Id}`, { otp });
      const { status, message } = response.data;
      if (status === "success") {
        setLoading(false)
        Navigate("/driver/clientsuccess");
      } else {
        setLoading(false)
        console.error("Incorrect OTP");
        setError("Incorrect OTP");

      }
    } catch (error) {
      setLoading(false)
      console.error("Error authenticating order:", error);
    }
  };
  return (
    <div className="h-full ">
          {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Link to="/driver/clientdelivery">
        <h6 className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white text-left">
          <ChevronLeft />
          Authentication
        </h6>
      </Link>
      <div className="h-4/5 my-auto flex flex-col justify-evenly font-sans">
        {wrong === false ? (
          <img
            src={auth}
            alt="driverlanternapp"
            className="w-44 h-44 mx-auto"
          />
        ) : (
          <img
            src={wrong2}
            alt="driverlanternapp"
            className="w-44 h-44 mx-auto"
          />
        )}
        <div className="w-11/12 mx-auto flex justify-evenly h-1/3 flex-col">
          <h6 className="text-center text-black text-xl h-full">
            Authenticate
          </h6>
          {error != "" ? (
            <h6 className="text-center text-xl font-normal text-red-600">
              Please enter the correct OTP for order #KEY3241TE
            </h6>
          ) : (
            <h6 className="text-center text-xl font-normal">
              Please enter OTP provided by the client to verify you delivered
              the order
            </h6>
          
          )}
         <TextField
            margin="normal"
            type="number"
            id="filled-basic"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            variant="outlined"
            className="w-full"
          />
          <button
            className="w-full rounded text-center text-xl font-normal bg-lanternOrange py-2 mt-4 text-white"
          onClick={authenticateOrder}
          >
            Authenticate
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDelivery;
