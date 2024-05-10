import React, { useContext, useEffect, useState } from "react";
import logo from "../../Media/Group 5489.png";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Storage from "../../Storage/AuthSession";
import { AuthContext } from "../../Helper/Context";


const RiderLogin = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const {setIsLoggedIn} = useContext(AuthContext)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_RIDER_URL + "/rider-company-login",
        {
          email: email,
          password: password,
          latitude: latitude,
          longitude:longitude
        }
      );

      const data = response.data;

      console.log(data.user.id);

      if (data.status === "success") {
        Storage.saveToken(data.token);
        setLoading(false);
        if (data.token) {
          setIsLoggedIn(true);
        }
        history(`/driver/home/${data.user.id}`);
      } else {
        setLoading(false);
        setError("Please confirm passwords match");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while processing your request.");
    }
  };
  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-44  max-lg:h-4/5">
        <div>
          <h2 className="text-5xl text-lanternOrange">Login</h2>
        </div>
        <div className="flex flex-col">
          <TextField
            margin="dense"
            id="filled-basic"
            label="Enter email address/ phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="dense"
            type="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Link to="/resetphone" className="w-full">
            <h6 className="font-sans text-end mt-2 font-normal">
              Forgot Password?
            </h6>
          </Link>
        </div>
        <div className="w-full mt-3 mx-auto rounded-lg bg-lanternOrange text-white h-12">
          <button
            className="font-sans w-full h-full text-white"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="font-sans w-full my-3">
          <h6 className="text-center font-normal">
            Don't have an account?{" "}
            <span className=" text-lanternOrange">
              <Link to="/signup" className="text-lanternOrange">
                Create Account
              </Link>
            </span>
          </h6>
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

export default RiderLogin;
