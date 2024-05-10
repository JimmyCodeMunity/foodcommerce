import React, { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import food from "../Media/Ellipse 2.png";
import {
  AccessTime,
  AddCircle,
  KeyboardArrowDown,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Radio,
} from "@mui/material";
import { CooksNav } from "../Reusable/DriverNav";
import NumberFormat from "react-number-format";
import { apiClient } from "../Storage/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { CookIdContext } from "../Helper/Context";

const label = { inputProps: { "aria-label": "Switch demo" } };
const ShiftPackage = () => {
  const Shift_id = useSelector((state) => state.shiftId.value);
  const cookId = useContext(CookIdContext);
  const { Id } = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [target, setTarget] = useState(0);
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [targetByMealId, setTargetByMealId] = useState({});

  console.log(Shift_id.data);

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

  const incrementTarget = (mealId) => {
    setTargetByMealId((prevTargets) => ({
      ...prevTargets,
      [mealId]: (prevTargets[mealId] || 0) + 1,
    }));
  };

  const decrementTarget = (mealId) => {
    if (targetByMealId[mealId] && targetByMealId[mealId] > 0) {
      setTargetByMealId((prevTargets) => ({
        ...prevTargets,
        [mealId]: prevTargets[mealId] - 1,
      }));
    }
  };

  const handleMealSelection = (meal) => {
    const updatedSelectedMeals = [...selectedMeals, { meal_id: meal.id }];
    setSelectedMeals(updatedSelectedMeals);
    const mealPrice = meal.meal_price * (targetByMealId[meal.id] || 0);
    setTotalMealPrice((prevTotal) => prevTotal + mealPrice);
  };

  console.log(selectedMeals);

  const handleStartShift = () => {
    setLoading(true);
    const requestData = {
      start_time: startTime,
      end_time: endTime,
      shift_date: new Date().toISOString().split("T")[0],
      estimated_revenue: totalMealPrice,
      meals: selectedMeals,
      cook_id: cookId.cookId,
    };

    apiClient
      .post("/cook/create-shift", requestData)
      .then((response) => {
        setLoading(false);
        navigate(`/cook/startshift/${Id}`);
        console.log(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.error("Error starting shift:", error);
      });
  };

  return (
    <div className="  relative">
      <div className="flex max-lg:flex-col">
        <div className="flex flex-col w-3/4 max-lg:w-full mx-auto">
          <div className="h-14 max-lg:flex hidden font-sans no-underline items-center w-full bg-white text-black ">
            <h6 className="flex items-center text-xl ml-4">Shift Period</h6>
          </div>
          <div className="max-lg:flex w-full justify-between hidden">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                marginY: "1rem",
              }}
              className="w-2/5 mx-auto mr-2 border border-slate-700 "
            >
              <AccessTime />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="10:00"
                inputProps={{ "aria-label": "search google maps" }}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <KeyboardArrowDown />
              </IconButton>
            </Paper>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                marginY: "1rem",
              }}
              className="w-2/5 mx-auto border border-slate-700"
            >
              <AccessTime />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="16:00"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <KeyboardArrowDown />
              </IconButton>
            </Paper>
          </div>
          <div className="flex w-11/12 justify-between  mx-auto my-3">
            <div className="border-b-2 border-black  w-1/2">
              <h6 className="flex items-center justify-center ml-2">
                Meals <KeyboardArrowDown />
              </h6>
            </div>
            <div className="w-1/2 ml-2">
              <Link to="/cook/shiftpackage">
                <h6 className="flex items-center justify-center">
                  Package <KeyboardArrowDown />
                </h6>
              </Link>
            </div>
          </div>
          <div className=" h-full overflow-auto flex flex-col justify-between w-2/3 max-lg:w-full  mb-32">
            {meals?.map((item, index) => {
              return (
                <div className="flex justify-evenly items-center w-full h-24 mt-8 mx-auto">
                  <div className=" w-3/4 flex">
                    <img src={food} alt="lantern app" className="w-14 h-14" />
                    <div className="flex flex-col justify-evenly h-full ml-5">
                      <h6 className="font-semibold">{item.meal_name}</h6>
                      <h6 className="text-red-500">
                        {
                          <NumberFormat
                            value={item?.meal_price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          />
                        }
                      </h6>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex w-full justify-between items-center">
                          <div>
                            <h6 className="flex items-center justify-between  w-20">
                              <IconButton
                                onClick={() => decrementTarget(item.id)}
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                              {targetByMealId[item.id] || 0}
                              <IconButton
                                onClick={() => incrementTarget(item.id)}
                              >
                                <AddCircle />
                              </IconButton>
                            </h6>
                          </div>
                          <h6 className="text-sm ml-2">
                            Target: {targetByMealId[item.id] || 0}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Switch
                    {...label}
                    onChange={() => handleMealSelection(item)}
                  />
                </div>
              );
            })}
            <Divider />
          </div>
        </div>

        <div className="pb-6 w-1/3 max-lg:w-full px-2 h-fit flex flex-col justify-between mx-auto max-lg:my-3 max-lg:fixed bg-lanternOrange/10 max-lg:bg-white bottom-0">
          <h6 className="text-lanternOrange  max-lg:hidden block text-xl mt-3">
            Shift Summary
          </h6>
          <div className="flex w-full justify-between max-lg:hidden">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                marginY: "1rem",
              }}
              className="w-2/5 mx-auto mr-2 border border-slate-700 "
            >
              <AccessTime />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="10:00"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <KeyboardArrowDown />
              </IconButton>
            </Paper>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                marginY: "1rem",
              }}
              className="w-2/5 mx-auto border border-slate-700"
            >
              <AccessTime />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="16:00"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <KeyboardArrowDown />
              </IconButton>
            </Paper>
          </div>
          <div className="flex justify-between mt-3 pt-2">
            <h6 className="text-slate-500">Number of meals selected</h6>
            <h6 className=" font-semibold">{selectedMeals?.length}</h6>
          </div>
          <div className="flex justify-between mt-2">
            <h6 className="text-slate-500">Number of packages selected</h6>
            <h6 className=" font-semibold">{selectedMeals?.length}</h6>
          </div>
          <div className="flex justify-between mt-2">
            <h6 className="text-slate-500">Shift target</h6>
            <h6 className=" font-semibold">
              {" "}
              {
                <NumberFormat
                  value={totalMealPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Ksh. "}
                />
              }
            </h6>
          </div>
          <div className="flex">
            <FormControlLabel
              value="Package Inclusive"
              control={<Radio />}
              label="Package Inclusive"
              className="max-lg:w-1/2 w-full"
              style={{ fontSize: "0.5rem" }}
            />

            <FormControlLabel
              value="Package Exclusive"
              control={<Radio />}
              className="text-red-500 max-lg:w-1/2 w-full"
              label="Package Exclusive"
              style={{ fontSize: "0.5rem" }}
            />
          </div>
          <div className="pb-6 w-full mx-auto ">
            <button
              className=" w-full bg-green-500 text-white  h-12 rounded"
              onClick={handleStartShift}
            >
              Start Shift
            </button>
          </div>
        </div>
      </div>
      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative h-44 w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ShiftPackage;
