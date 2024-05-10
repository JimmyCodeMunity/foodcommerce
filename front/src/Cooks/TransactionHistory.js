import { ChevronLeft, VisibilityOutlined } from "@mui/icons-material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const TransactionHistory = () => {
  const {Id} = useParams
  return (
    <div>
      <Link to={`/cook/profileinfo/${Id}`}>
       
        <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
          <h6 className="flex items-center">
            <ChevronLeft />
            Transaction History
          </h6>
        </div>
      </Link>

      <div>
        <div className="lg:w-2/3 w-11/12 mt-2 p-2 shadow-inner rounded-xl mx-auto border-2">
          <div className="flex justify-between h-fit mb-2">
            <div className="">
              <h6 className="font-semibold">KES 1,400.00</h6>
              <h6 className="text-slate-500">Transaction amount</h6>
            </div>
            <div>
              <h6 className="font-semibold">MPesa</h6>
              <h6 className="text-slate-500">Transaction Mode</h6>
            </div>
          </div>
          <div className="flex justify-between h-fit mb-2">
            <div>
              <h6 className="font-semibold">KV67835</h6>
              <h6 className="text-slate-500">Transaction ID</h6>
            </div>
            <div>
              <h6 className="font-semibold flex items-center">
                Completed
                <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
              </h6>
              <h6 className="text-slate-500">Transaction Status</h6>
            </div>
          </div>
          <div className="flex justify-between h-fit mb-2 items-center">
            <h6 className="text-slate-500">02 Sep 2023, 12.24pm</h6>
            <Link to="/cook/viewtransacorder">
              <h6 className="w-20 flex items-center justify-center mr-8 h-10 rounded-xl bg-slate-500 text-white">
                <VisibilityOutlined /> View
              </h6>
            </Link>
          </div>
        </div>
        <div className="lg:w-2/3 w-11/12 mt-2 p-2 shadow-inner rounded-xl mx-auto border-2">
          <div className="flex justify-between h-fit mb-2">
            <div className="">
              <h6 className="font-semibold">KES 1,400.00</h6>
              <h6 className="text-slate-500">Transaction amount</h6>
            </div>
            <div>
              <h6 className="font-semibold">MPesa</h6>
              <h6 className="text-slate-500">Transaction Mode</h6>
            </div>
          </div>
          <div className="flex justify-between h-fit mb-2">
            <div>
              <h6 className="font-semibold">KV67835</h6>
              <h6 className="text-slate-500">Transaction ID</h6>
            </div>
            <div>
              <h6 className="font-semibold flex items-center">
                Completed
                <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
              </h6>
              <h6 className="text-slate-500">Transaction Status</h6>
            </div>
          </div>
          <div className="flex justify-between h-fit mb-2 items-center">
            <h6 className="text-slate-500">02 Sep 2023, 12.24pm</h6>
            <Link to="/cook/viewtransacorder">
              <h6 className="w-20 flex items-center justify-center mr-8 h-10 rounded-xl bg-slate-500 text-white">
                <VisibilityOutlined /> View
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
