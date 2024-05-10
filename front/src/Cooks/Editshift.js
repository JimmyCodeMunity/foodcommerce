import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import food from "../Media/Ellipse 2.png";
import {
  AccessTime,
  AddCircle,
  ChevronLeft,
  KeyboardArrowDown,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import { CooksNav } from "../Reusable/DriverNav";
import { useSelector } from "react-redux";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const label = { inputProps: { "aria-label": "Switch demo" } };
const EditShift = () => {
  const [shift, setShift] = useState([]);
  const [meal, setMeal] = useState([]);
  const navigate = useNavigate();
  const { Id } = useParams();
  const Shift_id = useSelector((state) => state.shiftId.value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(0);
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [targetByMealId, setTargetByMealId] = useState({});
  
 
  const incrementTarget = (mealId) => {
    setTargetByMealId(prevTargets => ({
      ...prevTargets,
      [mealId]: (prevTargets[mealId] || 0) + 1 
    }));
  };

  
  const decrementTarget = (mealId) => {
    if (targetByMealId[mealId] && targetByMealId[mealId] > 0) {
      setTargetByMealId(prevTargets => ({
        ...prevTargets,
        [mealId]: prevTargets[mealId] - 1 
      }));
    }
  };

  const handleMealSelection = (meal) => {
    const updatedSelectedMeals = [...selectedMeals, { meal_id: meal.id }];
    setSelectedMeals(updatedSelectedMeals);
    const mealPrice = meal.meal_price * (targetByMealId[meal.id] || 0);
    setTotalMealPrice(prevTotal => prevTotal + mealPrice);
  };
  

useEffect(() => {
  setFormValues((prevState) => ({
    ...prevState,
    estimated_revenue: totalMealPrice,
  }));
}, [totalMealPrice]);

  const initialState = {
    cook_id: shift.cook_id,
    estimated_revenue: totalMealPrice,
    start_time: "",
    end_time: "",
    shift_date: shift.shift_date,
  };
  const [formValue, setFormValues] = useState(initialState);

  console.log(selectedMeals);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      apiClient
        .get(`/cook/shift-edit/${Id}`)
        .then((response) => {
          setShift(response.data.data[0]);
          setMeal(response.data.data[1]);
          setLoading(false);
          console.log("shift", response.data.data[0]);
          console.log("meal", response.data.data[1]);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Id) {
      getSingleShift(Id);
    } else {
      setFormValues({ ...initialState });
    }
  }, [Id]);

  const getSingleShift = async (id) => {
    const singleShift = await apiClient.get(
      `/cook/shift-edit/${Id}`
    );
    setFormValues({ ...singleShift.data.data[0] });
  };

  const handleEditShift = async (e) => {
    try {
      setLoading(true);
      const response = await apiClient.put(
        `/cook/shift-update/${Id}`,
        formValue
      );
      setMessage("Details updated successfully");
      setLoading(false);
      navigate(`/cook/startshift/${shift.cook_id}`);
    } catch (error) {
      console.error(error);
      setError("Failed to update the details. Please try again.");
    }
  };
  return (
    <div className="h-full ">
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

      <Link
        to={`/cook/shiftinfo/${Id}`}
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Edit Shift
        </h6>
      </Link>
      <div>
        <div className="h-14 flex font-sans no-underline items-center w-full bg-white text-black ">
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
              inputProps={{ "aria-label": "search google maps" }}
              value={formValue.start_time}
              onChange={(e) =>
                setFormValues({ ...formValue, start_time: e.target.value })
              }
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
              value={formValue.end_time}
              onChange={(e) =>
                setFormValues({ ...formValue, end_time: e.target.value })
              }
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <KeyboardArrowDown />
            </IconButton>
          </Paper>
        </div>

        <div className="flex w-11/12 justify-between mx-auto">
          <div className="border-b-2 border-black w-1/2">
            <h6 className="flex items-center font-[kalam] justify-center ml-2">
              Meals <KeyboardArrowDown />
            </h6>
          </div>
          <div className=" w-1/2 ml-2">
            <h6 className="flex items-center font-[kalam] justify-center">
              Package <KeyboardArrowDown />
            </h6>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-between">
        {meal?.map((item, index) => {
          return (
            <div className="flex items-center justify-between">
              <div
                className="flex w-4/5 items-center h-24 mt-8 mx-auto"
                onClick={() => navigate("")}
              >
                <img src={food} alt="lantern app" />
                <div className="flex flex-col justify-evenly h-full ml-5">
                  <h6 className="font-semibold">{item.meal_name}</h6>
                  <h6 className="text-red-500">{item.meal_price}</h6>
                  <div className="flex w-full justify-between items-center">
                        <div>
                          <h6 className="flex items-center justify-between  w-20">
                            <IconButton onClick={()=>decrementTarget(item.id)}>
                              <RemoveCircleOutline />
                            </IconButton>
                            {targetByMealId[item.id] || 0}
                            <IconButton onClick={()=>incrementTarget(item.id)}>
                              <AddCircle />
                            </IconButton>
                          </h6>
                        </div>
                        <h6 className="text-sm ml-2">Target: {targetByMealId[item.id] || 0}</h6>
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
        <div className="py-2 w-11/12 h-24 flex flex-col justify-between mx-auto bg-white my-4 bottom-0">
          <div className="flex justify-between">
            <h6 className="text-slate-500">Number of meals selected</h6>
            <h6 className=" font-semibold">{selectedMeals?.length}</h6>
          </div>
          <div className="flex justify-between items-center">
            <h6 className="text-slate-500">Shift target</h6>
            <NumberFormat
                  value={totalMealPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Ksh. "}
                />
          </div>
          {/* <div className="flex">
            <FormControlLabel
              value="Package Inclusive"
              control={<Radio />}
              label="Package Inclusive"
              className="w-1/2"
              style={{ fontSize: "0.5rem" }}
            />

            <FormControlLabel
              value="Package Exclusive"
              control={<Radio />}
              className="text-red-500 w-1/2"
              label="Package Exclusive"
              style={{ fontSize: "0.5rem" }}
            />
          </div> */}
          <div className="w-full mx-auto bg-white my-3">
            <button
              className=" w-full bg-green-500 text-white mx-auto h-12 rounded"
              onClick={handleEditShift}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default EditShift;
