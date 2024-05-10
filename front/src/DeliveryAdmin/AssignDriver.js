import React, { useEffect, useState } from "react";
import Topnav from "../Reusable/Topnav";
import { ChevronLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { apiClient } from "../Storage/ApiClient";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AssignDriver = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get("/delivery-company/drivers")
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
  return (
    <div className="h-full ">
      <div>
        <Topnav />
        {/* <Link
          to="/driver/arrived"
          className="h-14 flex font-sans no-underline items-center w-11/12 bg-lanternOrange text-white mx-auto text-left"
        >
          <ChevronLeft />
          <h6 className="ml-4">Assign Driver</h6>
        </Link> */}
      </div>
     {data?.map((item,index)=>{return(
       <div className="w-11/12 flex justify-between h-14 items-center mx-auto my-5">
        <div className="w-14 h-14 bg-slate-500 rounded-full"></div>
        <div>
          <h6>{item.driver_name}</h6>
          <h6>{item.phone_number}</h6>
        </div>
        <Checkbox {...label} />
      </div>
     )})
}
      <div className="w-11/12 flex justify-between mx-auto h-14 items-center ">
        <div className="pb-6 w-11/12 mx-auto fixed bg-white">
          <button className=" w-full bg-green-500 text-white mx-auto h-12 rounded text-xl">
            Assign Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDriver;
