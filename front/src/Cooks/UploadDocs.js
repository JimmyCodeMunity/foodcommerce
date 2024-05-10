import React, { useContext, useState } from "react";
import logo from "../Media/Group 5489.png";
import { Backdrop, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthSession from "../Storage/AuthSession";
import { CookIdContext } from "../Helper/Context";

const UploadDocs = () => {
  const history = useNavigate();
  const {cookId} = useContext(CookIdContext);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [healthCert, setHealthCert] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    setLoading(true)
    try {
      const token = AuthSession.getToken();
      const formData = new FormData();
      formData.append("cook_id", cookId);
      formData.append("id_front", idFront);
      formData.append("id_back", idBack);
      formData.append("health_cert", healthCert);
      formData.append("profile_pic", profilePic);

   
      console.log([...formData]);

      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/cook/upload-documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      if (response.data) {
        setLoading(false);
        history(`/cook/submitted/${cookId}`);
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
          <h2 className="text-5xl text-lanternOrange">Upload Documents</h2>
          <h6 className="font-sans font-normal">
            Kindly share images of your documents as required below for
            statutory reasons.
          </h6>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-between items-center">
            <div className="text-slate-500 border bg-slate-200 rounded h-fit w-full p-2 my-2">
              <label>Upload Id Front.png</label>
              <input
                type="file"
                className="file:mr-4 file:px-2 rounded pt-2 "
                onChange={(e) => setIdFront(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="text-slate-500 border bg-slate-200 rounded h-fit w-full p-2 my-2">
              <label>Upload Id back.png</label>
              <input
                type="file"
                className="file:mr-4 file:px-2 rounded  pt-2 "
                onChange={(e) => setIdBack(e.target.files[0])}
              />
            </div>
          </div>
          <div className="text-slate-500 border bg-slate-200 rounded h-fit p-2 my-2">
            <label>Upload Health Certificate</label>
            <input
              type="file"
              className="file:mr-4 file:px-2 rounded pt-2 "
              onChange={(e) => setHealthCert(e.target.files[0])}
            />
          </div>

          <div className="text-slate-500 border bg-slate-200 rounded h-fit w-full p-2 my-2">
            <label>Upload profile_pic.png</label>
            <input
              type="file"
              className="file:mr-4 file:px-2 rounded pt-2 "
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
        </div>
        <div className="w-full rounded-lg bg-lanternOrange text-white h-12 mt-3">
          <button className="font-sans w-full h-full" onClick={handleUpload}>
            Next
          </button>
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

export default UploadDocs;
