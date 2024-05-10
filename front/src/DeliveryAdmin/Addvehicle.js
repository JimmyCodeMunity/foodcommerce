import React, { useState } from "react";
import Topnav from "../Reusable/Topnav";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiDriver } from "../Storage/ApiClient";

const AddVehicle = () => {
  const { Id } = useParams();

  const initialState = {
    deliverycmpy_id: Id,
    license_plate: "",
    make: "",
    model: "",
    description: "",
  };

  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiDriver.post(
        "/delivery-company/create-vehicles",
        formData
      );
      console.log("Response:", response.data);
      if (response.data) {
        setLoading(false);
        history(`/driveradmin/unassignedvehicle/${Id}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
  };
  return (
    <div>
      <div>
        <Topnav />
        <Link
          to={`/driveradmin/unassignedvehicle/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Add Vehicle
          </h6>
        </Link>
      </div>
      <div className="w-11/12 mx-auto">
        <TextField
          id="filled-search"
          placeholder="Registration/License Plate number"
          type="search"
          variant="outlined"
          value={formData.license_plate}
          onChange={(e) =>
            setFormData({ ...formData, license_plate: e.target.value })
          }
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          placeholder="Vehicle Make"
          variant="outlined"
          value={formData.make}
          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          placeholder="Vehicle model"
          type="search"
          variant="outlined"
          margin="normal"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="w-full"
        />
        <TextField
          id="filled-search"
          placeholder="Description"
          type="search"
          variant="outlined"
          margin="normal"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full"
        />
      </div>
      <div className="w-11/12 mx-auto">
        <button
          className=" bg-lanternOrange text-white w-full h-14 rounded"
          onClick={handleSubmit}
        >
          Add Vehicle
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

export default AddVehicle;
