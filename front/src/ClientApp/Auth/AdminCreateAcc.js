import React, { useContext, useEffect, useState } from "react";
import logo from "../../Media/Group 5489.png";
import { Alert, Backdrop, CircularProgress, MenuItem, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext } from "../../Helper/Context";
import { apiClient } from "../../Storage/ApiClient";

const AdminCreateAcc = () => {
  const initialAdminState = {
    name: "",
    email: "",
    username: "",
    password: "",
    role_id: "",
  };

  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(initialAdminState);

  useEffect(() => {
    const fetchData = async () => {
      apiClient
        .get( process.env.REACT_APP_ADMIN_URL + "roles")
        .then((response) => {
          console.log(response)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_ADMIN_URL + "users",
        formData
      );
      console.log("Response:", response.data);
      if (response.data) {
        setLoading(false);
        history("/otp");
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
          <h2 className="text-5xl text-lanternOrange">Create Account</h2>
          <h6 className="font-sans font-normal">
            Let us know you for a better experience
          </h6>
        </div>
       <div className="flex flex-col justify-evenly">
            <TextField
              margin="dense"
              id="filled-basic"
              label="Full Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="filled-basic"
              label="Email Address"
              variant="outlined"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="filled-basic"
              label="Usermame"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              variant="outlined"
            />

            <TextField
              margin="dense"
              id="filled-basic"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              variant="outlined"
            />
            <div>
            
              <TextField
                id="outlined-select-currency-native"
                select
                className="w-full"
                label="Admin Role"
                SelectProps={{
                  native: true,
                }}
                helperText="Please select admin role"
              >
                {roles?.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="w-full rounded-lg bg-lanternOrange text-white mt-3 h-12">
            <button className="font-sans w-full h-full" onClick={handleSubmit}>
              Save Admin
            </button>
          </div>
        <div className="font-sans w-full mt-3 mb-5">
          <h6 className="text-center  text-lg font-normal">
            Already have an account?
            <span className="ml-2 text-lanternOrange">
              <Link to="/authlogin" className="text-lanternOrange">
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

export default AdminCreateAcc;
