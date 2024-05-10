import React from "react";
import { CheckBox, ChevronLeft } from "@mui/icons-material";
import food from "../Media/Ellipse 2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Topnav from "../Reusable/Topnav";
import { DriverAdminNav } from "../Reusable/DriverNav";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const AssignOrders = () => {
  const {Id} = useParams()
  const navigate = useNavigate();
  return (
    <div className="font-sans   ">
      <Topnav />
      <Link
        to={`/driveradmin/unassigneddriver/${Id}`}
        className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Assign Order
        </h6>
      </Link>
      <div className="h-4/5 flex flex-col justify-between">
        <div>
          <div
            className="flex justify-evenly items-center w-11/12 h-24 mt-8 mx-auto"
            onClick={() => navigate("")}
          >
            <img src={food} alt="lantern app" />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Order ID: REF123FD</h6>
              <h6 className="text-gray-400">Collection: 12 min</h6>
            </div>{" "}
            <CheckBox {...label} />
          </div>
          <div className="pb-6 w-11/12 mx-auto bg-white bottom-0">
            <button className=" w-full bg-green-500 text-white mx-auto h-12 rounded">
              Assign Order
            </button>
          </div>
        </div>
      </div>
      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverAdminNav />
      </div>
    </div>
  );
};

export default AssignOrders;
