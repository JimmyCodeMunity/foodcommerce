import { ChevronLeft, Close, PersonOutlined } from "@mui/icons-material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";

const OrderDets = () => {
  const {Id} = useParams()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="font-sans   ">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <div className="absolute bottom-0 w-full h-2/5 py-4 pb-6 bg-white">
        <div className="w-11/12 mx-auto text-right" onClick={handleClose}>
            <Close style={{fontSize:'2rem'}}/>
          </div>
          <div className="flex items-center flex-col">
            <div className="w-14 h-14 rounded-full bg-slate-500"></div>
            <div>
              <h6
                sx={{ fontSize: "14px", color: "white", textAlign: "center" }}
                variant="h6"
              >
                Mohamed Ali
              </h6>
            </div>
          </div>
         
          <div className="w-4/5 mx-auto">
            <div className="h-16 w-11/12">
              <h6 className="text-slate-500">License plate number</h6>
              <h6 className="border-b border-slate-500 text-xl">KCU 548K</h6>
            </div>
            <div  className="h-16 w-11/12">
              <h6 className="text-slate-500">Vehicle</h6>
              <h6  className="border-b border-slate-500 text-xl">Nissan</h6>
            </div>
          </div>
        </div>
      </Modal>
      <div className="h-1/2">
        <Link
          to={`/client/myorders/${Id}`}
          className="h-fit flex font-sans items-center w-11/12 mx-auto rounded  text-white text-left"
        >
          <ChevronLeft style={{ color: "black" }} />
          <h6 className="flex my-auto bg-lanternOrange/60 w-full h-full p-2">
            <div className="w-5 h-5 rounded-full bg-lanternOrange mr-2 "></div>On
            the way
          </h6>
        </Link>
        <div
          className="flex w-11/12 justify-between h-fit mx-auto items-center my-2"
          onClick={handleOpen}
        >
          <h6 className="font-semibold text-xl">KEX567y</h6>
          <h6 className="text-lanternOrange">Order ID</h6>

          <div className="bg-slate-200 rounded-full p-2">
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
        <div className="h-1/3 my-2 flex flex-col justify-evenly">
          <div className="flex w-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-lanternOrange m-2 flex items-center justify-center ">
              <div className="w-2/3 h-2/3 bg-lanternOrange rounded-full p-2"></div>
            </div>
            <div>
              <h6>Starting Location</h6>
              <h6 className="text-gray-500">15:20</h6>
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 m-2 flex items-center justify-center ">
              <div className="w-2/3 h-2/3 bg-green-500 rounded-full p-2"></div>
            </div>
            <div>
              <h6>Destination</h6>
              <h6 className="text-gray-500">15:20</h6>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <h6 className="text-lg border border-slate-400 p-2 text-slate-400">
            Additional trip details can be found in your email receipt
          </h6>
          <Link to="/driver/ratecook">
            <button className="w-full bg-slate-200 mb-4 h-10 rounded text-black mt-4">
              Get Help with trip
            </button>
          </Link>
          <div>
            <h6 className="text-2xl">Payment</h6>
            <div className="w-full  flex flex-col justify-evenly mx-auto bg-white h-44">
              <div className="flex justify-between">
                <h6 className="">Order Total</h6>
                <h6 className=" font-semibold">KES 1,000.00</h6>
              </div>

              <div className="flex justify-between">
                <h6 className="">Delivery Cost</h6>
                <h6 className=" font-semibold">KES 250.00</h6>
              </div>
              <div className="flex justify-between">
                <h6 className="text-red-500">Discount</h6>
                <h6 className="text-red-500 font-semibold">KES 0.00</h6>
              </div>
              <div className="flex justify-between">
                <h6 className="font-semibold text-xl">Total</h6>
                <h6 className=" font-semibold text-xl">KES 250.00</h6>
              </div>
            </div>
          </div>
          <Link to="/driver/ratecook">
            <button className="w-full bg-slate-200 mb-4 h-10 rounded text-black mt-4">
              Get receipt
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDets;
