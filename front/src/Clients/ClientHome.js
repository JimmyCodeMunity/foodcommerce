import React, { useContext, useEffect, useState } from "react";
import { ClientNav } from "../Reusable/DriverNav";
import top from "../Media/client.png";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  InputBase,
  Modal,
  Paper,
} from "@mui/material";
import sort from "../Media/iconoir_sort.png";
import {
  AccessTime,
  Close,
  ErrorRounded,
  Favorite,
  FavoriteBorder,
  FilterList,
  KeyboardArrowDown,
  LocationOnOutlined,
  Redeem,
  Restaurant,
  Search,
  ShoppingCartOutlined,
  Star,
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";
import Slider from "react-slick";
import { apiClient } from "../Storage/ApiClient";
import { Link, useParams } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { ClientIdContext } from "../Helper/Context";
import NumberFormat from "react-number-format";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
};

const ClientHome = () => {
  const { setClientId } = useContext(ClientIdContext);
  const { Id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState(null);
  const [meal, setMeal] = useState(null);
  const [rating, setRating] = useState(null);
  const [cookRating, setCookRating] = useState(null);
  const [packageRating, setPackageRating] = useState(null);
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [fav, setFav] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMeal = (event) => {
    setMeal(event.currentTarget);
  };
  const handleFilter = (event) => {
    setFilter(event.currentTarget);
  };
  const handleRating = (event) => {
    setRating(event.currentTarget);
  };
  const handleCookRating = (event) => {
    setCookRating(event.currentTarget);
  };
  const handlePackageRating = (event) => {
    setPackageRating(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFilter(null);
    setMeal(null);
    setRating(null);
    setCookRating(null);
    setPackageRating(null);
  };

  const open = Boolean(anchorEl);
  const Filteropen = Boolean(filter);
  const Mealopen = Boolean(meal);
  const Ratingopen = Boolean(rating);
  const CookRatingopen = Boolean(cookRating);
  const PackageRatingopen = Boolean(packageRating);

  //Display  info
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // apiClient
      //   .get(`/get-profile/${Id}`)
      //   .then((response) => {
      //     setData(response.data.data);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setLoading(false);
      //   });
      try {
        console.log(Id)
       
        const response = await axios.get(`http://localhost:5000/api/v2/client/get-profile/${Id}`);
        const collected = response.data;
        setData(collected)
        console.log("collected info",response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)

      }
    };
    fetchData();
  }, [`/get-profile/${Id}`]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      // apiClient
      //   .get("cooks/active-shifts-meals")
      //   .then((response) => {
      //     setFoods(response.data.data);
      //     console.log(response.data.data);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setLoading(false);
      //   });
    };
    // fetchData();
  }, []);

  const [slideIndex, setCurrentSlideIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const settings = {
    appendDots: (dots) => (
      <div className=" w-fit border-2 border-lanternOrange h-2 mx-auto">
        {" "}
        {dots}{" "}
      </div>
    ),
    customPaging: function (i) {
      return (
        <div className="h-2 w-8 border-2 border-lanternOrange">
          <div
            className={`h-full ${slideIndex === i ? "bg-lanternOrange w-5" : ""
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

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      // apiClient
      //   .get("client/favorite-meals")
      //   .then((response) => {
      //     setFav(response.data.data);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setLoading(false);
      //   });
    };
    // fetchData();
  }, []);

  const addToFavorites = async (mealId) => {
    // try {
    //   const response = await apiClient.post("client/favorite-meals", {
    //     meal_id: mealId,
    //     client_id: Id,
    //   });
    //   if (response.data.status === "success") {
    //     console.log("successfully added to favorites");
    //   }
    // } catch (error) {
    //   console.error("Error adding meal to favorites", error);
    // }
  };
  return (
    <div className="h-full">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-2 text-slate-400">
          <h6 className="border-b border-slate-800">Most Popular</h6>
          <h6 className="border-b border-slate-800">Package ratings</h6>
          <h6 className="border-b border-slate-800">Cook's rating</h6>
          <h6 className="border-b border-slate-800">Servings sold</h6>
          <h6 className="border-b border-slate-800">Price</h6>
        </div>
      </Popover>
      <Popover
        open={Filteropen}
        anchorEl={filter}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="text-slate-400">
          <h6 className="border-b border-slate-800">Meal Name</h6>
          <h6 className="border-b border-slate-800">Meal Type</h6>
          <h6 className="border-b border-slate-800">Favorite</h6>
        </div>
      </Popover>
      <Popover
        open={Mealopen}
        anchorEl={meal}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div className="p-2 text-slate-400">
          <h6 className="border-b border-slate-800">Ready to cook</h6>
          <h6 className="border-b border-slate-800">Ready to Eat</h6>
        </div>
      </Popover>
      <Modal open={Ratingopen} onClose={handleClose}>
        <div className="bg-white" style={style}>
          <div className="w-full h-fit  rounded-full text-right">
            <Close
              onClick={handleClose}
              style={{
                backgroundColor: "#0002",
                borderRadius: "100%",
                margin: "1rem",
              }}
            />
          </div>
          <h6 className="text-2xl ml-2 flex items-center">
            <Star style={{ color: "gold", fontSize: "2rem" }} />
            Meal Review
          </h6>
          <div className="bg-white flex h-44 w-11/12 mx-auto px-2 rounded">
            <div className=" flex my-3 flex-col justify-between items-start ">
              <h6 className="font-normal text-3xl">4.5</h6>
              <div>
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
              </div>
              <h6 className="text-lg">13,541</h6>
            </div>
            {/* <div className="w-1/2 mx-auto h-full ">
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
                />
              </div>
            </div> */}
          </div>
        </div>
      </Modal>
      <Modal open={CookRatingopen} onClose={handleClose}>
        <div className="bg-white" style={style}>
          <div className="w-full h-fit  rounded-full text-right">
            <Close
              onClick={handleClose}
              style={{
                backgroundColor: "#0002",
                borderRadius: "100%",
                margin: "1rem",
              }}
            />
          </div>
          <h6 className="text-2xl ml-2 flex items-center">
            {" "}
            <img src={hat} alt="..." className="w-10 h-10 mr-2" />
            Cook Review
          </h6>
          <div className="bg-white flex h-44 w-11/12 mx-auto px-2 rounded">
            <div className=" flex my-3 flex-col justify-between items-start ">
              <h6 className="font-normal text-3xl">4.5</h6>
              <div>
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
              </div>
              <h6 className="text-lg">13,541</h6>
            </div>
            <div className="w-1/2 mx-auto h-2/3 ">
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
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={CookRatingopen} onClose={handleClose}>
        <div className="bg-white" style={style}>
          <div className="w-full h-fit  rounded-full text-right">
            <Close
              onClick={handleClose}
              style={{
                backgroundColor: "#0002",
                borderRadius: "100%",
                margin: "1rem",
              }}
            />
          </div>
          <h6 className="text-2xl ml-2 flex items-center">
            {" "}
            <img src={hat} alt="..." className="w-10 h-10 mr-2" />
            Cook Review
          </h6>
          <div className="bg-white flex h-44 w-11/12 mx-auto px-2 rounded">
            <div className=" flex my-3 flex-col justify-between items-start ">
              <h6 className="font-normal text-3xl">4.5</h6>
              <div>
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
              </div>
              <h6 className="text-lg">13,541</h6>
            </div>
            <div className="w-1/2 mx-auto h-2/3 ">
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
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={PackageRatingopen} onClose={handleClose}>
        <div className="bg-white" style={style}>
          <div className="w-full h-fit  rounded-full text-right">
            <Close
              onClick={handleClose}
              style={{
                backgroundColor: "#0002",
                borderRadius: "100%",
                margin: "1rem",
              }}
            />
          </div>
          <h6 className="text-2xl ml-2 flex items-center">
            <Redeem
              style={{
                fontSize: "2rem",
                backgroundColor: "#0002",
                borderRadius: "100%",
                margin: "1rem",
              }}
            />
            Packaging Review
          </h6>
          <div className="bg-white flex h-44 w-11/12 mx-auto px-2 rounded">
            <div className=" flex my-3 flex-col justify-between items-start ">
              <h6 className="font-normal text-3xl">4.5</h6>
              <div>
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
              </div>
              <h6 className="text-lg">13,541</h6>
            </div>
            <div className="w-1/2 mx-auto h-2/3 ">
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
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex">
        <div className="relative max-lg:w-full w-2/3  h-fit ">
          <div className="absolute flex-col w-full mx-auto max-lg:flex hidden">
            <div className="flex w-11/12 items-center mx-auto mt-2">
              <div className="w-16 h-16 rounded-full bg-slate-500 mr-2"></div>
              <div className="h-20 flex flex-col justify-evenly">
                <h6>What are you having today?</h6>
                <h6 className="font-[kalam] font-semibold">
                  {data?.full_name}
                </h6>
              </div>
            </div>
            <div className="flex items-center justify-evenly w-11/12 mx-auto  mr-10 ">
              <div
                className="w-11/12 flex rounded justify-between my-3 border border-slate-500 mx-auto"
                sx={{
                  p: "2px 4px",
                  ml: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  sx={{ p: "4px 0 0rem 0.8rem" }}
                  placeholder="Search by Meals"
                  onChange={(e) => setSearch(e.target.value)}
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </div>
              <div className="flex w-1/3 justify-evenly">
                <img
                  src={sort}
                  alt="lantern sort"
                  onClick={handleClick}
                  style={{ marginLeft: 2 }}
                />
                <FilterList onClick={handleFilter} style={{ marginLeft: 2 }} />
              </div>
            </div>
          </div>

          <div className="w-full max-lg:flex hidden items-end justify-end">
            <img src={top} alt="lantern" />
          </div>
          <div className="flex w-full mb-4 justify-between mx-auto ">
            <div className="border-b-2 border-black w-1/2">
              <h6
                className="flex items-center justify-center ml-2 font-[kalam]"
                onClick={handleMeal}
              >
                Express <KeyboardArrowDown />
              </h6>
            </div>
            <Link to={`/client/booked/${Id}`} className=" w-1/2 ml-2">
              <h6
                className="flex items-center justify-center  font-[kalam]"
                onClick={handleMeal}
              >
                Booked <KeyboardArrowDown />
              </h6>
            </Link>
          </div>
          {foods?.length != 1 ? (
            <div>
              {foods?.map((food, foodIndex) =>
                food.meals
                  ?.filter((meal) => {
                    return (
                      search.toLowerCase() === "" ||
                      meal.meal_name.toLowerCase().includes(search)
                    );
                  })
                  ?.map((meal, mealIndex) => {
                    return (
                      <div
                        className="flex flex-col justify-between max-lg:h-[26rem] h-[37rem] max-lg:mr-0 mr-8"
                        key={foodIndex + "-" + mealIndex}
                      >
                        <div className="relative h-full mb-4 ">
                          <div className="w-full mx-auto h-full">
                            <Slider {...settings} className="h-full">
                              {meal.meals_images?.map((image, imageIndex) => {
                                return (
                                  <img
                                    src={image?.image_url}
                                    alt="lantern foods"
                                    className="max-lg:h-64 h-96"
                                    key={imageIndex}
                                  />
                                );
                              })}
                            </Slider>
                          </div>
                          <Link to={`/client/tocart/${meal.id}`}>
                            <div className="absolute w-fit pt-2 px-2 h-10 bg-white/60 top-0 max-lg:left-7 text-center py-1">
                              <h6 className="my-auto font-[kalam] font-normal">
                                {food?.kitchen_name}
                              </h6>
                            </div>
                          </Link>
                        </div>
                        <Link to={`/client/tocart/${meal.id}`}>
                          <div className="flex flex-col  w-full mx-auto h-20 mb-10">
                            <div className="text-slate-600 flex items-center justify-between w-11/12 mx-auto">
                              <h6 className="font-semibold">
                                {meal.meal_name}
                              </h6>
                              <h6 className="flex items-center">
                                <LocationOnOutlined />
                                {food.physical_address}
                              </h6>
                            </div>
                            <div className="flex w-11/12 justify-between mx-auto items-center">
                              <div className="text-slate-600 flex items-center">
                                <NumberFormat
                                  value={meal.meal_price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Ksh. "}
                                />
                              </div>
                              <div className="text-slate-600 flex items-center">
                                <h6 className="flex items-center">
                                  <AccessTime />
                                  {meal.prep_time}
                                </h6>
                              </div>
                              <div className="text-slate-600 flex items-center">
                                <h6 className="flex items-center">
                                  <FavoriteBorder />
                                  18
                                </h6>
                              </div>
                              <div className="text-slate-600 flex items-center">
                                <h6 className="flex items-center">
                                  <Link to={`/client/mealdets/${meal.id}`}>
                                    <ShoppingCartOutlined />
                                  </Link>
                                </h6>
                              </div>
                            </div>
                            <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
                              {/* Ratings */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
              )}
            </div>
          ) : (
            <div className="h-screen">
              <div className="w-4/5  flex flex-col items-center mx-auto mt-10 justify-between ">

                <ErrorRounded style={{ fontSize: "5rem", color: "808080" }} />
                <h6 className="text-center text-slate-500 mt-3  font-normal">
                  No express meals available. Please check our Booked meals
                  seaction
                </h6>
              </div>
            </div>
          )}
        </div>
        <div className="flex max-lg:hidden flex-col ml-10 w-2/5">
          <div className="">
            <div className="flex items-center justify-evenly w-11/12 mx-auto  mr-10 ">
              <div
                className="w-11/12 flex rounded justify-between my-3 border border-slate-500 mx-auto"
                sx={{
                  p: "2px 4px",
                  ml: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  sx={{ p: "4px 0 0rem 0.8rem" }}
                  placeholder="Search by Meals"
                  onChange={(e) => setSearch(e.target.value)}
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </div>
              <div className="flex w-1/3 justify-evenly">
                <img
                  src={sort}
                  alt="lantern sort"
                  onClick={handleClick}
                  style={{ marginLeft: 2 }}
                />
                <FilterList onClick={handleFilter} style={{ marginLeft: 2 }} />
              </div>
            </div>
            <h6 className="text-lanternOrange text-2xl font-semibold mb-6">
              Top Deals
            </h6></div>
          {foods?.map((food, foodIndex) =>
            food.meals
              ?.filter((meal) => {
                return (
                  search.toLowerCase() === "" ||
                  meal.meal_name.toLowerCase().includes(search)
                );
              })
              ?.map((item, index) => {
                return (
                  <div
                    className="flex flex-col justify-between mb-4 overflow-auto"
                    key={index}
                  >
                    <div className="relative">
                      <Link to={`/client/tocart/${item.id}`}>
                        <div className="max-lg:w-full w-full mx-auto max-lg:h-52 h-80">
                          <img
                            src={item.meals_images[0]?.image_url}
                            alt="lantern foods"
                            className="w-full  h-full"
                          />
                        </div>
                        <div className="absolute w-fit px-2 h-10 bg-white/60 top-0 max-lg:left-7  text-center py-1 ">
                          <h6 className="my-auto font-[kalam] font-normal">
                            {food?.kitchen_name}
                          </h6>
                        </div>
                      </Link>
                    </div>
                    <div className="flex flex-col mt-2 w-11/12 mx-auto">
                      <div className=" text-slate-600 flex items-center justify-between w-11/12 mx-auto">
                        <h6 className="font-semibold">{item.meal_name}</h6>
                        <h6 className="flex items-center ">
                          <LocationOnOutlined />
                          {food?.physical_address}
                        </h6>
                      </div>
                      <div className="flex w-11/12 justify-between mx-auto items-center">
                        <h6 className=" text-slate-600 flex items-center">
                          <NumberFormat
                            value={item.meal_price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          />
                        </h6>
                        <div className=" text-slate-600 flex items-center">
                          <h6 className="flex items-center">
                            <AccessTime />
                            {item.prep_time}
                          </h6>
                        </div>
                        <div className=" text-slate-600 flex items-center">
                          <h6 className="flex items-center">
                            <FavoriteBorder />
                            18
                          </h6>
                        </div>
                        <div className=" text-slate-600 flex items-center">
                          <h6 className="flex items-center">
                            <Link to={`/client/mealdets/${data.id}`}>
                              <ShoppingCartOutlined />
                            </Link>
                          </h6>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })

          )}
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};

export default ClientHome;
