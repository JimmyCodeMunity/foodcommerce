import React, { useEffect, useState } from "react";
import food from "../Media/Ellipse 2.png";
import {
  AddCircle,
  Error,
  RemoveCircleOutline,
  Search,
} from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputBase,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimeIcon,
  TimePicker,
} from "@mui/x-date-pickers";
import { ClientNav } from "../Reusable/DriverNav";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const label = { inputProps: { "aria-label": "Switch demo" } };

const MealDetsBooked = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [error, setError] = useState("");
  const [datas, setDatas] = useState([]);
  const [url, setUrl] = useState("/view-cart");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openModalId, setOpenModalId] = useState(null);
  const [address, setAddress] = useState([]);
  const [totalSubtotal, setTotalSubtotal] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs("2024-04-17T15:30"));

  const handleClose = () => setOpenModalId(false);
  const currentDate = dayjs();
  const maxDate = currentDate.add(28, "day");

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      apiClient
        .get(`/client/get-profile/${Id}`)
        .then((response) => {
          setDatas(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchInfo();
  }, [`/client/get-profile/${Id}`]);

  const fetchData = async () => {
    setLoading(true);
    apiClient
      .get(url)
      .then((response) => {
        const responseData = response.data.data;
        if (Array.isArray(responseData) && responseData.length > 0) {
          setData(responseData[0]);
          setAddress(responseData[1]);
        } else {
          setData([]);
          setAddress([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const decrementTarget = (mealId) => {
    setData((prevData) =>
      prevData.map((meal) =>
        meal.cart_id === mealId && meal.qty > 0
          ? { ...meal, qty: meal.qty - 1 }
          : meal
      )
    );
    const item = data.find((meal) => meal.cart_id === mealId);
    if (item.qty === 1) {
      setOpenModalId(mealId);
    }
  };

  const incrementTarget = (mealId) => {
    setData((prevData) =>
      prevData.map((meal) =>
        meal.cart_id === mealId ? { ...meal, qty: meal.qty + 1 } : meal
      )
    );
  };

  const handleDeleteItem = () => {
    setLoading(true);
    if (openModalId) {
      apiClient
        .delete(`/delete-from-cart/${openModalId}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          fetchData();
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error deleting cart item:", error);
          setError("An error occurred while deleting the cart item.");
        })
        .finally(() => {
          setOpenModalId(null);
        });
    }
  };

  useEffect(() => {
    const total = data.reduce(
      (total, item) => total + parseFloat(item.unit_price) * item.qty,
      0
    );
    setTotalSubtotal(total.toString());
  }, [data]);

  const updateCartItem = async (mealId, unitPrice, qty) => {
    try {
      const response = await apiClient.put(`/update-cart/${mealId}`, {
        qty: qty,
        unit_price: unitPrice,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const year = date.$y;
  const month = String(date.$M + 1).padStart(2, "0");
  const day = String(date.$D).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  const hour = time.$H % 12 || 12; // Convert 0 to 12 for 12-hour format
  const minute = String(time?.$m).padStart(2, "0");
  const ampm = time.$H < 12 ? "AM" : "PM";

  const formattedTime = `${hour}:${minute} ${ampm}`;

  const createOrder = async () => {
    setLoading(true);
    try {
      for (const item of data) {
        await updateCartItem(item.cart_id, item.qty, item.unit_price);
      }
      const response = await apiClient.post("/create-order", {
        selected_items: data.map((item) => item.meal_id),
        delivery_date: formattedDate,
        customeraddress_id: address.id,
        delivery_time: formattedTime,
      });
      setLoading(false);
      if (response.data.status === "success") {
        console.log(response.data);
        navigate(`/client/payment/${response.data.data.order_id}`);
      } else {
        setError("An error occurred while creating the order.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating order:", error);
      setError("An error occurred while creating the order.");
    }
  };

  return (
    <>
      <Modal
        open={openModalId}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" mt-56"
      >
        <div className="w-2/3 mx-auto bg-white h-44 rounded my-auto p-2 flex flex-col justify-evenly">
          <h6 className="text-center">
            Are you sure you want to remove item from cart?
          </h6>
          <div className="w-full flex justify-between">
            <button
              className="w-32 h-10 border border-red-500  text-red-500 rounded"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="w-32 h-10 bg-green-500 text-white rounded"
              onClick={handleDeleteItem}
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>
      {data.length === 0 ? (
        <div>
          <div className="w-3/4 max-lg:w-full mr-3">
            <Paper
              component="form"
              className="w-11/12 justify-between shadow-none mx-auto"
              sx={{
                p: "2px 4px",
                ml: "2px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </Paper>
            <div className="flex w-11/12 justify-between mx-auto mr-3">
              <Link to={`client/mealdets/${Id}`}>
                <h6 className="flex items-center justify-center ml-2 font-[kalam]">
                  Express
                </h6>
              </Link>
              <div className=" w-1/2 ml-2">
                <div className="border-b-2 border-black w-1/2">
                  <h6 className="flex items-center justify-center  font-[kalam]">
                    Booked
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="h-screen">
            <div className="w-2/3 ml-14  text-slate-500 flex justify-center h-96 items-center mt-5 flex-col">
              <Error style={{ fontSize: "5rem" }} />
              <h6> No Available Meals</h6>
              <div className="w-11/12 mt-3 mx-auto rounded-lg bg-lanternOrange text-white h-12">
                <Link to={`/client/home/${datas.data?.id}`}>
                  <button className="font-sans w-full h-full text-white">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>

            <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
              <ClientNav />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full ">
          <div className=" flex">
            <div className="w-3/4 max-lg:w-full mr-3">
              <div className="flex w-11/12 justify-between mx-auto">
                <Link to={`/client/mealdets/${Id}`} className=" w-1/2">
                  <h6 className="flex items-center justify-center ml-2 font-[kalam]">
                    Express
                  </h6>
                </Link>
                <div className="border-b-2 border-black w-1/2 ml-2">
                  <h6 className="flex items-center justify-center  font-[kalam]">
                    Booked
                  </h6>
                </div>
              </div>
              <div className="h-fit relative mb-24 w-11/12 mx-auto mt-5">
                {data.map((item, index) => {
                  return (
                    <div
                      className="flex justify-between items-center w-11/12 mx-auto max-lg:w-full max-lg:mx-2 h-20 mt-8 "
                      onClick={() => navigate("")}
                      key={index}
                    >
                      <div className="flex  items-center">
                        <img src={food} alt="lantern app" />
                        <div className="flex flex-col justify-evenly h-full items-center ml-4">
                          <div className="flex items-center w-72 max-lg:w-full justify-between">
                            <h6 className="border-r-2 pr-2 pl-1 border-slate-400 text-sm">
                              {item.meal_name}
                            </h6>
                            <h6 className="border-r-2 pr-2 pl-1 border-slate-400 text-sm">
                              Kitchen Name
                            </h6>
                            <h6 className="pr-2 pl-1 text-sm">Location</h6>
                          </div>
                          <div className="flex w-full justify-between flex-col">
                            <h6 className="text-red-500">
                              <NumberFormat
                                value={item.unit_price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Ksh. "}
                              />
                            </h6>
                            <h6 className="flex w-24 h-10 rounded-xl justify-between text-black/80 items-center">
                              <RemoveCircleOutline
                                onClick={() => decrementTarget(item.cart_id)}
                              />
                              {item.qty}
                              <AddCircle
                                onClick={() => incrementTarget(item.cart_id)}
                              />
                            </h6>
                          </div>
                        </div>
                      </div>

                      <CheckBox
                        {...label}
                        sx={{
                          color: "#fa6f26",
                          "&.Mui-checked": {
                            color: "#fa6f26",
                          },
                        }}
                        onClick={handleDeleteItem}
                      />
                    </div>
                  );
                })}

                <div className="w-full sticky top-10 flex flex-col justify-evenly  bg-white">
                  <div className="h-20 w-11/12 mx-auto flex flex-col justify-evenly mt-4">
                    <div className="flex justify-between">
                      <h6 className=" font-semibold">Order Total</h6>
                      <h6 className=" text-slate-500">
                        <NumberFormat
                          value={totalSubtotal}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Ksh."}
                        />
                      </h6>
                    </div>
                    <div className="flex justify-between">
                      <h6 className="font-semibold">Delivery Cost</h6>
                      <h6 className=" text-slate-500">KES 250.00</h6>
                    </div>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex justify-between items-center">
                      <div className="w-44">
                        <DatePicker
                          margin="dense"
                          id="filled-basic"
                          label="Delivery Date"
                          variant="outlined"
                          placeholder="YYYY/MM/DD"
                          minDate={currentDate}
                          maxDate={maxDate}
                          value={date}
                          required
                          onChange={(newDate) => setDate(newDate)}
                        />
                      </div>
                      <div className="w-44">
                        <TimePicker
                          margin="normal"
                          id="filled-basic"
                          label="Delivery Time"
                          variant="outlined"
                          value={time}
                          required
                          minTime={dayjs().startOf("day").add(7, "hour")} // Minimum time: 7:00 AM
                          maxTime={dayjs().startOf("day").add(20, "hour")} // Maximum time: 8:00 PM
                          onChange={(newTime) => setTime(newTime)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TimeIcon />
                              </InputAdornment>
                            ),
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={
                                time.isBefore(
                                  dayjs().startOf("day").add(7, "hour")
                                ) ||
                                time.isAfter(
                                  dayjs().startOf("day").add(20, "hour")
                                )
                              }
                              helperText={
                                (time.isBefore(
                                  dayjs().startOf("day").add(7, "hour")
                                ) ||
                                  time.isAfter(
                                    dayjs().startOf("day").add(20, "hour")
                                  )) &&
                                "Delivery time must be between 7:00 AM and 8:00 PM"
                              }
                            />
                          )}
                        />
                      </div>
                    </div>
                  </LocalizationProvider>
                  <TextField
                    margin="normal"
                    id="filled-basic"
                    placeholder="Order Note"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>

            <div className="pb-6 w-2/5 rounded max-lg:w-full px-2 h-[25rem] max-lg:h-32 flex max-lg:flex-row flex-col justify-evenly mx-auto max-lg:my-2 max-lg:fixed bg-lanternOrange/10 max-lg:items-center max-lg:bg-white bottom-0  max-lg:justify-between max-lg:px-0">
              <div className="h-4/5 justify-between flex flex-col max-lg:flex-row max-lg:w-full max-lg:justify-between">
                <h6 className="text-2xl font-semibold max-lg:hidden text-lanternOrange text-center">
                  Billing Summary
                </h6>
                <div className="h-1/2  flex flex-col justify-between max-lg:flex-row ml-2">
                  <div className="flex justify-between w-11/12 max-lg:w-full max-lg:flex-col">
                    <h6 className="font-normal text-slate-600">Order Total</h6>
                    <h6 className="font-bold text-2xl ">
                      <NumberFormat
                        value={totalSubtotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh."}
                      />
                    </h6>
                  </div>
                  <div className="flex justify-between w-11/12 items-center max-lg:hidden">
                    <h6 className="text-slate-600">Total</h6>
                    <h6 className="font-bold text-2xl text-lanternOrange">
                      <NumberFormat
                        value={totalSubtotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh."}
                      />
                    </h6>
                  </div>
                </div>

                <button
                  className="max-lg:w-40 w-11/12 max-lg:mx-0 mx-auto h-12 bg-lanternOrange text-white rounded-xl mr-2"
                  onClick={createOrder}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
          <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
            <ClientNav />
          </div>
          {loading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <div className=" h-44 w-2/3 mx-auto">
            {error && (
              <Alert severity="error" className="w-full absolute top-1/2 ">
                {error.message}
              </Alert>
            )}
            {message && (
              <Alert severity="warning" className="w-full absolute top-1/2 ">
                {message}
              </Alert>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MealDetsBooked;
