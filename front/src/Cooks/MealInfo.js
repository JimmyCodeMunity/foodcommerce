import React, { useContext, useEffect, useState } from "react";

import {
  ChevronLeft
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
import { CookIdContext } from "../Helper/Context";

const MealInfo = () => {
  const {Id} = useParams()
  const [data,setData] = useState([])
  const {cookId} = useContext(CookIdContext)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/single-order/${Id}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="h-full ">
      <div>
        <div className="w-3/4 max-lg:w-full ">
          <Link
            to={`/cook/startshift/${cookId}`}
            className="h-14 flex no-underline items-center w-full bg-lanternOrange text-white text-left"
          >
            <h6 className="flex items-center">
              <ChevronLeft />
              View Order
            </h6>
          </Link>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <h6 className="text-xl font-normal my-4">
          OrderID: <span className="font-semibold ml-2">{data[0]?.order_no}</span>
        </h6>

      {data.map((item,index)=>{
        return(
           <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-slate-500 mr-3"></div>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex w-full justify-between flex-col">
              <h6 className="text-sm text-slate-500 font-normal">{item.meal_name}</h6>
              <h6 className="font-normal text-lanternOrange"> <NumberFormat
                            value={item.meal_price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          /></h6>
              <h6 className=" text-slate-500 font-normal">QTY:{item.unit_price}</h6>
            </div>
          </div>
        </div>
        )
      }) }
        <div className="flex items-center justify-between w-full my-4">
            <h6 className="text-2xl font-light">Total</h6>
            <h6 className="text-2xl font-semibold"> <NumberFormat
                            value={data[0]?.order_total}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          /></h6>
        </div>
      </div>
    </div>
  );
};
export default MealInfo;
