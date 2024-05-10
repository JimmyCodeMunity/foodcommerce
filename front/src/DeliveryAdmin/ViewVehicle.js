import { ChevronLeft } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Topnav from "../Reusable/Topnav";
import { apiDriver } from "../Storage/ApiClient";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";

const ViewVehicle = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { Id } = useParams();
  const [formValue, setFormValue] = useState({
    license_plate: "",
    make: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Id) {
      getSingleGroup(Id);
    } else {
      setFormValue({ ...formValue });
    }
  }, [Id]);

  const getSingleGroup = async () => {
    const singleGroup = await apiDriver.get(
      `/delivery-company/vehicle-edit/${Id}`
    );
    setFormValue({ ...singleGroup.data.data });
  };

  const handleEditVehicle = async (e) => {
    setLoading(true)
    apiDriver
      .put(`/delivery-company/vehicle-update/${Id}`, formValue)
      .then((res) => {
        setLoading(false);
        setError("Vehicle Updated Successfully");
      })
      .catch((error) => {
        setLoading(false)
        console.error(error);
        setError("Failed to update the vehicle. Please try again.");
      });
  };
  return (
    <div className="font-sans   ">
      <Topnav />
      <Link
        to={`/driveradmin/unassignedvehicle/${Id}`}
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
      >
        <ChevronLeft />
        <h6>View Vehicle</h6>
      </Link>

      <div className="flex w-11/12 justify-between mx-auto my-4">
        <div className="w-1/2 mr-4 h-16 flex justify-between flex-col">
          <h6 className=" font-light">License plate number</h6>
          <TextField
            id="filled-search"
            type="search"
            margin="normal"
            variant="standard"
            value={formValue.license_plate}
            onChange={(e) =>
              setFormValue({ ...formValue, license_plate: e.target.value })
            }
            className="w-full"
          />
        </div>
        <div className="w-1/2 h-16 flex justify-between flex-col">
          <h6 className="font-light">Vehicle</h6>
          <TextField
            id="filled-search"
            type="search"
            margin="normal"
            variant="standard"
            value={formValue.make}
            onChange={(e) =>
              setFormValue({ ...formValue, make: e.target.value })
            }
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center mt-5">
        <Switch {...label} />
        <h6>Deactivate Vehicle</h6>
      </div>
      <div className="flex w-11/12 mx-auto justify-between mt-5">
        <button
          className=" w-1/2 h-14 mr-2 rounded border-2 border-slate-700 text-slate-700"
          onClick={handleEditVehicle}
        >
          Edit Vehicle Details
        </button>
        <button className="w-1/2 rounded bg-green-500 text-white">
          <Link to={`/driveradmin/assigndriver/${Id}`}> Assign Driver</Link>
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

export default ViewVehicle;
