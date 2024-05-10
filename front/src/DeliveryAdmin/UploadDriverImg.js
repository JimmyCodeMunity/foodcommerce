import {
  ChevronLeft,
  Cloud,
  CloudQueue,
  Delete,
  DeleteOutline,
  Download,
  PublishedWithChanges,
} from "@mui/icons-material";
import React, { useState } from "react";
import Topnav from "../Reusable/Topnav";
import { Link, useParams } from "react-router-dom";
import AuthSession from "../Storage/AuthSession";
import axios from "axios";
import { Alert, Backdrop, CircularProgress } from "@mui/material";

const UploadDriverImg = () => {
  const { Id } = useParams();
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message,setMessage] = useState("")

  const deleteHandler = (file) => {
    URL.revokeObjectURL(file.preview);
    if (file === idFront) setIdFront(null);
    else if (file === idBack) setIdBack(null);
    else if (file === profilePic) setProfilePic(null);
  };

  const handleUpload = async () => {
    setLoading(true)
    try {
      const token = AuthSession.getToken();
      const formData = new FormData();
      formData.append("driverId", Id);
      formData.append("id_front", idFront);
      formData.append("id_back", idBack);
      formData.append("profile_pic", profilePic);

      console.log([...formData]);

      const response = await axios.post(
        process.env.REACT_APP_DRIVER_URL +
          "/delivery-company/upload-driver-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      setMessage("Success! A Sign up OTP has been sent to your new driver")
      console.log(response.data.message);
    } catch (error) {
      setLoading(false)
      console.log(
        "Oops! A problem was encountered, the documents were not uploaded. Please try again or contact Support."
      );
      setError(
        "Oops! A problem was encountered, the documents were not uploaded. Please try again or contact Support."
      );
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
      <div className="relative w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div className="relative w-2/3 mx-auto">
        {message && (
          <Alert severity="success" className="w-full absolute top-1/2 ">
            {message}
          </Alert>
        )}
      </div>
      <div className="h-full ">
        <div>
          <Topnav />
          <Link
            to={`/driveradmin/addvehicle/${Id}`}
            className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
          >
            <h6 className="flex items-center">
              <ChevronLeft />
              Upload Images
            </h6>
          </Link>
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="grid grid-cols-2  mb-4 gap-2  h-1/2">
            {idFront ? (
              <div className="w-11/12 mx-auto rounded  border-2 p-2">
                <img
                  src={URL.createObjectURL(idFront)}
                  className="h-1/2 w-11/12 mx-auto"
                  alt="upload"
                />
                <div className="flex w-11/12 justify-between my-4">
                  <div className=" text-red-600 flex flex-col items-center">
                    <Delete />
                    <h6 onClick={() => deleteHandler(idFront)}>Delete</h6>
                  </div>
                </div>
              </div>
            ) : null}
            {idBack ? (
              <div className="w-11/12 mx-auto rounded  border-2 p-2">
                <img
                  src={URL.createObjectURL(idBack)}
                  className="h-1/2 w-11/12 mx-auto"
                  alt="upload"
                />
                <div className="flex w-11/12 justify-between my-4">
                  <div className=" text-red-600 flex flex-col items-center">
                    <Delete />
                    <h6 onClick={() => deleteHandler(idBack)}>Delete</h6>
                  </div>
                </div>
              </div>
            ) : null}
            {profilePic ? (
              <div className="w-11/12 mx-auto rounded  border-2 p-2">
                <img
                  src={URL.createObjectURL(profilePic)}
                  className="h-1/2 w-11/12 mx-auto"
                  alt="upload"
                />
                <div className="flex w-11/12 justify-between my-4">
                  <div className=" text-red-600 flex flex-col items-center">
                    <Delete />
                    <h6 onClick={() => deleteHandler(profilePic)}>Delete</h6>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-11/12 mx-auto flex justify-between text-slate-400 border border-slate-400 p-2 rounded">
            <div className="flex flex-col">
              <div className="text-slate-500 border bg-slate-200 rounded h-fit w-full p-2 my-2">
                <label>Upload Id Front</label>
                <input
                  type="file"
                  className="file:mr-4 file:px-2 rounded pt-2 "
                  onChange={(e) => setIdFront(e.target.files[0])}
                />
              </div>
              <div className="text-slate-500 border bg-slate-200 rounded h-fit w-full p-2 my-2">
                <label>Upload Id Back</label>
                <input
                  type="file"
                  className="file:mr-4 file:px-2 rounded pt-2 "
                  onChange={(e) => setIdBack(e.target.files[0])}
                />
              </div>

              <div className="text-slate-500 border bg-slate-200 rounded h-fit w-full p-2 my-2">
                <label>Upload Profile Picture</label>
                <input
                  type="file"
                  className="file:mr-4 file:px-2 rounded pt-2 "
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto">
            <button
              className=" bg-lanternOrange text-white w-full h-10 rounded"
              onClick={handleUpload}
            >
              Save Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDriverImg;
