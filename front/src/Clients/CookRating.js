import { StarOutline } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Topnav from "../Reusable/Topnav";

const CookRating = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [packagingRating, setPackagingRating] = useState(0);
  const [tasteRating, setTasteRating] = useState(0);
  const [servingRating, setServingRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleRatingChange = (category, rating) => {
    switch (category) {
      case "packaging":
        setPackagingRating(rating);
        break;
      case "taste":
        setTasteRating(rating);
        break;
      case "serving":
        setServingRating(rating);
        break;
      default:
        break;
    }
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmitRating = () => {
    console.log("Packaging Rating:", packagingRating);
    console.log("Taste Rating:", tasteRating);
    console.log("Serving Rating:", servingRating);
    console.log("Comments:", comments);

    // Navigate to the thanks page after submitting the rating
    navigate("/client/thanks");
  };

  return (
    <div className="h-full ">
      <Topnav />
      <div className="w-11/12   mx-auto font-sans flex flex-col justify-evenly">
        <div className="w-52 mx-auto h-52">
          <img
            src="https://s3-alpha-sig.figma.com/img/994e/a9cf/7d620787b31cd05295b22f3cb50c3aa5?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JFYOSDmSPIbveldmITv40F5uR5fYa48pilKyKtkTCBOn9HoRGgcFfSar27peKjORUkqrUJKEyokPE-FIcdeZ41~TcTam1Doa3Kc6tID3kB3xRfPq9bCBbsixTCUa1zZZABS4jVa9IZX3iN0~BjCS4-MotCYdpFSz7fyVc6Ml9dAESO6wbTgMiWvYeO~mlRnE8yodxFNw0WOs~ErGFZpELvh3QnNwkL-NbJrMHX9s5A5-Drb4XwuQLJyrUrQn8KsLCZjuFjenjD6t8bxSL363a0yvfJQjpnEmSFWzPebQxCKHjGyaRpcLYbDUB6onE7dSjd~o0ekOQpdI8sXLYVov7A__
"
            alt="lantern app"
            className="w-full h-full"
          />
        </div>
        <div className="h-full flex flex-col justify-between w-full ">
          <div>
            <h6 className=" text-center text-lanternOrange text-xl w-11/12">
              Rate our meal
            </h6>
            <h6 className=" text-center text-black font-normal w-11/12">
              Finally, we need your feedback to improve our kitchen experience
            </h6>
          </div>

          <h6 className="text-lg font-normal">
            How was your experience with our Meal?
          </h6>
          <div className="">
            <h6 className="text-base font-normal mt-2">Packaging</h6>
            <div className="flex w-1/2 justify-between">
              {[1, 2, 3, 4, 5].map((index) => (
                <StarOutline
                  key={index}
                  onClick={() => handleRatingChange("packaging", index)}
                  className={index <= packagingRating ? "text-yellow-500" : ""}
                />
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">Taste</h6>
            <div className="flex w-1/2 justify-between">
              {[1, 2, 3, 4, 5].map((index) => (
                <StarOutline
                  key={index}
                  onClick={() => handleRatingChange("taste", index)}
                  className={index <= tasteRating ? "text-yellow-500" : ""}
                />
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">Serving generosity</h6>
            <div className="flex w-1/2 justify-between">
              {[1, 2, 3, 4, 5].map((index) => (
                <StarOutline
                  key={index}
                  onClick={() => handleRatingChange("serving", index)}
                  className={index <= servingRating ? "text-yellow-500" : ""}
                />
              ))}
            </div>
          </div>
          <TextField
            id="outlined-textarea"
            placeholder="More insights on your experience with our cook?"
            multiline
            className="text-base my-3"
            onChange={handleCommentChange}
          />
          <div className="h-24 flex flex-col justify-between">
            <button
              className="w-full h-12 text-base rounded bg-lanternOrange text-white"
              onClick={() => navigate(`/client/thanks/${Id}`)}
              // onClick={handleSubmitRating}
            >
              Rate Cook
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

export default CookRating;
