import React from "react";
import Switch from "@mui/material/Switch";
import food from "../Media/Ellipse 2.png";
import {
  AddCircle,
  RemoveCircleOutline,
  ChevronLeft,
  VisibilityOutlined
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
const label = { inputProps: { "aria-label": "Switch demo" } };

const EditPackageDets = () => {
  const {Id} = useParams()
    const navigate = useNavigate()
  return (
    <div className="h-full ">
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Edit Package
        </h6>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center w-full h-24 mt-8 mx-auto">
          <div className="flex">
            <img
              src={food}
              alt="lantern app"
              className="w-16 h-14"
              onClick={() => navigate(`/cook/viewmeal/{Id}`)}
            />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Meal Name (Min 12:Max 24)</h6>
              <h6 className="text-red-500">KSH 5,000</h6>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h6 className="flex items-center">
                    <RemoveCircleOutline /> 14
                    <AddCircle />
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <Switch {...label} />
        </div>
        <div className="flex justify-between items-center w-full h-24 mt-8 mx-auto">
          <div className="flex">
            <img
              src={food}
              alt="lantern app"
              className="w-16 h-14"
              onClick={() => navigate(`/cook/viewmeal/{Id}`)}
            />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Meal Name (Min 12:Max 24)</h6>
              <h6 className="text-red-500">KSH 5,000</h6>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h6 className="flex items-center">
                    <RemoveCircleOutline /> 14
                    <AddCircle />
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <Switch {...label} />
        </div>
        <div className="flex justify-between items-center w-full h-24 mt-8 mx-auto">
          <div className="flex">
            <img
              src={food}
              alt="lantern app"
              className="w-16 h-14"
              onClick={() => navigate(`/cook/viewmeal/{Id}`)}
            />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Meal Name (Min 12:Max 24)</h6>
              <h6 className="text-red-500">KSH 5,000</h6>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h6 className="flex items-center">
                    <RemoveCircleOutline /> 14
                    <AddCircle />
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <Switch {...label} />
        </div>
      </div>

      <div className="w-full">
        <div className="w-11/12 mx-auto  h-44 flex flex-col justify-evenly">
          <TextField
            id="outlined-basic"
            label="Package name"
            variant="outlined"
            className="w-full"
          />
          <TextField
            id="outlined-basic"
            label="500"
            variant="outlined"
            className="w-full"
          />
        </div>
        <div>
          <div className="pb-6 w-11/12 h-24 flex flex-col justify-between mx-auto bg-white bottom-0">
            <div className="flex justify-between">
              <h6 className="text-slate-500">Estimated Cost</h6>
              <h6 className=" font-semibold">KES 5,000</h6>
            </div>
            <div className="flex justify-between">
              <h6 className="text-red-500">Discount</h6>
              <h6 className=" font-semibold">KES 500</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-11/12 mx-auto">
        <div className="w-full rounded-lg bg-lanternOrange text-white h-12">
          <Link to="/cook/cookpackage" className="text-white">
            <button className="font-sans w-full h-full">Save Change</button>
          </Link>
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
  );
};

export default EditPackageDets;
