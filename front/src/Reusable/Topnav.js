import React from "react";
import icon from "../Media/Color (2).png";
import { NotificationsNone } from "@mui/icons-material";

const Topnav = () => {
  return (
      <div className="max-lg:w-11/12 w-full mx-auto my-auto flex justify-between h-14 ">
        <img src={icon} alt="lanternapp"  className="h-4/5 my-auto " />
        <NotificationsNone style={{fontSize:"2rem"}} className="h-4/5 my-auto text-slate-500" />
      </div>
  );
};

export default Topnav;
