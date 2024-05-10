import React from "react";
import Topnav from "../Reusable/Topnav";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";

const Message = () => {
  const {Id} = useParams()

  return (
    <div className="">
          <Topnav />
      <Link
        to={`/driveradmin/myaccount/${Id}`}
        className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white my-3 text-left"
      >
      <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
       View Message</h6>
      </Link>
      <div className="w-11/12 mx-auto">
          <div>
          <h2 className="font-sans">Message #MID</h2>
          <div className="flex text-slate-400">
            <h6 className="pr-2 border-r-2 border-slate-400">Audience(e.g Active Orders)</h6>
            <h6 className="ml-2">Nov 20, 2024</h6>
          </div>
        </div>
        <h6 className="my-3 font-semibold">Title</h6>
        <h6>
          Lorem ipsum dolor sit amet consectetur. Est consectetur interdum
          placerat eget aliquam venenatis scelerisque viverra. Sed sem phasellus
          commodo nullam lobortis. Amet sit pulvinar laoreet quis sapien
          suscipit lacinia turpis volutpat. Tincidunt commodo erat et augue leo
          nulla quis. Nunc ornare odio orci lobortis.{" "}
        </h6>
      </div>
      
    </div>
  );
};

export default Message;
