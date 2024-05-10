import { ChevronLeft, LocationOnOutlined, Star } from "@mui/icons-material";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import axios from "axios";

const EditProfile = () => {
  const initialState = {
    fullName: "",
    phoneNumber: "",
    email: "",
    whatsappnumber: "",
    google_map_pin: "",
  };
  const { Id } = useParams();
  const [formValue, setFormValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState(`/client/get-profile/${Id}`);
  const [data, setData] = useState([]);
  const [componentKey, setComponentKey] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     apiClient
  //       .get(url)
  //       .then((response) => {
  //         setData(response.data.data);
  //         console.log(response.data.data);
  //         setComponentKey(Date.now() + 1);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   };
  //   fetchData();
  // }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(Id)

        const response = await axios.get(process.env.REACT_APP_API_URL + `/client/get-profile/${Id}`);
        const collected = response.data;
        setData(collected)
        // setClientId(collected.id);
        setComponentKey(Date.now() + 1);
        console.log("collected info", response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)

      }
    };
    fetchData();
  }, [`/get-profile/${Id}`]);

  useEffect(() => {
    if (Id) {
      getSingleGroup(Id);
    } else {
      setFormValues({ ...initialState });
    }
  }, [Id]);

  const getSingleGroup = async (id) => {
    const singleGroup = await apiClient.get(url);
    setFormValues({ ...singleGroup.data.data });
  };

  const handleEditGroup = async (e) => {
    try {
      setLoading(true);
      const response = await apiClient.put(
        `/client/update-profile/${Id}`,
        formValue
      );
      setMessage("Details updated successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
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
        <Link to={`/client/clientprofile/${Id} `} className="text-white">
          <h6 className="flex items-center ml-1 text-lg">
            <ChevronLeft style={{ fontSize: "2.5rem", marginRight: "0.8rem" }} />
            Edit Profile
          </h6>
        </Link>
      </div>
      <div className="bg-black py-5 w-full">
        <div className="bg-black h-1/4 py-5">
          <div className="max-lg:w-11/12  w-1/3 mx-auto">
            <div className="h-full w-1/2 mx-auto text-white font-sans">
              <div className="w-44 h-44 rounded-full bg-gray-600 mb-4"></div>
              <div className=" flex flex-col justify-center items-center mx-auto">
                <h6 className="text-xl font-bold text-white w-full text-center">
                  {data.fullname}
                </h6>
                <h6 className="text-center w-full">{data.phoneNumber}</h6>
                <h6 className="flex items-center font-semibold w-fit justify-between">
                  <Star />
                  4.3<span>(321 Reviews)</span>
                </h6>
                <div className="flex justify-evenly4 items-center w-11/12 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4/5">
        <h6 className="font-[lambency] text-2xl ml-2  mt-4">Edit details</h6>
        <div className="flex flex-col w-11/12 mx-auto">
          <TextField
            margin="normal"
            id="filled-basic"
            value={data.fullname}
            onChange={(e) =>
              setFormValues({ ...formValue, fullname: e.target.value })
            }
            variant="outlined"
          />
          <TextField
            margin="normal"
            id="filled-basic"
            variant="outlined"
            value={data.phoneNumber}
            onChange={(e) =>
              setFormValues({ ...formValue, phoneNumber: e.target.value })
            }
          />
          <TextField
            margin="normal"
            id="filled-basic"
            variant="outlined"
            value={data.whatsappnumber}
            onChange={(e) =>
              setFormValues({ ...formValue, whatsappnumber: e.target.value })
            }
          />
          <TextField
            margin="normal"
            id="filled-basic"
            value={data.email}
            onChange={(e) =>
              setFormValues({ ...formValue, email: e.target.value })
            }
            variant="outlined"
          />
        </div>
        <div className="w-11/12 mx-auto mt-5 flex">
          <Link
            to={`/client/clientprofile/${Id}`}
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

export default EditProfile;
