import {
  FormControl,
  Input,
  InputLabel
} from "@mui/material";
import React from "react";





const CookInfo = () => {

  return (
    <div>
      <div className="h-fit mb-4  w-full  max-lg:ml-2 flex justify-between  bg-lanternOrange/30 p-2 ">
        <h6
          className="text-3xl 
            text-lanternOrange"
        >
          Cook's Profile
        </h6>
        <div className="h-full">
          <button className=" bg-lanternOrange text-white w-24 h-fit rounded-lg mt-2">
            Review
          </button>
        </div>
      </div>
      <div className="ml-2 flex justify-between max-lg:flex-col">
        <div className="w-44 h-44 bg-slate-500 rounded max-lg:mx-auto"></div>
          <div className="w-1/2 h-72 justify-between  flex flex-col max-lg:w-2/3 max-lg:mx-auto max-lg:mt-5">
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Full Name</InputLabel>
              <Input id="component-simple" defaultValue="Ahmed Abubakar" />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">ID Number</InputLabel>
              <Input id="component-simple" defaultValue="Ahmed Abubakar" />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Phone Number</InputLabel>
              <Input id="component-simple" defaultValue="Ahmed Abubakar" />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Description</InputLabel>
              <Input id="component-simple" defaultValue="Ahmed Abubakar" />
            </FormControl>

          
          </div>
      </div>
    </div>
  );
};

export default CookInfo;
