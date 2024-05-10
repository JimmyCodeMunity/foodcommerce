import { CardContent, Tooltip } from "@mui/material";
import play from "../Media/filled.png";
import playgreen from "../Media/playgreen.png";
import React, { useEffect, useState } from "react";
import {
  AutoGraph,
  Restaurant,
  SetMealOutlined,
  StarOutline,
} from "@mui/icons-material";
import { CooksNav } from "../Reusable/DriverNav";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { setShiftId } from "../features/User";

const CookHome = () => {
  const { Id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [meals, setMeals] = useState([]);
  const dispatch = useDispatch();
  const [shift, setShift] = useState([]);
  const Shift_id = useSelector((state) => state.shiftId.value);
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/cook/profile/${Id}`);
        setData(response.data.data);
        console.log(response.data.data);
        const ActiveShift = response.data.data.shifts?.filter(
          (shift) => shift.shift_status === 1
        );
        const ActiveId = ActiveShift.map((shift) => shift.id);
        setActiveId(ActiveId);

        dispatch(setShiftId(ActiveId));
        const shiftDetailsPromises = ActiveId.map((id) =>
          apiClient.get(`/cook/shift-edit/${id}`)
        );
        const shiftDetailsResponses = await Promise.all(shiftDetailsPromises);
        const shiftDetailsData = shiftDetailsResponses.map(
          (response) => response.data.data
        );

        setShift(shiftDetailsData);
        console.log(shiftDetailsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [Id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/cook_meals/${Id}`)
        .then((response) => {
          setLoading(false);
          setMeals(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-full ">
      <div className="h-24 flex justify-between max-lg:ml-2 max-lg:w-11/12 w-full  max-lg:mx-auto items-center ">
        <div className="flex  justify-between">
          <div className="flex items-center">
            <div className="w-10 h-8 rounded-full bg-slate-600 mr-2"></div>
            <div className="flex flex-col w-full">
              <h6 className="text-2xl w-full font-[Lambency] ">
                {data?.kitchen_name}
              </h6>
              <h6 className="text-slate-400">{formattedDate}</h6>
            </div>
          </div>
        </div>

        {activeId && activeId[0] ? (
          <Tooltip title="View Shift Details">
            <Link to={`/cook/endshift/${activeId[0]}`}>
              <img src={playgreen} alt="lantern app" />
            </Link>
          </Tooltip>
        ) : (
          <Tooltip title="Create Shift">
            <Link to={`/cook/shiftperiod/${Id}`}>
              <img src={play} alt="lantern app" />
            </Link>
          </Tooltip>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
        <div className="border border-slate-400 max-lg:ml-2 bg-[#FED10A]/20 rounded-md">
          <Link to={`/cook/startshift/${Id}`}>
            <CardContent>
              <div className="flex justify-between">
                <SetMealOutlined />

                <h6 className="w-10 h-8 bg-white text-green-500 text-center px-4 flex justify-center items-center rounded">
                  6.5%
                </h6>
              </div>
              <h6 className="text-3xl font-semibold">3 Incoming Orders</h6>
              <h6 className="text-slate-500">Booked Orders</h6>
            </CardContent>
          </Link>
        </div>
        <div className="border border-slate-400 max-lg:ml-2 bg-slate-500/30 rounded-md">
          <Link to={`/cook/cookcreatemeals/${Id}`}>
            <CardContent>
              <div className="flex justify-between">
                <Restaurant />
                <h6 className="w-10 h-8 bg-white text-green-500 text-center px-4 flex justify-center items-center rounded">
                  6.5%
                </h6>
              </div>
              <h6 className="text-3xl font-semibold">{meals?.length}</h6>
              <h6 className="text-slate-500"> Meals</h6>
            </CardContent>
          </Link>
        </div>
        <div className="border border-slate-400 max-lg:ml-2 bg-[#FA6F26]/20 rounded-md">
          <Link to={`/cook/shiftsummary/${activeId && activeId[0]}`}>
            <CardContent>
              <div className="flex justify-between">
                <AutoGraph />

                <h6 className="w-10 h-8 bg-white text-green-500 text-center px-4 flex justify-center items-center rounded">
                  6.5%
                </h6>
              </div>
              <h6 className="text-3xl font-semibold">KES 25,000</h6>
              <h6 className="text-slate-500">Shift Summary</h6>
            </CardContent>
          </Link>
        </div>
        <div className="border border-slate-400 max-lg:ml-2 bg-green-200/40 rounded-md">
          <Link to={`/cook/reviews/${Id}`}>
            <CardContent>
              <div className="flex justify-between">
                <StarOutline />

                <h6 className="w-10 h-8 bg-white text-green-500 text-center px-4 flex justify-center items-center rounded">
                  6.5%
                </h6>
              </div>
              <h6 className="text-3xl font-semibold">4.8</h6>
              <h6 className="text-slate-500">Meal Rating</h6>
            </CardContent>
          </Link>
        </div>
      </div>
      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default CookHome;
