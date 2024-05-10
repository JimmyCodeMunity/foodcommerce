import { AddLocationOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DriverNav } from "../Reusable/DriverNav";
import { apiRider } from "../Storage/ApiClient";

const DriverHome = () => {
  const { Id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);const [data,setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiRider
        .get("driver/order-ready")
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [`/client/get-profile/${Id}`]);

  const startOrderPickup = async (orderId) => {
    try {
      const response = await apiRider.post(`/driver/order-accept/${orderId}`);
      navigate(`/driver/confirm/${orderId}`)
     
    } catch (error) {
      console.error("Error starting order pickup:", error);
      // Handle error or display error message
    }
  };
  return (
    <div className="h-full ">
      <div className=" h-1/2">
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
        <div className=" bg-white w-full mx-auto h-full flex flex-col justify-between font-sans">
          {data?.map((item,index)=>{
            return(
            <div className="w-11/12 mx-auto h-full  flex flex-col justify-evenly ">
            <h2 className="font-sans text-lanternOrange text-center text-4xl max-lg:text-xl">
              Collection Order id: {item.order_no}
            </h2>
            <div className="flex items-center">
              <AddLocationOutlined
                className="mr-2 text-base"
                style={{ fontSize: "1.8rem" }}
              />
              <h6>Pick up : {item.google_map_pin}</h6>
            </div>
            <button
              className="h-1/4 w-full mx-auto bg-lanternOrange rounded-lg text-white text-center cursor-pointer pt-2 text-base"
            onClick={()=>startOrderPickup(item.order_id)}>
              Start
            </button>
          </div>)
          })}
        </div>
      </div>
      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverNav />
      </div>
    </div>
  );
};

export default DriverHome;
