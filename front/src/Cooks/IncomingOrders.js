import { ChevronLeft, Save, SaveOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimeIcon,
  TimePicker,
} from "@mui/x-date-pickers";
import { InputAdornment, TextField } from "@mui/material";
const IncomingOrders = () => {
  const { Id } = useParams();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs("2024-04-17T15:30"));

  const currentDate = dayjs();
  const maxDate = currentDate.add(28, "day");
  const year = date.$y;
  const month = String(date.$M + 1).padStart(2, "0");
  const day = String(date.$D).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  const hour = time.$H % 12 || 12; // Convert 0 to 12 for 12-hour format
  const minute = String(time?.$m).padStart(2, "0");
  const ampm = time.$H < 12 ? "AM" : "PM";

  const formattedTime = `${hour}:${minute} ${ampm}`;

  return (
    <div className="h-full ">
      <Link
        to={`/cook/cookincoming/${Id}`}
        className="h-14 flex font-sans no-underline datas-center w-full bg-lanternOrange text-white text-left"
      >
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Incoming Order
        </h6>
      </Link>
      <div className="flex flex-col w-11/12 justify-between h-20 mx-auto my-3">
        <h6>Order ID:<span className="font-semibold text-lg">#782540785075</span></h6>
        <div className="w-full flex justify-between">
          <h6 className="text-slate-400">
            Delivery Date:{" "}
            <span className="font-semibold text-slate-800 text-sm">
              Monday, 11 June 2024
            </span>
          </h6>
          <h6 className="text-slate-400">
            Time: <span className="text-slate-800 font-semibold">10:00</span>
          </h6>
        </div>
      </div>
      <div className="flex justify-between items-center w-11/12 h-24 mt-3 mx-auto">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-slate-500 mr-2"></div>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex w-full justify-between flex-col">
              <h6 className="text-sm text-slate-500">Meal Name</h6>{" "}
              <h6 className="text-lanternOrange font-semibold">KSH 5,000</h6>
              <h6>
                Qty: <span>2</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-11/12 h-24 mt-3 mx-auto">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-slate-500 mr-2"></div>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex w-full justify-between flex-col">
              <h6 className="text-sm text-slate-500">Meal Name</h6>{" "}
              <h6 className="text-lanternOrange font-semibold">KSH 5,000</h6>
              <h6>
                Qty: <span>2</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-3">
        <h6 className="my-3 text-lg font-normal">
          Change proposed Date & Time
        </h6>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-between items-center">
            <div className="w-44 mr-2">
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
                      time.isBefore(dayjs().startOf("day").add(7, "hour")) ||
                      time.isAfter(dayjs().startOf("day").add(20, "hour"))
                    }
                    helperText={
                      (time.isBefore(dayjs().startOf("day").add(7, "hour")) ||
                        time.isAfter(dayjs().startOf("day").add(20, "hour"))) &&
                      "Delivery time must be between 7:00 AM and 8:00 PM"
                    }
                  />
                )}
              />
            </div>
            <SaveOutlined className="ml-2"/>
          </div>
        </LocalizationProvider>
        <div className="flex w-full justify-between my-4">
          <h6 className="w-fit">Order note:</h6>
          <h6 className="w-3/4 text-left">
            These are the instructions the client is requesting the cook while
            preparing his meals.
          </h6>
        </div>
      </div>
      <div className="flex justify-between w-11/12 mx-auto my-4">
          <h6 className="font-normal text-lg">Total Cost</h6>
          <h6 className=" font-semibold text-2xl ">
            <NumberFormat
              value={1000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Ksh. "}
            />
          </h6>
        </div>
      <div className="w-11/12  mx-auto flex justify-between">
        <Link className=" w-44 h-10 rounded border-2 border-red-500 text-red-500">
          <button className="w-full h-full rounded">Reject Order</button>
        </Link>
        <div className="w-44 ml-2 h-10 rounded bg-green-500 text-white">
          <button className="w-full ml-2 h-full rounded bg-green-500 text-white">
            Accept Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingOrders;
