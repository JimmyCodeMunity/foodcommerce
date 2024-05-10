import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Topnav from "../Reusable/Topnav";
import { DriverAdminNav } from "../Reusable/DriverNav";
import Modal from "@mui/material/Modal";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { apiDriver } from "../Storage/ApiClient";


const DriverAdminHome = () => {
  const { Id } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiDriver
        .get("/delivery-company/drivers")
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);



  const positions = { lat: 54.6, lng: 10 };
  const position = { lat: latitude, lng: longitude };

  console.log(positions);


//   const coordinates = data[0]
//   .login_location
  

// console.log("Coordinates:", coordinates);
// console.log("Data:", data);

// const [latitudes, longitudes] = coordinates.split(',')


// console.log("lat:", latitudes, "lng:", longitudes);

  return (
    <div className="h-full ">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="mt-56"
      >
        <div>
           {data?.map((item, index) => {
          return (
            <div className="flex flex-col bg-white justify-evenly items-center w-11/12 h-52  mx-auto rounded" key={index}>
              <h6 className=" text-lanternOrange text-xl">
                Order id: KYC54REF
              </h6>
              <div className="flex w-4/5 mx-auto justify-between">
                <div className="w-20 h-20 bg-slate-500 rounded-full"></div>
                <div className="flex flex-col justify-evenly h-full ml-5">
                  <h6 className="font-semibold">{item.driver_name}</h6>
                  <h6>KDC 745k</h6>
                </div>
              </div>
              <Link
                to={`/driveradmin/assignorder/${Id}`}
                className=" w-11/12 mx-auto  bottom-0"
              >
                <button className=" w-full bg-green-500 text-white mx-auto h-12 rounded">
                  Assign Order
                </button>
              </Link>
            </div>
          );
        })}
        </div>
       
      </Modal>
      <Topnav />
      <APIProvider apiKey={process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}>
        <div className=" h-full">
          <Map
            zoom={14}
            center={positions}
            mapId={process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}
          >
            <AdvancedMarker position={positions} onClick={() => setOpen(true)}>
              <Pin background={"grey"} borderColor={"green"} />
            </AdvancedMarker>
            {open && (
              <InfoWindow position={positions}>
                {" "}
                <div
                  className="absolute bg-lanternOrange/40 w-full h-full border-4 border-pink-500"
                  onClick={handleOpen}
                ></div>
              </InfoWindow>
            )}
          </Map>

          {/* <Link to="/driveradmin/assignorder">
          <div
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63824.10719029128!2d36.686267349999994!3d-1.155699850000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f26ad7555c613%3A0xf2d5b7026a8527e5!2sTigoni!5e0!3m2!1sen!2ske!4v1702302465318!5m2!1sen!2ske"
            width="650"
            height="450"
            allowfullscreen=""
            className="w-full h-full relative"
            loading="lazy"
            title="map"
            referrerpolicy="no-referrer-when-downgrade"
          >
           
          </div> */}
          {/* </Link> */}
        </div>
      </APIProvider>

      <div className="pb-6 w-full fixed bg-white bottom-0">
        <DriverAdminNav />
      </div>
    </div>
  );
};

export default DriverAdminHome;
