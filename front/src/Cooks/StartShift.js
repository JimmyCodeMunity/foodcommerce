import React, { useContext, useEffect, useState } from "react";
import { CheckBox } from "@mui/icons-material";
import food from "../Media/Ellipse 2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CookData } from "../Reusable/CookData";
import { CooksNav } from "../Reusable/DriverNav";
import { useSelector } from "react-redux";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
const label = { inputProps: { "aria-label": "Switch demo" } };

const StartShift = () => {
  const { Id } = useParams();
  const Shift_id = useSelector((state) => state.shiftId.value);
  const ShiftID = Shift_id[0];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [checkedOrders, setCheckedOrders] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/new-orders/${Id}`)
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

  const handleCheckboxChange = (index, orderId) => {
    apiClient
      .put(`cook/update-new-orders/${orderId}`)
      .then((response) => {
        console.log(response.data);
        const updatedCheckedOrders = [...checkedOrders];
        updatedCheckedOrders[index] = true;
        setCheckedOrders(updatedCheckedOrders);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  return (
    <div className="h-full">
      <div className="max-lg:w-full max-lg:mx-auto w-3/4">
        <CookData />
        <div className="overflow-auto flex flex-col justify-between">
          {data.map((item, index) => {
            return (
              <div
                className="flex justify-between items-center w-11/12 h-24 mt-3 mx-auto"
                key={index}
              >
                <Link to={`/cook/mealinfo/${item.id}`}>
                  <div className="flex items-center">
                    <img src={food} alt="lantern app" />
                    <div className="flex flex-col justify-evenly h-full ml-4">
                      <div className="flex w-full justify-between flex-col">
                        <h6 className="text-red-500">
                          {" "}
                          <NumberFormat
                            value={item.order_total}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          />
                        </h6>
                        <h6 className="text-sm">Order id:{item.order_no}</h6>
                      </div>
                    </div>
                  </div>
                </Link>
                <CheckBox
                  {...label}
                  checked={checkedOrders[index]}
                  onClick={() => handleCheckboxChange(index, item.id)}
                />
              </div>
            );
          })}
        </div>
        <div className="w-11/12 mx-auto mt-5 flex">
          <Link
            to={`/cook/editshift/${ShiftID}`}
            className="w-1/2 h-10 rounded border-2 border-slate-500 text-slate-500"
          >
            <button className="w-full h-full rounded  text-slate-500">
              Edit Shift
            </button>
          </Link>
          <Link
            to={`/cook/endshift/${ShiftID}`}
            className="w-1/2 ml-2 h-10 rounded bg-red-500 text-white"
          >
            <button className="w-full ml-2 h-full rounded bg-red-500 text-white">
              End Shift
            </button>
          </Link>
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};
export default StartShift;
