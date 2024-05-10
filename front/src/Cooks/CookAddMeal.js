import React, { useContext, useState } from "react";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { CookIdContext, MealIdContext } from "../Helper/Context";
import { apiClient } from "../Storage/ApiClient";

const CookAddMeal = () => {
  const { Id } = useParams();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { cookId } = useContext(CookIdContext);
  const { setMealId } = useContext(MealIdContext);
  const [formValue, setFormValue] = useState({
    cook_id: Id,
    meal_name: "",
    meal_price: "",
    min_qty: "",
    max_qty: "",
    meal_type: "",
    prep_time: "",
    meal_desc: "",
    ingredients: "",
    serving_advice: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post("/cook/create-meal", formValue);
      console.log("Response:", response.data);
      if (response.data) {
        setLoading(false);
        setMealId(response.data.meal_id);
        console.log(response.data.meal_id);
        history(`/cook/uploadcookdocs/${Id}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };
  return (
    <div className="h-full ">
           <Link
          to={`/cook/cookcreatemeals/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-11/12 mx-auto">
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Add Meals
        </h6>
      </Link>
      <div className="w-1/2 mx-auto  max-lg:w-11/12">
        <div className="flex flex-col">
          <TextField
            margin="dense"
            id="filled-basic"
            label="Meal Name"
            variant="outlined"
            value={formValue.meal_name}
            onChange={(e) =>
              setFormValue({ ...formValue, meal_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Price"
            variant="outlined"
            value={formValue.meal_price}
            onChange={(e) =>
              setFormValue({ ...formValue, meal_price: e.target.value })
            }
          />
          <div className="flex justify-between ">
            <TextField
              margin="dense"
              id="filled-basic"
              label="Min quantity"
              variant="outlined"
              className=" w-[11.5rem]"
              value={formValue.min_qty}
              onChange={(e) =>
                setFormValue({ ...formValue, min_qty: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="filled-basic"
              label="Max quantity"
              variant="outlined"
              className="w-[11.5rem]"
              value={formValue.max_qty}
              onChange={(e) =>
                setFormValue({ ...formValue, max_qty: e.target.value })
              }
            />
          </div>
          <TextField
            margin="dense"
            id="filled-basic"
            label="Meal Type"
            variant="outlined"
            value={formValue.meal_type}
            onChange={(e) =>
              setFormValue({ ...formValue, meal_type: e.target.value })
            }
          />
          <div className="flex justify-between">
            <TextField
              margin="dense"
              id="filled-basic"
              label="Preperation time"
              variant="outlined"
              className=" w-full"
              value={formValue.prep_time}
              onChange={(e) =>
                setFormValue({ ...formValue, prep_time: e.target.value })
              }
            />
          </div>
          <TextField
            margin="dense"
            id="filled-basic"
            label="Meal description"
            variant="outlined"
            value={formValue.meal_desc}
            onChange={(e) =>
              setFormValue({ ...formValue, meal_desc: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Ingredients"
            variant="outlined"
            value={formValue.ingredients}
            onChange={(e) =>
              setFormValue({ ...formValue, ingredients: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="filled-basic"
            label="Serving advice"
            variant="outlined"
            value={formValue.serving_advice}
            onChange={(e) =>
              setFormValue({ ...formValue, serving_advice: e.target.value })
            }
          />
        </div>

        <div className="w-full rounded-lg bg-lanternOrange text-white h-12 mt-4">
          <button className="font-sans w-full h-full" onClick={handleSubmit}>
            Proceed to upload images
          </button>
        </div>
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

export default CookAddMeal;
