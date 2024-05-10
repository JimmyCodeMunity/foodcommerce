import React, { useEffect, useState } from "react";

import {
  AccessTime,
  ChevronLeft,
  FavoriteBorder,
  Redeem,
  Restaurant,
  Star,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import hat from "../Media/tabler_chef-hat.png";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const ViewMeal = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/meal-full-edit/${Id}`)
        .then((response) => {
          setLoading(false);
          setData(response.data?.data);
          console.log(response.data?.data);
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
      <div className=" flex">
        <div className="w-3/4 max-lg:w-full mr-3">
          <Link
            to={`/cook/cookcreatemeals/${data?.cook_id}`}
            className="h-14 flex font-sans no-underline datas-center w-full bg-lanternOrange text-white text-left"
          >
            <h6 className="flex items-center">
              <ChevronLeft />
              View Meal
            </h6>
          </Link>

          <div>
            <div className="flex flex-col justify-evenly">
              <div>
                <div className="w-full mx-auto rounded h-44 bg-slate-400"></div>
                <div className="flex justify-between my-4 w-11/12 mx-auto">
                  <div className="h-20 flex flex-col justify-evenly">
                    <h6 className="font-[Lambency] font-semibold text-xl">
                      {data?.meal_name}
                    </h6>
                    <h6>
                      <Star style={{ fontSize: "1rem" }} /> 4.3
                      <span>(320 Reviews)</span>
                    </h6>
                    <h6>Kitchen Name</h6>
                  </div>
                  <div className="bg-green-500 text-white w-20 h-10 rounded-xl">
                    <button className="bg-green-500 text-white w-20 h-full rounded-xl">
                      Get poster
                    </button>
                  </div>
                </div>
                <div className="flex w-11/12 justify-between mx-auto h-10 datas-center">
                  <h6 className="font-semibold">{data?.meal_price}</h6>
                  <h6 className=" text-slate-600">
                    Min {data?.min_qty}: Max {data?.max_qty}
                  </h6>
                  <div className=" text-slate-600 flex datas-center">
                    <AccessTime />
                    <h6>{data?.prep_time}</h6>
                  </div>
                </div>
                <div className="flex w-11/12 justify-between mx-auto h-10 datas-center">
                  <h6 className="font-semibold flex datas-center text-slate-500 text-sm">
                    <Star style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex datas-center text-slate-500 text-sm">
                    <img src={hat} alt="..." className="w-4 h-4" />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex datas-center text-slate-500 text-sm">
                    <Redeem style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex datas-center text-slate-500 text-sm">
                    <Restaurant style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex datas-center text-slate-500 text-sm">
                    <FavoriteBorder style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                </div>
              </div>
            </div>
            <div className="w-11/12 mx-auto  flex flex-col justify-evenly overflow-auto">
              <h6>{data?.meal_desc}</h6>

              <h6 className="font-[Lambency] font-semibold text-2xl">
                Serving advice
              </h6>
              <h6>{data?.serving_advice}</h6>
              <h6 className="font-[Lambency] font-semibold text-2xl">
                Ingredients
              </h6>
              <div>
                <h6>{data?.ingredients}</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6 w-1/3 max-lg:w-full px-2 h-fit flex max-lg:flex-row flex-col justify-between mx-auto max-lg:my-3 max-lg:fixed bg-lanternOrange/10  max-lg:bg-white bottom-4">
          <div className="w-2/3 text-lanternOrange">
            <h6 className="text-2xl max-lg:hidden text-lanternOrange">
              Meal Summary
            </h6>
            <h6 className="text-xl">Total</h6>
            <h6 className="font-bold text-2xl">
              {" "}
              {
                <NumberFormat
                  value={data?.meal_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Ksh. "}
                />
              }
            </h6>
          </div>
          <Link to={`/cook/editmeal/${Id}`} className="my-auto">
            <button className="bg-lanternOrange text-white rounded-lg max-lg:w-28 h-10 w-11/12 mx-auto">
              Edit Meal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewMeal;
