import { ChevronLeft, Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Topnav from "../Reusable/Topnav";
import { apiDriver } from "../Storage/ApiClient";

const Editdriver = () => {
  const {Id} = useParams()
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [url] = useState(`/delivery-company/driver-edit/${Id}`);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiDriver
        .get(url)
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [url]);

  return (
    <div className="font-sans   ">
      <Topnav />
      <Link
        to={`/driveradmin/unassigneddriver/${Id}`}
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          View Active Orders
        </h6>
      </Link>
      <div className="bg-black h-2/5 py-5">
        <div className="h-full w-1/2 mx-auto text-white font-sans">
          <div className="w-40 h-40  mx-auto rounded-full bg-gray-600 mb-4"></div>
          <div>
            <h6 className="text-xl font-bold text-white w-full text-center">
              {data.driver_name}
            </h6>
            <h6 className="text-center w-full">{data.phone_number}</h6>
            <div className="flex justify-evenly4 items-center w-11/12 text-center">
              <h6 className="flex justify-between items-center w-full text-center">
                <Star />
                4.3<span>(312 Reviews)</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 justify-between flex-col mx-auto my-4">
        <div className="w-full mr-4 h-10 flex justify-between">
          <h6 className=" font-light">License plate number</h6>
          <h6 className="font-bold text-black">kdc 24578</h6>
        </div>
        <div className="w-full h-10 flex justify-between ">
          <h6 className="font-light">Vehicle</h6>
          <h6 className="font-bold text-black">Nissan</h6>
        </div>
      </div>
      <div className="flex items-center mt-5">
        <Switch {...label} />
        <h6>Deactivate Driver</h6>
      </div>
      <div className="w-11/12 mx-auto mt-5 flex">
        <Link
          to={`/driveradmin/editdriverdets/${Id}`}
          className="w-1/2 h-14 rounded border-2 border-slate-500 text-slate-500"
        >
          <button className="w-full h-14 rounded  text-slate-500">
            Edit Driver Details
          </button>
        </Link>
        <Link
          to={`/driveradmin/assignvehicle/${Id}`}
          className="w-1/2 ml-2 h-14 rounded bg-green-500 text-white"
        >
          <button className="w-full ml-2 h-14 rounded bg-green-500 text-white">
            Assign Vehicle
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Editdriver;
