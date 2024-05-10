import { StarOutline } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Topnav from "../Reusable/Topnav";

const RateDriver = () => {
  const navigate = useNavigate();
  const {Id} = useParams()
  return (
    <div className="h-full ">
        <Topnav/>
      <div className="w-11/12   mx-auto font-sans flex flex-col justify-evenly">
        <div className="w-52 mx-auto h-52">
          <img
            src="https://s3-alpha-sig.figma.com/img/0161/dbfe/b946b49816f128751a55045f7afac07c?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GP6ac-W0aXefAXHoyd-5Jz4joojcZ-msRFbcnCzgT0i0Zhgob-jhj0lAiZeE6E4zikNYysff50bsW5oy6EEpYZSbevLK6RAfz8YhQGyhPwAEKPOzUPg~YwSM86nrTqfZib-BL6f6tuy61ZVcsveLgPQwtqV9Idd~G3YJj3zIm3n9CP7iUOsc8emvHmWA0fVyj9T-VOKf9BDsgO1Fk-pXLQFO7IZGZlAYfYhalEuknvEoLoikQZWATFtEDRqyLh54Bb5eb7h~Ed4VxAtiHzR3JLdjaMKamQMP1on1U1YY1ni5S3xFkmDODjNADbDI59bINTuV-POUl~0YptVpA1at7Q__
"
            alt="lantern app"
            className="w-full h-full"
          />
        </div>
        <div className="h-full flex flex-col justify-between w-full ">
          <div>
            <h6 className=" text-center text-lanternOrange text-xl w-11/12">
              Rate our delivery
            </h6>
            <h6 className=" text-center text-black font-normal w-11/12">
              We need your feedback to improve our delivery services
            </h6>
          </div>

          <h6 className="text-lg font-normal">
            How was your experience with our delivery partner?
          </h6>
          <div className="">
            <h6 className="text-base font-normal mt-2">Timelines</h6>
            <div className="flex w-1/2 justify-between">
              <StarOutline /> <StarOutline /> <StarOutline /> <StarOutline />
              <StarOutline />
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">Courtesy</h6>
            <div className="flex w-1/2 justify-between">
              <StarOutline /> <StarOutline /> <StarOutline /> <StarOutline />
              <StarOutline />
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">Food handling</h6>
            <div className="flex w-1/2 justify-between">
              <StarOutline /> <StarOutline /> <StarOutline /> <StarOutline />
              <StarOutline />
            </div>
          </div>
          <TextField
            id="outlined-textarea"
            placeholder="Would you share more on how you find our
            delivery partner?"
            multiline
            className="text-base my-3"
          />
          <div className="h-24 flex flex-col justify-between">
            <button
              className="w-full h-12 text-base rounded bg-lanternOrange text-white"
              onClick={() => navigate(`/client/reviewpackaging/${Id}`)}
            >
              Rate Driver
            </button>
            <h6 className="text-center mx-8">
              Will not give feedback?
              <span className="text-lanternOrange">
                <Link to="/client/home" className="text-lanternOrange mr-2">
                  Skip
                </Link>
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateDriver;
