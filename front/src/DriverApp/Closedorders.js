import React, { useEffect, useState } from "react";
import {
  ChevronLeft
} from "@mui/icons-material";
import icon from "../Media/Color (2).png";
import food from "../Media/Ellipse 2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import {DriverNav} from "../Reusable/DriverNav";
import { apiDriver } from "../Storage/ApiClient";

const Closedorders = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const {Id} = useParams()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiDriver.get("/driver/delivered-orders");
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="font-sans   ">
      <div
        className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white text-left"
      >
        <h6 className="flex items-center"><ChevronLeft />View Closed Orders</h6>
      </div>
      <div className="h-4/5 flex flex-col justify-between">
      <div >
          {data?.length === 0 ? (
            <div className=" w-11/12 mt-5 h-96 mx-auto">
              <img src={icon} alt="..." className="w-11/12 h-4/5"/>
              <h6 className="text-xl text-slate-500 text-center mt-2">No Orders available for delivery</h6>
            </div>
          ) : (
            data?.map((item, index) => {
              return (
                <div
                  className="flex w-11/12 h-24 mt-8 mx-auto"
                  onClick={() =>
                    navigate(`/driver/vieworder/${item.order_id}`)
                  }
                  key={index}
                >
                  <img src={food} alt="lantern app" />
                  <div className="flex flex-col justify-between h-full ml-5">
                    <h6 className="font-semibold">Order ID: {item.order_no}</h6>
                    <h6 className="text-gray-400">
                      Collection: {item.location_name}
                    </h6>
                    <h6 className="text-gray-400">
                      Delivered: {item.google_map_pin}
                    </h6>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="pb-6 w-full fixed bg-white bottom-0">
          <DriverNav />
        </div>
      </div>
    </div>
  );
};

export default Closedorders;
