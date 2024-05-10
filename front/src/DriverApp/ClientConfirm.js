import React from "react";
import auth from "../Media/mdi_success-circle.png";
import { Link, useParams } from "react-router-dom";




const ClientConfirm = () => {
  const {Id} = useParams()
  return (
    <div className="h-full ">
      <div className=" h-2/3 my-auto flex flex-col justify-evenly font-sans">
        <img
          src={auth}
          alt="driverlanternapp"
          className="w-44 h-44 mx-auto animate-pulse"
        />
        <div className="w-11/12 mx-auto flex justify-evenly h-1/3 flex-col">
          <h6 className="text-center text-black text-xl">
            Delivery Completed
          </h6>
          <h6 className="text-center text-black text-xl">
            Order #KEY3456TE delivered
          </h6>
          <Link to={`/driver/ratecook/${Id}`}className="w-full rounded bg-green-600 h-12 text-lg text-center flex flex-col justify-center text-white">
            Rate your experience
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientConfirm;
