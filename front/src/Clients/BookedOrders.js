import { FilterList, KeyboardArrowDown, Search } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  InputBase,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientNav } from "../Reusable/DriverNav";
import sort from "../Media/iconoir_sort.png";
import Popover from "@mui/material/Popover";
import { apiClient } from "../Storage/ApiClient";

const BookedOrders = () => {
  const { Id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState(null);
  const [meal, setMeal] = React.useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[search,setSearch]= useState("")

  const navigate = useNavigate();
  const [orderStates] = useState([
    "confirmed",
    "pendingpayment",
    "prepared",
    "OnTheWay",
    "ORDER READY",
    "pendingacceptance",
    "rejected",
  ]);

  const handleMeal = (event) => {
    setMeal(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFilter(null);
    setMeal(null);
  };

  const open = Boolean(anchorEl);
  const Filteropen = Boolean(filter);
  const Mealopen = Boolean(meal);

  const getBadge = (orderState) => {
    switch (orderState) {
      case "Pending Payment":
        return "w-3 h-3 text-lanternOrange bg-lanternOrange rounded-full";
      case "prepared":
        return "w-3 h-3 bg-yellow-500 rounded-full";
      case "OnTheWay":
        return "w-3 h-3 bg-black rounded-full";
      case "pendingacceptance":
        return "w-3 h-3 bg-black rounded-full";
      case "rejected":
        return "w-3 h-3 bg-red-500 rounded-full";
      case "ORDER READY":
        return "w-3 h-3 bg-green-800 rounded-full text-green-600";
      case "confirmed":
        return "w-3 h-3 bg-green-500 rounded-full";
      default:
        return "w-3 h-3 bg-green-500 rounded-full";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get("client/orders")
        .then((response) => {
          setData(response.data.data);
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
        <div className="p-2 text-slate-400">
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
          horizontal: "left",
        }}
      >
        <div className="p-2 text-slate-400">
          <h6 className="border-b border-slate-800">Ready to cook</h6>
          <h6 className="border-b border-slate-800">Ready to Eat</h6>
        </div>
      </Popover>
      <div className="max-lg:w-full w-3/4">
        <div className="flex items-center justify-evenly w-11/12 mx-auto  ml-4 ">
        <div className="flex items-center justify-evenly w-11/12 mx-auto  ml-4 ">
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
                  placeholder="Search"
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
                  style={{ marginLeft: 2 }}
                />
                <FilterList  style={{ marginLeft: 2 }} />
              </div>
            </div>
        </div>
        <div className="flex w-11/12 justify-between mx-auto">
          <div className=" w-1/2 ml-2">
            <Link to={`/client/myorders/${Id}`}>
              <h6 className="flex items-center justify-center ml-2 font-[kalam]">
                Express <KeyboardArrowDown />
              </h6>
            </Link>
          </div>
          <div className="border-b-2 border-black w-1/2">
            <h6
              className="flex items-center justify-center  font-[kalam]"
              onClick={handleMeal}
            >
              Booked <KeyboardArrowDown />
            </h6>
          </div>
        </div>
        <div>
          {data?.filter((item)=>{return search.toLowerCase()===""?item:item.status.toLowerCase().includes(search)})?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => 
                  {
                    switch (item.status) {
                      case "confirmed":
                        navigate(`/client/confirmed/${item.order_id}`);
                        break;
                    
                      case "prepared":
                        navigate(`/client/prepared/${item.order_id}`);
                        break;
                    
                      case "OnTheWay":
                        navigate(`/client/ontheway/${item.order_id}`);
                        break;
                    
                      case "ORDER READY":
                        navigate(`/client/completed/${item.order_id}`);
                        break;
                    
                      case "pending acceptance":
                        navigate(`/client/pendingacceptance/${item.order_id}`);
                        break;
                    
                      case "Pending Payment":
                        navigate(`/client/payment/${item.order_id}`);
                        break;
                    
                      default:
                        navigate(`/404`);
                    }
                    
                }}
                className="w-11/12 mt-2 p-2 shadow-inner rounded-xl mx-auto border-2"
              >
                <div className="flex  justify-between h-fit mb-2">
                  <div className="w-1/2">
                    <h6 className="font-semibold">{item.updated_at}</h6>
                    <h6 className="text-slate-500">Order date</h6>
                  </div>
                  <div className="w-1/2">
                    <h6 className="font-semibold flex items-center justify-between">
                      {item.status}
                      <div
                        className={`state-indicator ${getBadge(item.status)}`}
                      ></div>
                    </h6>
                    <h6 className="text-slate-500">
                      Order status(OTP:{item.client_dely_otp})
                    </h6>
                  </div>
                </div>
                <div className="flex justify-between h-fit mb-2">
                  <div className="w-1/2">
                    <h6 className="font-semibold">{item.order_total}</h6>
                    <h6 className="text-slate-500">Total Cost</h6>
                  </div>
                  <div className="w-1/2">
                    <h6 className="font-semibold flex items-center">
                      {item.order_no}
                    </h6>
                    <h6 className="text-slate-500">Order ID</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};

export default BookedOrders;
