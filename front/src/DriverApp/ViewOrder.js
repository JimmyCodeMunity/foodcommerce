import { ChevronLeft, PersonOutlined } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiDriver } from "../Storage/ApiClient";
import { DriverIdContext } from "../Helper/Context";

const ViewOrder = () => {
  const {Id} = useParams()
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState("")
  const {driverId,setDriverId} = useContext(DriverIdContext)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiDriver.get(`driver/delivered-order/${Id}`);
        setData(response.data.data);
        setDriverId(response.data.data.driver_id)
        console.log(response.data.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

console.log(driverId)
  
  return (
    <div className="font-sans   ">
      <div className="h-1/2">
        <Link
          to={`/driver/activeorder/${data.driver_id}`}
          className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            View Order
          </h6>
        </Link>
        <div className="flex w-11/12 justify-between h-fit mx-auto items-center my-2">
          <div>
            <h6 className="font-semibold text-xl">{data.order_no}</h6>
            <h6 className="text-lanternOrange">Order ID</h6>
          </div>
          <div className="bg-slate-400 rounded-full p-2">
            <PersonOutlined style={{ fontSize: "1.8rem" }} />
          </div>
        </div>
        <div className="relative h-1/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63824.10719029128!2d36.686267349999994!3d-1.155699850000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f26ad7555c613%3A0xf2d5b7026a8527e5!2sTigoni!5e0!3m2!1sen!2ske!4v1702302465318!5m2!1sen!2ske"
            width="650"
            height="450"
            allowfullscreen=""
            className="w-full h-full"
            loading="lazy"
            title="map"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="h-1/3 flex flex-col justify-evenly">
          <div className="flex w-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-lanternOrange m-2 flex items-center justify-center ">
              <div className="w-2/3 h-2/3 bg-lanternOrange rounded-full p-2"></div>
            </div>
            <div>
              <h6>Starting Location</h6>
              <h6 className="text-gray-500">{data.google_map_pin}</h6>
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 m-2 flex items-center justify-center ">
              <div className="w-2/3 h-2/3 bg-green-500 rounded-full p-2"></div>
            </div>
            <div>
              <h6>Destination</h6>
              <h6 className="text-gray-500">{data.physical_address}</h6>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <h6 className="text-lg border border-slate-400 p-2 text-slate-400">
            Additional trip details can be found in your email receipt
          </h6>
          <Link to={`/driver/ratecook/${data.order_id}`}>
            <button className="w-full bg-lanternOrange h-10 rounded text-white mt-10">
              Rate your experience
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
