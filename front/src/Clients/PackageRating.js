import { StarOutline } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Topnav from "../Reusable/Topnav";

const RatePackage = () => {
  const {Id} = useParams()
  const navigate = useNavigate();
  return (
    <div className="h-full ">
        <Topnav/>
      <div className="w-11/12   mx-auto font-sans flex flex-col justify-evenly">
        <div className="w-52 mx-auto h-52">
          <img
            src="https://s3-alpha-sig.figma.com/img/216c/dbb6/2da2d133c788fb028bf88ec3cce8f58f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jtPTq46mdg~AUB2nfsA0OE-eVKNc7KgACrhz4nwcUB89vf6EQqF~w9HWDjcnQ~WUKWmXGlPQKfM02z4Z~mou5NeKzR7AcFBuxWkC1qRLGArXVtwJ9LoOP1nLwdSsucHfc~YwJVk9qP-uiwiUpIz4dSCuqI~3QOCqFcaD4pXWApUkE28Rn5QisRevw42nJE-dC054t-IynuYp-GDE~g7GPo-xDZnNycgco9CJ3I2cNORiTEtMUzAEKAESfKU1b8BgtIdZ~ZWyrAsm5FfLr54lV98vnlD4Jw6JTLbHX96TF2Q-v2OjZP4y~diCEhweOs6tDysUSylRfTTbjyOrPbh94A__
"
            alt="lantern app"
            className="w-full h-full"
          />
        </div>
        <div className="h-full flex flex-col justify-between w-full ">
          <div>
            <h6 className=" text-center text-lanternOrange text-xl w-11/12">
              Rate our packaging
            </h6>
            <h6 className=" text-center text-black font-normal w-11/12">
            We need your feedback to improve our packaging quality
            </h6>
          </div>

        
          <div className="">
            <h6 className="text-base font-normal mt-2">How secure was the packaging?</h6>
            <div className="flex w-1/2 justify-between">
              <StarOutline /> <StarOutline /> <StarOutline /> <StarOutline />
              <StarOutline />
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">How clean was the packaging?</h6>
            <div className="flex w-1/2 justify-between">
              <StarOutline /> <StarOutline /> <StarOutline /> <StarOutline />
              <StarOutline />
            </div>
          </div>
         
          <TextField
            id="outlined-textarea"
            placeholder="More details to share on your experience with
            this packaging?"
            multiline
            className="text-base my-3"
          />
          <div className="h-24 flex flex-col justify-between">
            <button
              className="w-full h-12 text-base rounded bg-lanternOrange text-white"
              onClick={() => navigate(`/client/reviewcook/${Id}`)}
            >
              Rate Packaging
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

export default RatePackage;
