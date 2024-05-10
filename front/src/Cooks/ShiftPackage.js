import React from "react";
import Switch from "@mui/material/Switch";
import food from "../Media/Ellipse 2.png";
import {
  AccessTime,
  AddCircle,
  KeyboardArrowDown,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import {
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Radio,
} from "@mui/material";
import { CooksNav } from "../Reusable/DriverNav";

const label = { inputProps: { "aria-label": "Switch demo" } };
const ShiftPackage = () => {
  const {Id} = useParams()
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
          <div className="flex w-11/12 justify-between mx-auto my-3">
            <div className=" w-1/2">
              <Link to={`/cook/shiftperiod/${Id}`}>
                <h6 className="flex items-center justify-center ml-2">
                  Meals <KeyboardArrowDown />
                </h6>
              </Link>
            </div>
            <div className="border-b-2 border-black w-1/2 ml-2">
              <h6 className="flex items-center justify-center">
                Package <KeyboardArrowDown />
              </h6>
            </div>
          </div>
          <div className="h-full flex flex-col justify-between w-2/3 max-lg:w-full">
            <div className="flex justify-evenly items-center w-full h-24 mt-8 mx-auto">
              <div className=" w-3/4 flex">
                <img src={food} alt="lantern app" className="w-14 h-14" />
                <div className="flex flex-col justify-evenly h-full ml-5">
                  <h6 className="font-semibold">Package Name</h6>
                  <h6 className="text-red-500">KSH 5,000</h6>
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <h6 className="flex items-center justify-between  w-20">
                        <RemoveCircleOutline /> 14
                        <AddCircle />
                      </h6>
                    </div>
                    <h6 className="text-sm ml-2">Target:24</h6>
                  </div>
                </div>
              </div>
              <Switch {...label} />
            </div>
            <div className="flex justify-evenly items-center w-full h-24 mt-8 mx-auto">
              <div className=" w-3/4 flex">
                <img src={food} alt="lantern app" className="w-14 h-14" />
                <div className="flex flex-col justify-evenly h-full ml-5">
                  <h6 className="font-semibold">Package Name</h6>
                  <h6 className="text-red-500">KSH 5,000</h6>
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <h6 className="flex items-center justify-between  w-20">
                        <RemoveCircleOutline /> 14
                        <AddCircle />
                      </h6>
                    </div>
                    <h6 className="text-sm ml-2">Target:24</h6>
                  </div>
                </div>
              </div>
              <Switch {...label} />
            </div>
            <div className="flex justify-evenly items-center w-full h-24 mt-8 mx-auto">
              <div className=" w-3/4 flex">
                <img src={food} alt="lantern app" className="w-14 h-14" />
                <div className="flex flex-col justify-evenly h-full ml-5">
                  <h6 className="font-semibold">Package Name</h6>
                  <h6 className="text-red-500">KSH 5,000</h6>
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <h6 className="flex items-center justify-between  w-20">
                        <RemoveCircleOutline /> 14
                        <AddCircle />
                      </h6>
                    </div>
                    <h6 className="text-sm ml-2">Target:24</h6>
                  </div>
                </div>
              </div>
              <Switch {...label} />
            </div>
            <Divider />
          </div>
        </div>

        <div className="pb-6 w-1/3 max-lg:w-full px-2 h-fit flex flex-col justify-between mx-auto max-lg:my-3 max-lg:fixed bg-lanternOrange/10 max-lg:bg-white bottom-4">
          <h6 className="text-lanternOrange  max-lg:hidden block text-xl mt-3">Shift Summary</h6>
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
            <h6 className="text-slate-500">Number of packages selected</h6>
            <h6 className=" font-semibold">2</h6>
          </div>
          <div className="flex justify-between mt-2">
            <h6 className="text-slate-500">Number of packages selected</h6>
            <h6 className=" font-semibold">5</h6>
          </div>
          <div className="flex justify-between mt-2">
            <h6 className="text-slate-500">Shift target</h6>
            <h6 className=" font-semibold">KES 30,000.00</h6>
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
            <Link to={`/cook/startshift/${Id}`}>
              <button className=" w-full bg-green-500 text-white  h-12 rounded">
                Start Shift
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default ShiftPackage;
