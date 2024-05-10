import { ChevronLeft, Star} from "@mui/icons-material";
import { Slider, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CookReviews = () => {
  const theme = useTheme()
  return (
    <div>
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white">
        <Link to="/cook/home" className="text-white">
          <h6 className="flex items-center">
            <ChevronLeft />
            Reviews
          </h6>
        </Link>
      </div>
      <div className="flex h-44 w-11/12 mx-auto">
        <div className="w-2/5 mx-auto flex  flex-col justify-center items-start ">
          <h6 className="font-normal text-4xl">4.5</h6>
          <div>
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
          </div>
          <h6 className="text-lg">13,541</h6>
        </div>
        <div className="w-3/5 mx-auto h-full ">
          <div
            direction="row"
            alignItems="center"
            className="flex items-center h-8"
          >
            5.
            <Slider
              defaultValue={100}
              aria-label="Default"
              valueLabelDisplay="auto"
              sx={{
                color: theme.palette.mode === 'dark' ? '#fa6f26' : '#fa6f26'}}

            />
          </div>
          <div
            direction="row"
            alignItems="center"
            className="flex items-center h-8"
          >
            4.
            <Slider
              defaultValue={80}
              aria-label="Default"
              valueLabelDisplay="auto"
                sx={{
                color: theme.palette.mode === 'dark' ? '#fa6f26' : '#fa6f26'}}
            />
          </div>
          <div
            direction="row"
            alignItems="center"
            className="flex items-center h-8"
          >
            3.
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
                sx={{
                color: theme.palette.mode === 'dark' ? '#fa6f26' : '#fa6f26'}}
            />
          </div>
          <div
            direction="row"
            alignItems="center"
            className="flex items-center h-8"
          >
            1.
            <Slider
              defaultValue={40}
              aria-label="Default"
              valueLabelDisplay="auto"
                sx={{
                color: theme.palette.mode === 'dark' ? '#fa6f26' : '#fa6f26'}}
            />
          </div>
          <div
            direction="row"
            alignItems="center"
            className="flex items-center h-8"
          >
            1.
            <Slider
              defaultValue={20}
              aria-label="Default"
              valueLabelDisplay="auto"
                sx={{
                color: theme.palette.mode === 'dark' ? '#fa6f26' : '#fa6f26'}}
            />
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-slate-400 mr-3"></div>
          <h6 className="font-semibold">John Doe</h6>
        </div>
        <div className="flex items-center h-8 w-fit my-2">
          <div className="flex items-center">
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
            <Star style={{ color: "gold" }} />
          </div>
          <h6 className="text-slate-400  mt-2">21/02/2023</h6>
        </div>
        <h6 className="text-justify">
          This is a brief description of the meal. It reflects the meal
          description written by the cook when setting up the meal in the
          system. It may include the recipe.
        </h6>
      </div>
    
    </div>
  );
};

export default CookReviews;
