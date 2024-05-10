import React, { useContext } from "react";
import tick from "../Media/orange.png";
import { Link, useParams} from "react-router-dom";
import Topnav from "../Reusable/Topnav";


const Thanks = () => {
const {Id} = useParams()
  return (
    <div className="h-full ">
        <Topnav/>
      <div className="h-4/5 flex justify-center flex-col">
        <div className="flex items-center justify-center flex-col">
          <img src={tick} alt="lantern" className="w-44 h-44" />
          <h6 className="text-xl text-lanternOrange mt-4">Thank you for your feedback</h6>
          <h6 className="text-black ">
          We really appreciate what you have shared with us.
          </h6>
        </div>
             <Link to={`/driver/home/${Id}`}>
        <div className="w-11/12 mx-auto h-12 rounded-lg bg-lanternOrange text-white my-4">
          <button className="w-full h-full ">Back Home</button>
        </div>
      </Link>
      </div>
 
    </div>
  );
};

export default Thanks;
