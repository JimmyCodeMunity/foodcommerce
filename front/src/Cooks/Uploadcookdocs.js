import {
  ChevronLeft,
  CloudQueue,
  Delete,
  Download,
  PresentToAll,
  PublishedWithChanges,
} from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CookIdContext, MealIdContext } from "../Helper/Context";
import AuthSession from "../Storage/AuthSession";
import { Alert, Backdrop, CircularProgress } from "@mui/material";

const Uploadcookdocs = () => {
  const history = useNavigate();
  const { Id } = useParams();
  const {mealId} = useContext(MealIdContext);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setFormData((previousImages) => previousImages.concat(selectedFilesArray));
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setFormData(formData?.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleUpload = async () => {
    setLoading(true);
    if (formData.length < 3) {
      setLoading(false);
      setMessage("Please select at least 3 images.");
      return;
    }

    try {
      const token = AuthSession.getToken();
      const formDataToSend = new FormData();
      formDataToSend.append("meal_id", mealId);
      formData.forEach((file) => {
        formDataToSend.append(`image_url[]`, file);
      });
      console.log([...formData]);

      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/cook/upload-meal-image",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setLoading(false);
        history(`/cook/cookcreatemeals/${Id}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };
  return (
    <div className="h-full ">
       {message && (
          <Alert severity="warning" className="w-fit max-lg:left-10 left-1/3 bg-yellow-300 absolute top-1/2 ">
            {message}
          </Alert>
        )}
      <div>
        <Link
          to={`/cook/cookaddmeal/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Upload Images
          </h6>
        </Link>
      </div>
      <div className="flex flex-col justify-evenly mt-2">
        <div className="grid grid-cols-2">
          {formData &&
            formData?.map((image, index) => {
              return (
                <div
                  key={index}
                  className="w-11/12 mx-auto rounded  border-2 p-2"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-2/3 w-11/12 mx-auto"
                    alt="upload"
                  />
                  <div className="flex w-11/12 justify-between my-4">
                    <div className=" text-red-600 flex flex-col items-center">
                      <Delete />
                      <h6 onClick={() => deleteHandler(image)}>Delete</h6>
                    </div>
                    <p>{index + 1}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex flex-col justify-evenly h-32">
          <div className="w-11/12 mx-auto flex justify-between text-slate-400 border border-slate-400 p-2 rounded">
            <label htmlFor="imageFiles">Select up to 5 Images:</label>
            <input
              type="file"
              id="imageFiles"
              name="imageFiles"
              onChange={onSelectFile}
              multiple
              accept="image/png , image/jpeg, image/webp"
            />
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <button
            className=" bg-lanternOrange text-white w-full h-10 rounded"
            onClick={handleUpload}
          >
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

export default Uploadcookdocs;
