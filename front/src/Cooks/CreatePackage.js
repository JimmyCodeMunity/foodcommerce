import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import food from "../Media/Ellipse 2.png";
import {
  Add,
  AddCircle,
  ChevronLeft,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CooksNav } from "../Reusable/DriverNav";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
const label = { inputProps: { "aria-label": "Switch demo" } };
const CreatePackage = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [target, setTarget] = useState(0);
  const [packageName, setPackageName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [mealTargets, setMealTargets] = useState({});


  const incrementTarget = (mealId) => {
    setMealTargets((prevTargets) => ({
      ...prevTargets,
      [mealId]: (prevTargets[mealId] || 0) + 1,
    }));
  };

  const decrementTarget = (mealId) => {
    if (mealTargets[mealId] > 0) {
      setMealTargets((prevTargets) => ({
        ...prevTargets,
        [mealId]: prevTargets[mealId] - 1,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/cook_meals/${Id}`)
        .then((response) => {
          setLoading(false);
          setMeals(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const handleMealSelection = (meal) => {
    const mealId = meal.id;
    const mealTarget = mealTargets[mealId] || 0;
    
    const mealPrice = meal.meal_price * mealTarget;
    
    const updatedSelectedMeals = [...selectedMeals, { meal_id: meal.id, quantity: mealTarget }];
    setSelectedMeals(updatedSelectedMeals);
    
    setTotalMealPrice(totalMealPrice + mealPrice);
  };
  
  
  console.log(selectedMeals);

  const handleSubmit = async () => {
    const packageData = {
      cook_id: Id,
      package_name: packageName,
      package_description: desc,
      discount: discount,
      total_price: totalMealPrice,
    };
    setLoading(true);

    try {
      const response = await apiClient.post(
        "/cook/create-packages",
        packageData
      );
      setLoading(false);
      console.log("Package created successfully:", response.data);
      navigate(`/cook/cookpackage/${Id}`);
    } catch (error) {
      console.error("Error creating package:", error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="relative">
      <div
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white "
        onClick={() => navigate(`/cook/cookcreatemeals/${Id}`)}
      >
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Edit Meal
        </h6>
      </div>
      <div className="h-full flex flex-col justify-between w-2/3 max-lg:w-full">
        {meals?.map((item, index) => {
          const mealId = item.id;
          const mealTarget = mealTargets[mealId] || 0;
          return (
            <div className="flex justify-evenly items-center w-full h-24 mt-8 mx-auto">
              <div className=" w-3/4 flex">
                <img
                  src={item.meals_images[0]?.image_url}
                  alt="lantern app"
                  className="w-14 h-14"
                />
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
                    <div>
                      <h6 className="flex items-center justify-between  w-20">
                        <IconButton onClick={() => decrementTarget(mealId)}>
                          <RemoveCircleOutline />
                        </IconButton>
                        {mealTarget}
                        <IconButton onClick={() => incrementTarget(mealId)}>
                          <AddCircle />
                        </IconButton>
                      </h6>
                    </div>
                    <h6 className="text-sm ml-2">Target:{mealTarget}</h6>
                  </div>
                </div>
              </div>
              <Switch {...label} onChange={() => handleMealSelection(item)} />
            </div>
          );
        })}
        <Divider />
      </div>

      <div className="w-full">
        <div className="w-11/12 mx-auto  h-44 flex flex-col justify-evenly">
          <TextField
            id="outlined-basic"
            label="Package name"
            variant="outlined"
            className="w-full"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Brief package description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            variant="outlined"
            className="w-full"
          />
        </div>
        <div className="p-2 w-3/4 mx-auto h-24 flex flex-col justify-between max-lg:right-5 right-10 bg-white max-lg:w-11/12 border-2  bottom-10">
         
            <div className="flex justify-between bg-white h-44 items-center">
              <h6 className="text-slate-500 bg-white">Estimated Cost</h6>
              <h6 className=" font-semibold text-2xl">
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
            <div className="flex justify-between bg-white h-44 items-center">
              <h6 className="text-red-500 bg-white">Discount</h6>
              <h6 className="font-semibold text-2xl">
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
          
        </div>
      </div>
      <div className="w-11/12 mx-auto h-12 rounded-md bg-lanternOrange text-white  mt-4">
        <button className="w-full h-full" onClick={handleSubmit}>
          <Add />
          Create Package
        </button>
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

export default CreatePackage;
