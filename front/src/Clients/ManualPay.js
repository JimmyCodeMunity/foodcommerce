import { ChevronLeft } from "@mui/icons-material";
import qr from "../Media/qr.png"
import React from "react";
import { Link, useParams } from "react-router-dom";

const ManualPay = () => {
  const {Id} = useParams()
  return (
    <div>
      <div>
        <Link
          to={`/client/payment/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Mpesa manual Payment
          </h6>
        </Link>
      </div>
      <div className="w-11/12 mx-auto h-44 flex flex-col justify-evenly">
          <div className="flex justify-between">
            <h6 className="text-slate-500">Paybil Number</h6>
            <h6 className=" font-semibold">145236</h6>
          </div>

          <div className="flex justify-between">
            <h6 className="text-slate-500">Account Number</h6>
            <h6 className=" font-semibold">78459621</h6>
          </div>
          <div className="flex justify-between">
            <h6 className="text-slate-500">Amount</h6>
            <h6 className=" font-semibold">KES 1,000.00</h6>
          </div>

          <div className="flex justify-between">
            <h6 className="text-slate-500">Status</h6>
            <h6 className=" font-semibold">Paid</h6>
          </div>
        </div>
        <h6 className="text-center">OR</h6>
        <div className="flex items-center flex-col">
            <h6 className="mb-4 placeholder:font-light">Scan using your Mpesa App on another phone</h6>
            <img src={qr} alt='lantern'/>
        </div>
    </div>
  );
};

export default ManualPay;
