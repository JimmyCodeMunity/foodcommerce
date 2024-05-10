import React, { useEffect, useState } from "react";
import { ClientNav } from "../Reusable/DriverNav";

import {
  AccessTime,
  ChevronLeft,
  Favorite,
  FavoriteBorder,
  Redeem,
  Restaurant,
  ShoppingCartOutlined,
  Star,
  Close,
  LocationOnOutlined
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";
import {  Modal,  Slider } from "@mui/material";


import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
};
const FavMeals = () => {
  const {Id} = useParams()

  const [rating, setRating] =useState(null);
  const [cookRating, setCookRating] =useState(null);
  const [packageRating, setPackageRating] =useState(null);
  const [fav,setFav] =useState([])
  const [foods,setFoods] = useState([])
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [search, setSearch] = useState("");


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
 
    setRating(null);
    setCookRating(null);
    setPackageRating(null);
  };

  const Ratingopen = Boolean(rating);
  const CookRatingopen = Boolean(cookRating);
  const PackageRatingopen = Boolean(packageRating);


    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get("client/favorite-meals")
        .then((response) => {
          setFav(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
     useEffect(() => { fetchData();
  }, []);

  const addFavorite = async (mealId) => {
    try {
      const response = await apiClient.post("client/favorite-meals", {
        meal_id: mealId,
        client_id: Id,
      });
      if (response.data.status === "success") {
        console.log("Successfully added to favorites");
        fetchData()
        // Update the fav state to reflect the change
        setFav([...fav, { id: response.data.id, meal_id: mealId }]);
      }
    } catch (error) {
      console.error("Error adding meal to favorites", error);
    }
  };
  
  const removeFavorite = async (mealId) => {
    try {
      const response = await apiClient.delete(`client/favorite-meals/${mealId}`);
      if (response.data.status === "success") {
        console.log("Successfully removed from favorites");
        fetchData()
        console.log(mealId)
      }
    } catch (error) {
      console.error("Error removing meal from favorites", error);
    }
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get("/cook-meals")
        .then((response) => {
          setFoods(response.data.data);
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
  return (
    <div>
    
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
            <div className="w-1/2 mx-auto h-full ">
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
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
        <Link to="/client/clientprofile" className="text-white">
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Favorites
          </h6>
        </Link>
      </div>
      <div>
        <div className="flex w-11/12 justify-between mx-auto mt-2">
          <div className="border-b-2 border-black w-1/2">
            <h6 className="flex items-center justify-center ml-2 font-[kalam]">
              Meals 
            </h6>
          </div>
          <div className="w-1/2 ml-2">
            <Link to="/client/favcooks">
              <h6 className="flex items-center justify-center ml-2 font-[kalam]">
                Cooks          
              </h6>
            </Link>
          </div>
        </div>
        {foods
  ?.filter((item) => {
    return fav.some((favItem) => favItem.meal_id === item.id); // Filter based on fav array
  })
  ?.map((item, index) => {
    
              const isFavorite = fav.some(
                (favItem) => item.id === favItem.meal_id
              );
              return (
                <div
                  className="flex flex-col justify-between max-lg:h-[26rem] h-[37rem]"
                  key={index}
                >
                  <div className="relative   h-full mb-4  ">
                    <div className="w-full mx-auto h-full">
                      <div className="h-full">
                      
                            <img
                              src={item.meals_images[0]?.image_url}
                              alt="lantern foods"
                              className=" max-lg:h-64 h-96"
                            />
                         
                      </div>
                    </div>
                    <Link to={`/client/tocart/${item.id}`}>
                      <div className="absolute w-20 h-10 bg-white/60 top-0 max-lg:left-7 left-10 text-center py-1 ">
                        <h6 className="my-auto font-[kalam] font-normal">
                          {item.cook.kitchen_name}
                        </h6>
                      </div>
                    </Link>
                    <div className="absolute bottom-0 max-lg:right-7 right-10 text-center py-1">
                      {isFavorite ? (
                        <Favorite
                          style={{ color: "#FA6F26" }}
                          onClick={() => removeFavorite(fav.map((item)=>item.id))}
                        />
                      ) : (
                        <FavoriteBorder
                          style={{ color: "#FA6F26" }}
                          onClick={() => addFavorite(item.id)}
                        />
                      )}
                    </div>
                  </div>
                  <Link to={`/client/tocart/${item.id}`}>
                    <div className="flex flex-col mt-2 w-full mx-auto  h-44 ">
                      <div className=" text-slate-600 flex items-center justify-between w-11/12 mx-auto">
                        <h6 className="font-semibold">{item.meal_name}</h6>
                        <h6 className="flex items-center ">
                          <LocationOnOutlined />
                          {item.cook.physical_address}
                        </h6>
                      </div>
                      <div className="flex w-11/12 justify-between mx-auto items-center">
                        <div className=" text-slate-600 flex items-center">
                          <NumberFormat
                            value={item.meal_price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          />
                        </div>
                        <div className=" text-slate-600 flex items-center">
                          <h6 className="flex items-center">
                            <AccessTime />
                            {item.prep_time} prep
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
                      <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
                        <h6
                          className="font-semibold flex items-center text-slate-500 text-sm"
                          onClick={handleRating}
                        >
                          <Star style={{ fontSize: "1rem" }} />
                          4.3
                        </h6>
                        <h6
                          className="font-semibold flex items-center text-slate-500 text-sm"
                          onClick={handleCookRating}
                        >
                          <img src={hat} alt="..." className="w-4 h-4" />
                          4.3
                        </h6>
                        <h6
                          className="font-semibold flex items-center text-slate-500 text-sm"
                          onClick={handlePackageRating}
                        >
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
                  </Link>
                </div>
              );
            })}
      </div>
      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};

export default FavMeals;
