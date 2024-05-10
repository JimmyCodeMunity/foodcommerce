import { ChevronLeft, LocationOnOutlined, Star } from "@mui/icons-material";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import {
  IconButton,
  InputBase,
 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";

const EditCookProfile = () => {
  const initialState = {
    kitchen_name: "",
    mpesa_number: "",
    physical_address: "",
    google_map_pin: "",
  };
  const [formValue, setFormValues] = useState(initialState);
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/cook/profile/${Id}`)
        .then((response) => {
          setLoading(false);
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Id) {
      getSingleGroup(Id);
    } else {
      setFormValues({ ...initialState });
    }
  }, [Id]);

  const getSingleGroup = async (id) => {
    const singleGroup = await apiClient.get(`/cook/profile/${Id}`);
    setFormValues({ ...singleGroup.data.data });
  };

  const handleEditGroup = async (e) => {
    try {
      setLoading(true);
      const response = await apiClient.put(
        `cook/update-profile/${Id}`,
        formValue
      );
      setMessage("Details updated successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Failed to update the details. Please try again.");
    }
  };
  return (
    <div>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative  w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div className="relative  w-2/3 mx-auto">
        {message && (
          <Alert severity="success" className="w-full absolute top-0">
            {message}
          </Alert>
        )}
      </div>
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Edit Profile
        </h6>
      </div>
      <div className="bg-black py-5 w-full">
        <div className="bg-black h-1/4 py-5">
          <div className="max-lg:w-11/12  w-1/3 mx-auto">
            <div className="h-full w-1/2 mx-auto text-white font-sans">
              <div className="w-44 h-44 rounded-full bg-gray-600 mb-4"></div>
              <div className=" flex flex-col justify-center items-center mx-auto">
                <h6 className="text-xl font-bold text-white w-full text-center">
                  {data.kitchen_name}
                </h6>
                <h6 className="text-center w-full">{data.mpesa_number}</h6>
                <h6 className="flex items-center font-semibold w-full justify-between">
                  <Star />
                  4.3<span>(321 Reviews)</span>
                </h6>
                <div className="flex justify-evenly4 items-center w-11/12 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4/5 w-11/12 mx-auto mt-3">
        <div className="flex flex-col">
          <TextField
            margin="dense"
            id="filled-basic"
            label="kitchen Name"
            variant="outlined"
            value={formValue.kitchen_name}
            onChange={(e) =>
              setFormValues({ ...formValue, kitchen_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Mpesa Number"
            variant="outlined"
            value={formValue.mpesa_number}
            onChange={(e) =>
              setFormValues({ ...formValue, mpesa_number: e.target.value })
            }
          />

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
          <div className="flex items-center w-full">
            <div
              className="w-full h-14 flex rounded justify-between my-3 border border-slate-500 mx-auto"
              sx={{
                p: "2px 4px",
                ml: "2px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                label="Location"
                value={formValue.google_map_pin}
                onChange={(e) =>
                  setFormValues({
                    ...formValue,
                    google_map_pin: e.target.value,
                  })
                }
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <LocationOnOutlined />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto mt-3 flex">
          <Link
            to={`/cook/profileinfo/${Id}`}
            className="w-1/2 h-14 rounded border-2 border-slate-500 text-slate-500"
          >
            <button className="w-full h-14 rounded  text-slate-500">
              Discard Changes
            </button>
          </Link>
          <button
            className="w-1/2 ml-2 h-14 rounded bg-lanternOrange text-white"
            onClick={handleEditGroup}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCookProfile;
