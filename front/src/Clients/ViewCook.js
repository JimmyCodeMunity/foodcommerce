import React, { useContext, useEffect, useState } from "react";

import {
  ChevronLeft,
  FavoriteBorder,
  KeyboardArrowDown,
  Redeem,
  Restaurant,
  ShoppingCartOutlined,
  Star,
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";
import { Link, useParams } from "react-router-dom";
import vitumbua from "../Media/vitumbua.jpg";
import Popover from "@mui/material/Popover";
import { apiClient } from "../Storage/ApiClient";
import { ClientIdContext } from "../Helper/Context";
import dayjs from "dayjs";

const ViewCook = () => {
  const { Id } = useParams();
  const [meal, setMeal] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { clientId } = useContext(ClientIdContext);

  const handleMeal = (event) => {
    setMeal(event.currentTarget);
  };

  const handleClose = () => {
    setMeal(null);
  };
  const Mealopen = Boolean(meal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/cooks-meal/${Id}`)
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const joinedTimestamp = data[0]?.updated_at;
  const formattedDate = dayjs(joinedTimestamp).format("YYYY-MM-DD");

  return (
    <div className="h-full">
      <Popover
        open={Mealopen}
        anchorEl={meal}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-2 text-slate-400">
          <h6 className="border-b border-slate-800">Ready to cook</h6>
          <h6 className="border-b border-slate-800">Ready to Eat</h6>
        </div>
      </Popover>
      <div>
        <Link
          to={`/client/cooks/${clientId}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left mb-4"
        >
          <h6 className="flex items-center ml-1 text-lg">
            <ChevronLeft
              style={{ fontSize: "2.5rem", marginRight: "0.8rem" }}
            />
            View Cook
          </h6>
        </Link>
      </div>
      <div className="flex mt-2 max-lg:flex-col w-full max-lg:mt-0">
        <div className="w-2/3 rounded max-lg:w-full">
          <div className="flex flex-col justify-evenly mr-8 max-lg:mr-0">
            <div>
              <div className="relative">
                <div className="w-full max-lg:h-52 h-80">
                  <img
                    src={vitumbua}
                    alt="lantern foods"
                    className="w-full  h-full"
                  />
                </div>
                <div className="absolute w-20 h-10 bottom-0 right-5 text-center py-1 ">
                  <FavoriteBorder style={{ color: "white" }} />
                </div>
              </div>
              <div className="flex justify-between my-4 w-11/12 mx-auto">
                <div className="h-20 flex flex-col justify-evenly">
                  <h6 className="font-[kalam] font-semibold text-xl">
                    {data[0]?.kitchen_name}
                  </h6>
                  <h6 className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500 mr-2 "></div>
                    Active
                  </h6>
                  <h6 className="flex items-center">
                    <Star style={{ fontSize: "1rem", color: "gold" }} /> 4.3
                    <span>(320 Reviews)</span>
                  </h6>
                </div>
                <div className="text-slate-500 w-fit h-10 ">
                  <h6 className="text-slate-500 text-sm w-full h-full">
                    Joined on {formattedDate}
                  </h6>
                </div>
              </div>
              {/* <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
            <h6 className="font-semibold">KES 1,800</h6>
            <h6 className=" text-slate-600">Min 12: Max 24</h6>
            <div className=" text-slate-600 flex items-center">
              <AccessTime />
              <h6>30min</h6>
            </div>
          </div> */}
              <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
                <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                  <Star style={{ fontSize: "1rem", color: "gold" }} />
                  4.3
                </h6>
                <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                  <img src={hat} alt="..." className="w-4 h-4" />
                  4.3
                </h6>
                <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                  <Redeem style={{ fontSize: "1rem" }} />
                  4.3
                </h6>
                <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                  <Restaurant style={{ fontSize: "1rem" }} />
                  4.3
                </h6>
                <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                  <FavoriteBorder style={{ fontSize: "1rem" }} />
                  4.3
                </h6>
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto  flex flex-col justify-evenly overflow-auto">
            <h6 className="font-normal">
              This is a brief description of the meal. It reflects the meal
              description written by the cook when setting up the meal in the
              system. It may include the recipe.
            </h6>
          </div>
        </div>

        <div className="max-lg:w-11/12 max-lg:mx-0 w-2/5 mx-auto ml-10 max-lg:ml-0 mt-0 max-lg:mt-2">
          <h6 className="font-[kalam] ml-2 max-lg:ml-0 max-lg:text-xl font-semibold text-2xl">
            New Meals
          </h6>
          <div className="max-lg:flex justify-between gap-2 grid grid-cols-1">
            {data[0]?.meals?.slice(0, 3).map((item, index) => {
              return (
                <div className="max-lg:w-2/5 w-11/12 mx-auto max-lg:h-fit h-fit bg-white border shadow-inner rounded-xl">
                  <div className="w-full h-full max-lg:h-1/2">
                    <img
                      src={item.meals_images[0]?.image_url}
                      alt="lantern foods"
                      className="w-full  h-full"
                    />
                  </div>
                  <div className="flex flex-col justify-evenly w-11/12 mx-auto h-32 max-lg">
                    <h6>{item.meal_name}</h6>
                    <h6 className="flex items-center justify-between">
                      KES {item.meal_price}
                      <ShoppingCartOutlined />
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="max-lg:block h-80 hidden">
            <div className="flex w-11/12 justify-between mx-auto my-4">
            <div className="border-b-2 border-black w-1/2">
              <h6
                className="flex items-center font-[kalam] justify-center ml-2"
                onClick={handleMeal}
              >
                Meals <KeyboardArrowDown />
              </h6>
            </div>
            <div className=" w-1/2 ml-2">
              <h6
                className="flex items-center font-[kalam] justify-center"
                onClick={handleMeal}
              >
                Packages <KeyboardArrowDown />
              </h6>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            {data[0]?.meals?.map((item, index) => {
              return (
                <div className="w-full h-44 bg-white border shadow-inner rounded-xl">
                  <div className="w-full h-1/2">
                    <img
                      src={item.meals_images[0]?.image_url}
                      alt="lantern foods"
                      className="w-full  h-full"
                    />
                  </div>
                  <div className="flex flex-col justify-evenly w-11/12 mx-auto h-1/2">
                    <h6>{item.meal_name}</h6>
                    <h6 className="flex items-center justify-between">
                      KES {item.meal_price}
                      <ShoppingCartOutlined />
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewCook;
