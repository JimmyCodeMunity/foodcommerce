import { ChevronLeft } from "@mui/icons-material";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const Prompt = () => {
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

  const initiateMpesaPayment = () => {
    setLoading(true);
    apiClient
      .post("/mpesa/payment", {
        order_id: Id,
        phone_no: phoneNo,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status === "success") {
          navigate(`/client/pending/${Id}`);
        } else {
          setLoading(false);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error initiating Mpesa payment:", error);
        console.log("Error initiating Mpesa payment. Please try again later.");
      });
  };

  return (
    <div className="h-full">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative  w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div>
        <Link
          to={`/client/payment/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Mpesa prompt
          </h6>
        </Link>
      </div>
      <div className="w-11/12 mx-auto text-center mt-10">
        <TextField
          margin="normal"
          id="filled-basic"
          placeholder="Enter your MPesa Phone number"
          variant="outlined"
          className="w-full"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <h6 className="text-center text-slate-500 text-lg mt-4">
          You will recieve an Mpesa prompt to pay
        </h6>
        <span className="text-xl text-center  font-semibold text-black ">
          {
            <NumberFormat
              value={data.order_total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" Ksh. "}
            />
          }
        </span>
      </div>
      <div className="w-11/12 mx-auto h-10 rounded-lg bg-lanternOrange text-white my-4">
        <button
          className="w-full h-full text-xl"
          onClick={initiateMpesaPayment}
        >
          pay
        </button>
      </div>
    </div>
  );
};

export default Prompt;
