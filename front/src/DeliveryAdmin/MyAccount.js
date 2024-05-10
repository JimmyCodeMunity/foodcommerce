import { BarChart, MessageOutlined } from "@mui/icons-material";
import React from "react";
import Topnav from "../Reusable/Topnav";
import { Link, useParams } from "react-router-dom";
import { DriverAdminNav } from "../Reusable/DriverNav";

const MyAccount = () => {
const {Id} = useParams()
  return (
    <div className="font-sans">
      <div>
        <Topnav />
      </div>
      <div className="h-3/4  overflow-auto">
        <div className="bg-black h-1/4 py-5">
          <div className="h-full w-1/2 mx-auto text-white font-sans">
            <div className="w-44 h-44 rounded-full bg-gray-600 mb-4"></div>
            <div>
              <h6 className="text-xl font-bold text-white w-full text-center">
                Ahmed Abubakar
              </h6>
              <h6 className="text-center w-full">mail@example.com</h6>
              <div className="flex justify-evenly4 items-center w-11/12 text-center"></div>
            </div>
          </div>
        </div>
        <div className="h-44 mt-2 flex flex-col justify-between  mb-20 overflow-auto">
           <div className="flex w-11/12 mx-auto h-fit mt-2 border-b border-gray-300 items-center">
          <Link to={`/driveradmin/myfinancials/${Id}`}>
            <h6 className="ml-4">
              <BarChart />
              Finances
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-2 border-b border-gray-300 items-center">
          <Link to={`/driveradmin/myanalytics/${Id}`}>
            <h6 className="ml-4">
              <BarChart />
              Analytics
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-2 border-b border-gray-300 items-center">
          <Link to={`/driveradmin/commune/${Id}`}>
            <h6 className="ml-4">
              <MessageOutlined />
              Communication
            </h6>
          </Link>
        </div>
        </div>
       
      </div>

      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverAdminNav />
      </div>
    </div>
  );
};

export default MyAccount;
