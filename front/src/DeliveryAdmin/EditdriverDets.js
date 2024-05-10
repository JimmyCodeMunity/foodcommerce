import React, { useEffect, useState } from "react";
import Topnav from "../Reusable/Topnav";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { ChevronLeft, VisibilityOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { apiDriver } from "../Storage/ApiClient";

const EditdriverDets = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({
    driver_name: "",
    id_number: "",
    phone_number: "",
    email: "",
    gender: "",
    date_of_birth: "",
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
      `/delivery-company/driver-edit/${Id}`
    );
    setFormValue({ ...singleGroup.data.data });
  };

  const handleEditDriver = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiDriver.put(`/delivery-company/driver-update/${Id}`, formValue);
      setLoading(false);
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to update the driver details. Please try again.");
      } else {
        setError("Failed to update the driver details. Please try again.");
      }
      setLoading(false);
    }
  };

  
  return (
    <div>
      <div>
        <Topnav />
        <Link
          to={`/driveradmin/editdriver/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Add Driver
          </h6>
        </Link>
      </div>
      <div className="w-11/12 mx-auto">
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          value={formValue.driver_name}
          onChange={(e) =>
            setFormValue({ ...formValue, driver_name: e.target.value })
          }
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          margin="normal"
          value={formValue.phone_number}
          onChange={(e) =>
            setFormValue({ ...formValue, phone_number: e.target.value })
          }
          className="w-full"
        />
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          value={formValue.id_number}
          onChange={(e) =>
            setFormValue({ ...formValue, id_number: e.target.value })
          }
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          value={formValue.date_of_birth}
          onChange={(e) =>
            setFormValue({ ...formValue, date_of_birth: e.target.value })
          }
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          value={formValue.email}
          onChange={(e) =>
            setFormValue({ ...formValue, email: e.target.value })
          }
          margin="normal"
          className="w-full"
        />
        <TextField
          id="filled-search"
          type="search"
          variant="outlined"
          value={formValue.gender}
          onChange={(e) =>
            setFormValue({ ...formValue, gender: e.target.value })
          }
          margin="normal"
          className="w-full"
        />
      </div>
      <div className="flex my-4 w-1/3 justify-evenly">
        <VisibilityOutlined />
        <h6>View Images</h6>
      </div>
      <div className="w-11/12 mx-auto">
        <button
          className=" bg-green-500 text-white w-full h-10 rounded"
          onClick={handleEditDriver}
        >
          Save Changes
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

export default EditdriverDets;
