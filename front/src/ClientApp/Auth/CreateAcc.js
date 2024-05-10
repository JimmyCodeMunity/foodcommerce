import React, { useContext, useEffect, useState } from "react";
import logo from "../../Media/Group 5489.png";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext } from "../../Helper/Context";

const CreateAcc = () => {
  const history = useNavigate();

  const { setEmail } = useContext(EmailContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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

  const position = latitude && longitude ? `${latitude}-${longitude}` : "";
  console.log(position)

  const initialState = {
    fullname: "",
    phoneNumber: "",
    email:"",
    address: "",
    phoneNumber: "",
    whatsappnumber:""
  };

  const [formValue, setFormValues] = useState(initialState);

  useEffect(() => {
    setFormValues(prevState => ({
      ...prevState,
      google_map_pin: position
    }));
  }, [position]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"client/createclient",
        formValue
      );
      console.log("Response:", response.data);
      if (response.data) {
        setLoading(false);
        setEmail(formValue.email);
        history("/otp");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
  };
  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-52  max-lg:h-4/5">
        <div>
          <h2 className="text-5xl text-lanternOrange">Creat Account</h2>
          <h6 className="font-sans font-normal">
            Let us know you for a better experience
          </h6>
        </div>
        <div className="flex flex-col justify-evenly my-4">
          <TextField
            margin="dense"
            id="filled-basic"
            label="Full Name"
            variant="outlined"
            value={formValue.fullname}
            onChange={(e) =>
              setFormValues({ ...formValue, fullname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Phone number"
            variant="outlined"
            value={formValue.phoneNumber}
            onChange={(e) =>
              setFormValues({ ...formValue, phoneNumber: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Email Address"
            variant="outlined"
            value={formValue.email}
            onChange={(e) =>
              setFormValues({ ...formValue, email: e.target.value })
            }
          />
        
          <TextField
            margin="dense"
            id="filled-basic"
            label="Physical address"
            value={formValue.address}
            onChange={(e) =>
              setFormValues({ ...formValue, address: e.target.value })
            }
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Whatsapp Number"
            value={formValue.whatsappnumber}
            onChange={(e) =>
              setFormValues({ ...formValue, whatsappnumber: e.target.value })
            }
            variant="outlined"
          />
          {/* <div className="w-full h-14 my-2 border border-black flex items-center rounded">
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <EditLocationOutlined style={{color:'#FA6F26'}}/>
            </IconButton>
            <InputBase sx={{ ml: 1, flex: 1,}} placeholder="Location" />
          </div> */}
        </div>
        <div className="w-full rounded-lg bg-lanternOrange text-white mt-3 h-12">
          <button className="font-sans w-full h-full" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
        <div className="font-sans w-full mt-3 mb-5">
          <h6 className="text-center  text-lg font-normal">
            Already have an account?
            <span className="ml-2 text-lanternOrange">
              <Link to="/login" className="text-lanternOrange">
                Login
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

export default CreateAcc;
