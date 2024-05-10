import {  AddLocation, AddLocationOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { apiDriver } from "../Storage/ApiClient";

const ArrivedClient = () => {
  const [data, setData] = useState([]);
  const {Id} = useParams()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiDriver.get(`driver/active-order/${Id}`);
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
    <div className="h-full ">
      <div className=" h-2/3">
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
        <div className=" bg-white w-full h-40 flex flex-col justify-between font-sans bottom-0 ">
          <div className="w-11/12 mx-auto h-full flex flex-col justify-evenly ">
            <h2 className="font-sans text-lanternOrange text-center text-4xl max-lg:text-xl">
              Arrived
            </h2>
            <div className="flex items-center">
              <AddLocation className="mr-2 text-base" style={{fontSize:'1.8rem'}} />
              <div className="flex flex-col items-start">
                 <h6>Client's physical address: </h6><h6>{data.physical_address}{data.location_name}</h6>
              </div>
             
            </div>
            <Link
              className="h-12 text-xl w-full bg-lanternOrange rounded-lg text-white text-center pt-2"
              to={`/driver/clientverify/${Id}`}
            >
              Drop off
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrivedClient;
