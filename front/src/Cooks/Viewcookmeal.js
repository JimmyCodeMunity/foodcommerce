import React from "react";

import {
  AccessTime,
  ChevronLeft,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";

const Viewcookmeal = () => {
  const {Id} = useParams()
  return (
    <div className="h-full ">
      <div>
        <Link
          to={`/driveradmin/addvehicle/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Upload Images
          </h6>
        </Link>
      </div>
      <div className="flex flex-col justify-evenly mt-2">
        <div>
          <div className="w-11/12 mx-auto rounded h-44 bg-slate-400"></div>

          <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
            <h6 className="font-semibold">KES 1,800</h6>
            <h6 className=" text-slate-600">Min 12: Max 24</h6>
            <div className=" text-slate-600 flex items-center">
              <AccessTime />
              <h6>30min</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto  flex flex-col justify-evenly">
        <h6>
          This is a brief description of the meal. It reflects the meal
          description written by the cook when setting up the meal in the
          system. It may include the recipe.
        </h6>
        <h6>
          This is a brief description of the meal. It reflects the meal
          description written by the cook when setting up the meal in the
          system. It may include the recipe.
        </h6>
        <h6 className="font-[Lambency] font-semibold text-2xl">Serving advice</h6>
        <h6>
          This is a brief description of the meal. It reflects the meal
          description written by the cook when setting up the meal in the
          system. It may include the recipe.
        </h6>
        <h6  className="font-[Lambency] font-semibold text-2xl">Ingredients</h6>
        <div>
          <h6>1. First Ingredient</h6>
          <h6>1. First Ingredient</h6>
          <h6>1. First Ingredient</h6>
          <h6>1. First Ingredient</h6>
          <h6>1. First Ingredient</h6>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-4">
        <Link to={`/cook/cookcreatemeals/${Id}`}className="w-full h-full text-white"> <button className=" bg-lanternOrange text-white w-full h-10 rounded">
          Add Meal
        </button></Link>
       
      </div>
    </div>
  );
};

export default Viewcookmeal;
