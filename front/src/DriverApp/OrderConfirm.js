import React from "react";
import auth from "../Media/mdi_success-circle.png";
import { Link } from "react-router-dom";


const ConfirmOrder = () => {
  return (
    <div className="h-full ">
      <div className="h-4/6 my-auto flex flex-col justify-evenly font-sans">
        <img
          src={auth}
          alt="driverlanternapp"
          className="w-44 h-44 mx-auto"
        />
        <div className="w-11/12 mx-auto flex justify-evenly h-1/3 flex-col">
          <h6 className="text-center text-black text-xl">
            Order #KEY3241TE Collected{" "}
          </h6>

          <Link to="/driver/clientdelivery"className="w-full rounded bg-green-600 h-12 text-lg text-center flex flex-col justify-center text-white">
            Start Delivery Trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
