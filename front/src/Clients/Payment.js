import { ChevronLeft } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const Payment = () => {
  const { Id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/order/${Id}`)
        .then((response) => {
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

  const handleProceedToPay = () => {
    if (selectedPayment === "Mpesa Prompt Payment") {
      navigate(`/client/prompt/${Id}`);
    } else if (selectedPayment === "Mpesa Manual Payment") {
      navigate(`/client/manual/${Id}`);
    }
  };

  return (
    <div>
      <div>
        <Link
          to={`/client/mealdets/${data.id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
           <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Payment
          </h6>
        </Link>
      </div>
      <div className="text-center mt-20">
        <h6 className="text-slate-500 font-normal">Order {data.order_no}</h6>
        <h6 className="text-4xl font-medium mb-8">
          <NumberFormat
            value={data.order_total}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h6>
      </div>
      <div>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          className=" w-11/12 mx-auto"
          defaultValue="female"
          name="radio-buttons-group"
          value={selectedPayment}
          onChange={(event) => setSelectedPayment(event.target.value)}
        >
        
            <FormControlLabel
              value="Mpesa Prompt Payment"
              control={<Radio />}
              label="Mpesa Prompt Payment"
              className=" h-24 w-full mx-auto bg-lanternOrange/50 border-2 mb-4 shadow-inner rounded "
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Mpesa Manual Payment"
              className=" h-24 w-full mx-auto shadow-inner border-2 rounded"
            />
        </RadioGroup>
      </div>

      <div className="w-11/12 mx-auto h-12 rounded-lg bg-lanternOrange text-white my-4">
        <button className="w-full h-full" onClick={handleProceedToPay}>Proceed to pay</button>
      </div>
    </div>
  );
};

export default Payment;
