import React, { useContext, useEffect } from "react";
import logo from "../Media/Group 5489.png";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";

import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { useState } from "react";
import { ClientIdContext, CookIdContext } from "../Helper/Context";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const RegisterCook = () => {
  const { Id } = useParams();
  const history = useNavigate();
  const { clientId } = useContext(ClientIdContext);
  const { setCookId } = useContext(CookIdContext);
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
  console.log(position);

  const initialState = {
    client_id: clientId,
    kitchen_name: "",
    id_number: "",
    mpesa_number: "",
    alt_phone_number: "",
    health_number: "",
    health_expiry_date: null,
    physical_address: "",
    shrt_desc: "",
  };
  const [formValue, setFormValues] = useState(initialState);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY/MM/DD") : null;
    setFormValues({
      ...formValue,
      health_expiry_date: formattedDate,
    });
  };

  useEffect(() => {
    setFormValues((prevState) => ({
      ...prevState,
      google_map_pin: position,
    }));
  }, [position]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post(
        process.env.REACT_APP_API_URL + "/cook/register",
        formValue
      );
      console.log("Response:", response.data);
      if (response.data) {
        setLoading(false);
        setCookId(response.data.clientID);
        history(`/cook/uploaddocs/${Id}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute  top-44  max-lg:h-4/5">
        <div>
          <h2 className="text-5xl text-lanternOrange">Create Profile</h2>
          <h6 className="font-sans font-normal">
            Lets know more about you, your cooking skills and talent.
          </h6>
        </div>
        <div className="flex flex-col">
          <TextField
            margin="dense"
            id="filled-basic"
            label="Kitchen Name"
            variant="outlined"
            value={formValue.kitchen_name}
            onChange={(e) =>
              setFormValues({ ...formValue, kitchen_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="ID Number"
            variant="outlined"
            value={formValue.id_number}
            onChange={(e) =>
              setFormValues({ ...formValue, id_number: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Mpesa phone number"
            variant="outlined"
            value={formValue.mpesa_number}
            onChange={(e) =>
              setFormValues({ ...formValue, mpesa_number: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Alternate phone number"
            variant="outlined"
            value={formValue.alt_phone_number}
            onChange={(e) =>
              setFormValues({ ...formValue, alt_phone_number: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Health cert number"
            variant="outlined"
            value={formValue.health_number}
            onChange={(e) =>
              setFormValues({ ...formValue, health_number: e.target.value })
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              id="filled-basic"
              label="Health cert expiry date"
              variant="outlined"
              placeholder="YYYY/MM/DD"
              value={formValue.health_expiry_date}
              required
              onChange={(date) => handleDateChange(date)}
            />
          </LocalizationProvider>

          <TextField
            margin="dense"
            id="filled-basic"
            label="Physical address"
            variant="outlined"
            value={formValue.physical_address}
            onChange={(e) =>
              setFormValues({ ...formValue, physical_address: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Google pin location"
            variant="outlined"
          
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Short Description"
            multiline
            rows={4}
            variant="outlined"
            value={formValue.shrt_desc}
            onChange={(e) =>
              setFormValues({ ...formValue, shrt_desc: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col h-28 justify-evenly">
          <h6>Link Your Socials</h6>
          <div className="flex w-1/2 justify-between">
            <Twitter />
            <FacebookOutlined />
            <Instagram />
            <LinkedIn />
          </div>
        </div>
        <div className="w-full h-12">
          <button
            className="font-sans  rounded-lg  w-full h-full mb-2  bg-lanternOrange text-white"
            onClick={handleSubmit}
          >
            Create Account
          </button>
          <Link to={`/client/home/${Id}`}>
            <button className="font-sans  rounded-lg w-full mb-2 h-full border-2 border-slate-600 text-slate-600">
              Back to client profile
            </button>
          </Link>
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

export default RegisterCook;
