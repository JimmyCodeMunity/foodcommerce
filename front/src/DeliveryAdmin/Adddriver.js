import React, { useState } from "react";
import Topnav from "../Reusable/Topnav";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiDriver } from "../Storage/ApiClient";

const Adddriver = () => {
  const history = useNavigate();
  const { Id } = useParams();

  const initialState = {
    company_id: Id,
    email: "",
    driver_name: "",
    phone_number: "",
    id_number: "",
    date_of_birth: "",
    gender: "",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValue, setFormValue] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiDriver.post(
        "/delivery-company/create-driver",
        formValue
      );
      console.log("Response:", response.data);
      if (response.data) {
       setLoading(false);
        history(`/driveradmin/uploaddriverimg/${response.data.driverId}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <Topnav />
        <Link
          to={`/driveradmin/assigneddriver/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            {" "}
            <ChevronLeft />
            Add Driver
          </h6>
        </Link>
      </div>
      <div className="w-11/12 mx-auto">
        <TextField
          id="filled-search"
          label="Driver's Full Name"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
          value={formValue.driver_name}
          onChange={(e) =>
            setFormValue({ ...formValue, driver_name: e.target.value })
          }
        />
        <TextField
          id="filled-search"
          label="Phone number"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
          value={formValue.phone_number}
          onChange={(e) =>
            setFormValue({ ...formValue, phone_number: e.target.value })
          }
        />
        <TextField
          id="filled-search"
          label="ID number"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
          value={formValue.id_number}
          onChange={(e) =>
            setFormValue({ ...formValue, id_number: e.target.value })
          }
        />
        <TextField
          id="filled-search"
          label="Date of Birth"
          placeholder="YYYY/MM/DD"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
          value={formValue.date_of_birth}
          onChange={(e) =>
            setFormValue({ ...formValue, date_of_birth: e.target.value })
          }
        />
        <TextField
          id="filled-search"
          label="Email address"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
          value={formValue.email}
          onChange={(e) =>
            setFormValue({ ...formValue, email: e.target.value })
          }
        />
        <TextField
          id="filled-search"
          label="Gender"
          type="search"
          variant="outlined"
          margin="normal"
          className="w-full"
          value={formValue.gender}
          onChange={(e) =>
            setFormValue({ ...formValue, gender: e.target.value })
          }
        />
      </div>
      <div className="w-11/12 mx-auto">
        <button
          className=" bg-lanternOrange text-white w-full h-10 rounded"
          onClick={handleSubmit}
        >
          Next
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
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Adddriver;
