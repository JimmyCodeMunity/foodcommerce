import { Autorenew } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";

const Pending = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [remainingTime, setRemainingTime] = useState(45); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/order/${Id}`);
        setData(response.data.data);
        if (response.data.data.status === "Successful Payment") {
          navigate(`/client/paymentsuccess/${Id}`);
        }
      } catch (error) {
        setError(error);
      }
    };
    const intervalId = setInterval(fetchData, 5000);
  

    const timeoutId = setTimeout(() => {
      if (data.status !== "Successful Payment") {
        navigate(`/client/prompt/${Id}`);
      }
    }, 90000); 
  
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      navigate(`/client/prompt/${Id}`);
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [remainingTime]);  

  return (
    <div className="w-full h-[35rem]">
      <div className="w-11/12 h-full mt-10 border-2 mx-auto rounded flex flex-col justify-between">
        <div className="h-fit w-11/12 mx-auto flex flex-col justify-between items-center">
            <Autorenew
              className=" animate-spin w-44 h-44 text-lanternOrange"
              style={{ fontSize: "4rem" }}
            />
              <h6 className="text-center text-lanternOrange h-24 text-xl">
            Time remaining: {remainingTime} seconds
          </h6>
          <h6 className="text-4xl">Processing ...</h6>
          <h6 className="text-center font-normal text-slate-500">
            Dear customer, we have sent a notification on your number, Please
            enter your MPesa pin to Proceed.
          </h6>
        </div>
        <div className=" h-2/3 flex justify-evenly w-11/12 mx-auto flex-col">
          
          <h6 className="w-full text-slate-400 flex justify-between items-center border-b-1 border-slate-500">
            Order No.<span className="text-slate-600">{data.order_no}</span>
          </h6>
          <h6 className="w-full text-slate-400 flex justify-between items-center border-b-1 border-slate-500">
            Amount to be paid<span className="text-slate-600">{data.order_total}</span>
          </h6>
          <h6 className="w-full text-slate-400 flex justify-between items-center border-b-1 border-slate-500">
            Transaction Status
            <span className="text-slate-600">In Progress</span>
          </h6>
          <h6 className="w-full text-slate-400 flex justify-between items-center border-b-1 border-slate-500">
            Transaction Date & Time
            <span className="text-slate-600">{data.updated_at}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Pending;
