import { BarChart, Star } from "@mui/icons-material";
import React from "react";
import { DriverNav } from "../Reusable/DriverNav";
import { Link, useParams } from "react-router-dom";

const DriverProfile = () => {
  const {Id} = useParams()
  return (
    <div className="font-sans">
      <div className="bg-black h-2/5 py-5">
        <div className="h-full w-1/2 flex flex-col justify-between mx-auto text-white font-sans">
          <div className="w-44 h-44 mx-auto rounded-full bg-gray-600 mb-4"></div>
          <div>
            <h6 className="text-xl font-bold text-white w-full text-center">
              Ahmed Abubakar
            </h6>
            <h6 className="text-center w-11/12 mx-auto">+254 689 076 124</h6>
            <div className="flex justify-evenly items-center w-11/12  mx-auto text-center">
              <h6 className="w-11/12 text-base text-center flex justify-between items-center">
                <Star className="h-5 my-auto" />
                4.3 <span>(312 Reviews)</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 mx-auto h-20 mt-5 border-b border-gray-300 items-center">
        <Link to={`/driver/analytics/${Id}`}>
          <h6 className="flex items-center">
              <BarChart className="mr-2" />
            Analytics
          </h6>
        </Link>
      </div>
      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverNav />
      </div>
    </div>
  );
};

export default DriverProfile;
