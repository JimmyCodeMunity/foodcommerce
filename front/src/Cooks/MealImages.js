import {
    ChevronLeft,
    CloudQueue,
    Delete,
    PresentToAll,
    PublishedWithChanges,
  } from "@mui/icons-material";
  import React, { useEffect, useState } from "react";
  import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
  
  const MealImages = () => {
    const {Id} = useParams()
    const [formValue, setFormValues] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        apiClient
          .get(`cook/cook_meals/${5}`)
          .then((response) => {
            setData(response.data.data);
            console.log(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      };
      fetchData();
    }, []);
  
  
  
  
    return (
      <div className="h-full ">
        <div>
          <Link
            to={`/cook/editmeal/${Id}`}
            className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
          >
            <h6 className="flex items-center">
              <ChevronLeft />
              Meal Images
            </h6>
          </Link>
        </div>
        <div className="flex flex-col justify-between mt-2 overflow-auto">
        {  <div>
            <div className="w-11/12 mx-auto rounded h-44 bg-slate-400"></div>
            <h6 className="text-center text-slate-500">Profile.jpg</h6>
            <div className="flex w-11/12 justify-between mx-auto">
              <div className=" text-lanternOrange flex flex-col items-center">
                <PublishedWithChanges />
                <h6>Change</h6>
              </div>
              <div className=" text-slate-600 flex flex-col items-center">
                <PresentToAll />
                <h6>Preview</h6>
              </div>
              <div className=" text-red-600 flex flex-col items-center">
                <Delete />
                <h6>Delete</h6>
              </div>
  
              <div className=" text-green-600 flex flex-col items-center">
                <CloudQueue />
                <h6>Upload</h6>
              </div>
            </div>
          </div>}
       
          <div className="w-11/12 mx-auto mt-4">
            <Link to={`/client/viewcook/${Id}`} className="w-full h-full">
              <button className=" bg-lanternOrange text-white w-full h-10 rounded">
                Save Changes
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default MealImages;
  