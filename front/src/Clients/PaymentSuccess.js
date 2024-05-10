import React, { useEffect, useState } from "react";
import tick from "../Media/orange.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const PaymentSuccess = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/order/${Id}`)
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="flex items-center justify-center flex-col">
          <img src={tick} alt="lantern" className="w-44 h-44" />
          <h6 className="text-xl mt-4">Great</h6>
          <h6 className="text-green-500 text-2xl font-[lambency]">
            Payment Success
          </h6>
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
            <h6 className="text-slate-500">Amount Paid</h6>
            <h6 className="text-end w-20 font-semibold">
              <NumberFormat
                value={data.order_total}
                thousandSeparator={true}
                prefix={"Ksh."}
              />
            </h6>
          </div>

          <div className="flex justify-between">
            <h6 className="text-slate-500">Status</h6>
            <h6 className=" font-semibold">{data.status}</h6>
          </div>
        </div>
      </div>
      <Link to={`/client/home/${data.client_id}`}>
        <div className="w-11/12 mx-auto h-12 rounded-lg bg-lanternOrange text-white my-4">
          <button className="w-full h-full text-2xl">Back Home</button>
        </div>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
