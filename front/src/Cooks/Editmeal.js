import React, { useEffect, useState } from "react";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { ChevronLeft, VisibilityOutlined } from "@mui/icons-material";
import { apiClient } from "../Storage/ApiClient";

const EditMeal = () => {
  const initialState = {
    meal_name: "",
    meal_price: "",
    min_qty: "",
    max_qty: "",
    prep_time: "",
    meal_desc: "",
    meal_type:"",
    ingredients: "",
    serving_advice: "",
  };
  const { Id } = useParams();
  const [formValue, setFormValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/meal-full-edit/${Id}`)
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

  useEffect(() => {
    if (Id) {
      getSingleGroup(Id);
    } else {
      setFormValues({ ...initialState });
    }
  }, [Id]);

  const getSingleGroup = async (id) => {
    const singleGroup = await apiClient.get(`cook/meal-full-edit/${Id}`);
    setFormValues({ ...singleGroup.data.data });
  };

  const handleEditGroup = async (e) => {
    try {
      setLoading(true);
      const response = await apiClient.put(
        `/cook/meal-full-update/${Id}`,
        formValue
      );
      setMessage("Details updated successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false)
      setError("Failed to update the details. Please try again.");
    }
  };
  return (
    <div>
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
          <Alert severity="error" className="w-full absolute mt-10 top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div className="relative  w-2/3 mx-auto">
        {message && (
          <Alert severity="success" className="w-full absolute top-1/2 mt-16">
            {message}
          </Alert>
        )}
      </div>
      <div className="h-full ">
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
        <Link to={`/cook/viewmeal/${Id}`} className="text-white">
              <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Edit Meal
        </h6>
        </Link>
     
      </div>
      <div className="w-1/2 mx-auto  max-lg:w-11/12">
        <div className="flex flex-col">
          <TextField
            margin="normal"
            id="filled-basic"
            label="Meal Name"
            variant="outlined"
            value={formValue.meal_name}
            onChange={(e) =>
              setFormValues({ ...formValue, meal_name: e.target.value })
            }
          />
          <TextField
            margin="normal"
            id="filled-basic"
            label="Price"
            variant="outlined"
            value={formValue.meal_price}
            onChange={(e) =>
              setFormValues({ ...formValue, meal_price: e.target.value })
            }
          />
          <div className="flex justify-between ">
            <TextField
              margin="normal"
              id="filled-basic"
              label="Min quantity"
              variant="outlined"
              className=" w-2/5"
              value={formValue.min_qty}
              onChange={(e) =>
                setFormValues({ ...formValue, min_qty: e.target.value })
              }
            />
            <TextField
              margin="normal"
              id="filled-basic"
              label="Max quantity"
              variant="outlined"
              className="w-1/2"
              value={formValue.max_qty}
              onChange={(e) =>
                setFormValues({ ...formValue, max_qty: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <TextField
              margin="normal"
              id="filled-basic"
              label="Meal type"
              variant="outlined"
              className=" w-2/5"
              value={formValue.meal_type}
              onChange={(e) =>
                setFormValues({ ...formValue, meal_type: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <TextField
              margin="normal"
              id="filled-basic"
              label="Preperation time"
              variant="outlined"
              className=" w-2/5"
              value={formValue.prep_time}
              onChange={(e) =>
                setFormValues({ ...formValue, prep_time: e.target.value })
              }
            />
          </div>
          <TextField
            margin="normal"
            id="filled-basic"
            label="Meal description"
            variant="outlined"
            value={formValue.meal_desc}
            onChange={(e) =>
              setFormValues({ ...formValue, meal_desc: e.target.value })
            }
          />
          <TextField
            margin="normal"
            id="filled-basic"
            label="Ingredients"
            variant="outlined"
            value={formValue.ingredients}
            onChange={(e) =>
              setFormValues({ ...formValue, ingredients: e.target.value })
            }
          />
          <TextField
            margin="normal"
            id="filled-basic"
            label="Serving advice"
            variant="outlined"
            value={formValue.serving_advice}
            onChange={(e) =>
              setFormValues({ ...formValue, serving_advice: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <div className="w-full rounded-lg bg-lanternOrange text-white h-12">
            <button
              className="font-sans w-full h-full"
              onClick={handleEditGroup}
            >
              Save Change
            </button>
          </div>
          <div className="w-full rounded-lg border-slate-600 border-2 text-slate-600 h-12 mt-2">
            <Link to={`/cook/mealimages/${Id}`} className="text-slate-600">
              <button className="font-sans w-full h-full">
                <VisibilityOutlined />
                View meal images
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>  
    </div>
  
  );
};

export default EditMeal;
