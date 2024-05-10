import { StarOutline } from "@mui/icons-material";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import cook from "../Media/cook-looped-animation-OxTPNLy6Rn.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRider } from "../Storage/ApiClient";
import { DriverIdContext } from "../Helper/Context";

const RateCook = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [Timelines, setTimelines] = useState(0);
  const [courtesyRating, setCourtesyRating] = useState(0);
  const [packingRating, setPackingRating] = useState(0);
  const [comments, setComments] = useState("");
  const {driverId} = useContext(DriverIdContext)

  const handleRatingChange = (category, rating) => {
    switch (category) {
      case "packaging":
        setTimelines(rating);
        break;
      case "taste":
        setCourtesyRating(rating);
        break;
      case "serving":
        setPackingRating(rating);
        break;
      default:
        break;
    }
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  // Function to handle submitting the rating
  const handleSubmitRating = () => {
    setLoading(true)
    const data = {
      order_id: Id,
      timeless_rating: Timelines,
      courtesy_rating: courtesyRating,
      packaging: packingRating,
      comment: comments
    };

    apiRider.post('/driver/cook-rating', data)
      .then(response => {
        setLoading(false)
        console.log(response.data);
        navigate(`/driver/rateclient/${Id}`);
      })
      .catch(error => {
        setLoading(false)
        console.error('Error submitting rating:', error);
      });
  };

  return (
    <div className="h-full ">
        {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="w-11/12   mx-auto font-sans flex flex-col justify-evenly">
        <div className="w-52 mx-auto h-52">
          <img src={cook} alt="lantern app" className="w-full h-full" />
        </div>
        <div className="h-full flex flex-col justify-between w-full ">
          <h6 className=" text-center text-lanternOrange text-xl w-11/12">
            Rate Cook for order id #KEY2341TE
          </h6>
          <h6 className="text-lg font-normal">
            How was your experience with our Cook when delivering the order?
          </h6>
          <div className="">
            <h6 className="text-base font-normal mt-2">Timelines</h6>
            <div className="flex w-1/2 justify-between">
            {[1, 2, 3, 4, 5].map((index) => (
                <StarOutline
                  key={index}
                  onClick={() => handleRatingChange("packaging", index)}
                  className={index <= Timelines ? "text-yellow-500" : ""}
                />
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">Courtesy</h6>
            <div className="flex w-1/2 justify-between">
            {[1, 2, 3, 4, 5].map((index) => (
                <StarOutline
                  key={index}
                  onClick={() => handleRatingChange("taste", index)}
                  className={index <= courtesyRating ? "text-yellow-500" : ""}
                />
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-base font-normal mt-2">Packing</h6>
            <div className="flex w-1/2 justify-between">
            {[1, 2, 3, 4, 5].map((index) => (
                <StarOutline
                  key={index}
                  onClick={() => handleRatingChange("serving", index)}
                  className={index <= packingRating ? "text-yellow-500" : ""}
                />
              ))}
            </div>
          </div>
          <TextField
            id="outlined-textarea"
            placeholder="More insights from your order collection experience with our cook?"
            multiline
            onChange={handleCommentChange}
            className="text-base my-3"
          />
          <div className="h-24 flex flex-col justify-between">
            <button
              className="w-full h-12 text-base rounded bg-lanternOrange text-white"
              onClick={handleSubmitRating}
              // onClick={() => navigate("/driver/rateclient")}
            >
              Rate Cook
            </button>
            <h6 className="text-center mx-8">
              Will not give feedback?
              <span className="text-lanternOrange">
                {" "}
                <Link
                  to={`/driver/closedorders/${driverId}`}
                  className="text-lanternOrange mr-2"
                >
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

export default RateCook;
