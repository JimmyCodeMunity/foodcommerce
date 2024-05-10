import { ChevronLeft } from "@mui/icons-material";
import React from "react";
import food from "../Media/Ellipse 2.png";
import { Link, useNavigate } from "react-router-dom";

const ViewTransacorder = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/cook/transactionhistory">
        <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
          <h6 className="flex items-center">
            <ChevronLeft />
            View Order
          </h6>
        </div>
      </Link>

      <div className="w-11/12 mx-auto">
        <h6 className="my-2">
          ShiftID: <span>KEXS564Y</span>
        </h6>
        <div>
          <div className="flex justify-between items-center w-full h-24 mt-8 mx-auto">
            <div className="flex">
              <img
                src={food}
                alt="lantern app"
                className="w-14 h-16"
                onClick={() => navigate("/cook/viewmeal")}
              />
              <div className="flex flex-col justify-evenly h-full ml-5">
                <h6 className="font-semibold">Meal Name</h6>
                <h6 className="text-red-500">KSH 5,000</h6>
                <div className="flex w-full justify-between items-center">
                  <div>
                    <h6 className="flex items-center">OTY:14</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <h6 className="text-slate-500">Total</h6>
          <h6 className=" font-semibold">KES 30,000.00</h6>
        </div>
      </div>
    </div>
  );
};

export default ViewTransacorder;
