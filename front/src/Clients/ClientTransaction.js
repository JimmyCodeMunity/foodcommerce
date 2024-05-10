import { ChevronLeft, VisibilityOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const ClientTransactions = () => {
  const { Id } = useParams;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      apiClient
        .get("clients/payments")
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Link to={`/client/clientprofile/${Id}`}>
        <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Transaction History
          </h6>
        </div>
      </Link>

      <div>
        {data.map((item, index) => {
          return (
            <div
              className="lg:w-2/3 w-11/12 mt-2 p-2 shadow-inner rounded-xl mx-auto border-2"
              key={index}
            >
              <div className="flex justify-between h-fit mb-2">
                <div className="">
                  <h6 className="font-semibold">
                    {" "}
                    <NumberFormat
                      value={item.order_total}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  </h6>
                  <h6 className="text-slate-500">Transaction amount</h6>
                </div>
                <div>
                  <h6 className="font-semibold">MPesa</h6>
                  <h6 className="text-slate-500">Transaction Mode</h6>
                </div>
              </div>
              <div className="flex justify-between h-fit mb-2">
                <div>
                  <h6 className="font-semibold">{item.mpesa_receiot_no}</h6>
                  <h6 className="text-slate-500">Transaction ID</h6>
                </div>
                <div>
                  {item.status === "Successful Payment" ? (
                    <h6 className="font-semibold flex items-center">
                      {item.status}
                      <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
                    </h6>
                  ) : (
                    <h6 className="font-semibold flex items-center">
                      {item.status}
                      <div className="w-3 h-3 rounded-full bg-lanternOrange ml-2"></div>
                    </h6>
                  )}
                  <h6 className="text-slate-500">Transaction Status</h6>
                </div>
              </div>
              <div className="flex justify-between h-fit mb-2 items-center">
                <h6 className="text-slate-500">{item.updated_at}</h6>
                <Link to={`/cook/viewtransacorder/${Id}`}>
                  <h6 className="w-20 flex items-center justify-center mr-8 h-10 rounded-xl bg-slate-500 text-white">
                    <VisibilityOutlined /> View
                  </h6>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientTransactions;
