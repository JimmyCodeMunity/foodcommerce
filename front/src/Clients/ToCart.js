import React, { useContext, useEffect, useState } from "react";
import {
  AccessTime,
  AddCircle,
  ChevronLeft,
  FavoriteBorder,
  Redeem,
  RemoveCircleOutline,
  Restaurant,
  Star,
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import Slider from "react-slick";
import NumberFormat from "react-number-format";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { ClientIdContext } from "../Helper/Context";

const ToCart = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [target, setTarget] = useState(1);
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [data, setData] = useState([]);
  const { clientId } = useContext(ClientIdContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/cook-meal/${Id}`)
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  console.log(data[0]?.cook)

  const [slideIndex, setCurrentSlideIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const settings = {
    appendDots: (dots) => (
      <div className=" w-fit border border-lanternOrange rounded h-2 mx-auto">
        {" "}
        {dots}{" "}
      </div>
    ),
    customPaging: function (i) {
      return (
        <div className="h-2 rounded w-8 border border-lanternOrange">
          <div
            className={`h-full ${
              slideIndex === i ? "bg-lanternOrange w-5" : ""
            }`}
            style={{ width: "100%" }}
          ></div>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlideIndex(index), // Update slideIndex after change
    beforeChange: (_, next) => setTotalSlides(next + 1), // Update totalSlides before change
  };

  const incrementTarget = () => {
    setTarget((prevTarget) => prevTarget + 1);
  };

  const decrementTarget = () => {
    if (target > 0) {
      setTarget((prevTarget) => prevTarget - 1);
    }
  };

  useEffect(() => {
    if (data && data.meal_price !== undefined) {
      setTotalMealPrice(data.meal_price * target);
    }
  }, [data, target]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post("/add-to-cart", {
        meal_id: Id,
        qty: target,
        unit_price: data[0].meal_price * target,
      });

      if (response.data.status === "success") {
        setLoading(false);
        navigate(`/client/address/${Id}`);
        console.log(response.data);
      } else {
        setLoading(false);
        setError(
          "An error occurred. Meal was NOT added to cart. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
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
      <div className="relative  w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div className="flex">
        <div className="w-full rounded mx-auto max-lg:w-full">
          <Link
            to={`/client/home/${clientId}`}
            className=" flex font-sans no-underline items-center w-full bg-lanternOrange  text-white h-11 text-left "
          >
            <h6 className="flex items-center ml-4 text-xl max-lg:text-base">
            <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
              Meal Details
            </h6>
          </Link>
          <div className="h-full ">
            {data?.map((item, index) => {
              return (
                <div className="flex mt-2">
                  <div className=" h-full mb-16 w-2/3 max-lg:w-full max-lg:mx-auto mr-8 max-lg:h-full">
                      <div className="relative h-full max-lg:h-64 mb-4 ">
                        <div className="w-full mx-auto h-full">
                          <Slider {...settings} className="h-full mb-2">
                            {item.meals_images?.map((image, imageIndex) => {
                              return (
                                <img
                                  src={image?.image_url}
                                  alt="lantern foods"
                                  className="max-lg:h-60 h-80"
                                  key={imageIndex}
                                />
                              );
                            })}
                          </Slider>
                        </div>
                        <div className="absolute w-fit pt-2 px-2 h-10 bg-white/60 top-0 max-lg:left-0 left-0 text-center py-1">
                              <h6 className="my-auto font-[kalam] font-normal">
                                {data[0].cook?.kitchen_name}
                              </h6>
                            </div>
                      </div>

                    <div className=" h-fit    mt-4">
                      <div className="flex justify-between  w-11/12 mx-auto h-24 items-center">
                        <div className="h-16 flex flex-col justify-evenly">
                          <h6 className="font-[kalam] font-semibold text-xl">
                            {item.cook.kitchen_name}
                          </h6>
                          <h6 className="font-normal">
                            <Star
                              style={{ fontSize: "1rem", color: "#FED10A" }}
                            />
                            4.3
                            <span>(320 Reviews)</span>
                          </h6>
                          <h6 className="font-normal text-lanternOrange font-[kalam] ">
                            {item.meal_name}
                          </h6>
                        </div>
                        <h6 className="flex w-32 h-10 rounded-xl bg-black/30 justify-evenly text-white items-center">
                          <RemoveCircleOutline onClick={decrementTarget} />
                          {target}
                          <AddCircle onClick={incrementTarget} />
                        </h6>
                      </div>
                      <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
                        <h6>  <NumberFormat
                          value={item.meal_price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Ksh. "}
                        /></h6>
                      

                        <div className=" text-slate-600 flex items-center">
                          <h6 className="font-normal flex items-center">
                            <AccessTime />
                            {item.prep_time}
                          </h6>
                        </div>
                      </div>
                      <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
                        <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                          <Star style={{ fontSize: "1rem" }} />
                          4.3
                        </h6>
                        <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                          <img src={hat} alt="..." className="w-4 h-4" />
                          4.3
                        </h6>
                        <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                          <Redeem style={{ fontSize: "1rem" }} />
                          4.3
                        </h6>
                        <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                          <Restaurant style={{ fontSize: "1rem" }} />
                          4.3
                        </h6>
                        <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                          <FavoriteBorder style={{ fontSize: "1rem" }} />
                          4.3
                        </h6>
                      </div>
                    </div>
                    <div className="w-11/12 mx-auto font-normal h-fit ">
                      <h6 className="font-normal  mt-3">{item.meal_desc}</h6>

                      <h6 className="font-[kalam] font-normal text-2xl mt-4">
                        Serving advice
                      </h6>
                      <h6 className="font-normal">{item.serving_advice}</h6>
                    </div>
                  </div>
                  <div className="pb-6 rounded w-2/5 ml-10 max-lg:ml-0  max-lg:w-full px-2 h-[20rem] max-lg:h-24 flex max-lg:flex-row flex-col justify-evenly mx-auto max-lg:mt-2 max-lg:fixed bg-lanternOrange/10 max-lg:items-center max-lg:bg-white bottom-0  max-lg:justify-between max-lg:px-0">
                    <h6 className="text-2xl font-semibold max-lg:hidden text-lanternOrange text-left w-11/12 mx-auto">
                      Billing Summary
                    </h6>
                    <div className="h-1/2 max-lg:h-16 max-lg:w-1/2 flex flex-col justify-evenly items-center max-lg:ml-3">
                      <div className="flex justify-between w-11/12 max-lg:w-full items-center max-lg:flex-col max-lg:items-start">
                        <h6 className="font-normal text-slate-600">
                          Order Total
                        </h6>
                        <h6 className="font-bold text-xl text-slate-500">
                          <NumberFormat
                            value={item.meal_price * target}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          />
                        </h6>
                      </div>
                      <div className="flex justify-between w-11/12 items-center max-lg:hidden">
                        <h6 className="text-lanternOrange">Total</h6>

                        <h6 className="font-bold text-2xl text-lanternOrange">
                          <NumberFormat
                            value={item.meal_price * target}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh."}
                          />
                        </h6>
                      </div>
                    </div>
                    {target === 0 ? (
                      <Tooltip title="add meal to continue">
                        <Button
                          disabled
                          style={{
                            backgroundColor: "gray",
                            borderRadius: "1rem",
                            width: "8rem",
                            height: "2.8rem",
                            color: "#ffffff",
                          }}
                        >
                          Add to cart
                        </Button>
                      </Tooltip>
                    ) : (
                      <button
                        className="max-lg:w-40 w-11/12 max-lg:mx-0 mx-auto h-12  bg-lanternOrange text-white rounded-xl"
                        onClick={handleSubmit}
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToCart;
