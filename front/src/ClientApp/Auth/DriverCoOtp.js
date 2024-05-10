import React, { useContext, useState } from "react";
import logo from "../../Media/Group 5489.png";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext } from "../../Helper/Context";



const Otp = () => {
  const history = useNavigate();
  const [formValue, setFormValues] = useState({otp:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_DRIVER_URL + "/deliverycompany-otp-verify",
        {
          otp: formValue.otp,
        }
      );

      const data = response.data;
      setLoading(false);

      if (data.status === "success") {
        setError("");
        history("/driveradmin/secure");
      }
      else{
        setError(response.data.message)
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="  relative">
        <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
          <img src={logo} alt="lantern food app" className="w-full" />
        </div>
        <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-44  max-lg:h-4/5">
          <div>
            <h2 className="text-5xl text-lanternOrange">Verify your phone</h2>
            <h6 className="font-sans mt-5 font-normal">
              Enter OTP sent to your phone number
            </h6>
          </div>
          <div className="flex flex-col">
            <TextField
              margin="normal"
              id="filled-basic"
              label="OTP"
              value={formValue.otp}
              onChange={(e) =>
                setFormValues({ ...formValue, otp: e.target.value })
              }
              variant="outlined"
            />
            <div className="w-full">
              <h6 className="font-sans text-end font-normal">
                Resend OTP
              </h6>
            </div>
          </div>
          <div className="w-full mt-3 mx-auto rounded-lg bg-lanternOrange text-white h-12">
            <button
              className="font-sans w-full h-full text-white"
              onClick={handleSubmit}
            >
              Verify Phone Number
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
          {error &&  (
            <Alert severity="error" className="w-full absolute top-1/2 ">
              {error.message}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default Otp;
