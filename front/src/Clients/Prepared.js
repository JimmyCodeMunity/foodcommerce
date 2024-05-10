import { ChevronLeft, Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import food from "../Media/Ellipse 2.png";

const Prepared = () => {
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
            <Close style={{ fontSize: "2rem" }} />
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
            <div className="h-16 w-11/12">
              <h6 className="text-slate-500">Vehicle</h6>
              <h6 className="border-b border-slate-500 text-xl">Nissan</h6>
            </div>
          </div>
        </div>
      </Modal>
      <Link
        to="/client/myorders"
        className="h-fit flex font-sans items-center w-11/12 mx-auto rounded  text-white text-left"
      >
        <ChevronLeft style={{ color: "black" }} />
        <h6 className="flex my-auto bg-lanternOrange/60 w-full h-full p-2">
          <div className="w-5 h-5 rounded-full bg-lanternOrange mr-2 "></div>
          Prepared
        </h6>
      </Link>
      <div
        className="flex w-11/12 justify-between h-fit mx-auto items-center my-3"
        onClick={handleOpen}
      >
        <h6>Order ID:KEX567Y</h6>
        <div>
          <h6 className="text-slate-400">Delivery Date:22 Jul 2023</h6>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center w-11/12 m h-24 mt-8 mx-auto">
          <div className="flex items-center">
            <img src={food} alt="lantern app" className="w-14 h-14" />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Meal Name</h6>
              <h6 className="text-red-500">KSH 5,000</h6>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h6 className="flex items-center">OTY:14</h6>
                </div>
              </div>
            </div>
          </div>
          <Close style={{ color: "red" }} />
        </div>
        <div className="flex justify-between items-center w-11/12 m h-24 mt-8 mx-auto">
          <div className="flex items-center">
            <img src={food} alt="lantern app" className="w-14 h-14" />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Meal Name</h6>
              <h6 className="text-red-500">KSH 5,000</h6>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h6 className="flex items-center">OTY:14</h6>
                </div>
              </div>
            </div>
          </div>
          <Close style={{ color: "red" }} />
        </div>
        <div className="flex justify-between items-center w-11/12 m h-24 mt-8 mx-auto">
          <div className="flex items-center">
            <img src={food} alt="lantern app" className="w-14 h-14" />
            <div className="flex flex-col justify-evenly h-full ml-5">
              <h6 className="font-semibold">Meal Name</h6>
              <h6 className="text-red-500">KSH 5,000</h6>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h6 className="flex items-center">OTY:14</h6>
                </div>
              </div>
            </div>
          </div>
          <Close style={{ color: "red" }} />
        </div>
      </div>
      <div className="w-11/12  flex flex-col justify-evenly mx-auto bg-white h-44">
              <div className="flex justify-between">
                <h6 className="">Order Total</h6>
                <h6 className=" font-semibold">KES 1,000.00</h6>
              </div>

              <div className="flex justify-between">
                <h6 className="">Delivery Cost</h6>
                <h6 className=" font-semibold">KES 250.00</h6>
              </div>
              <div className="flex justify-between">
                <h6 className="">Tax</h6>
                <h6 className=" font-semibold">KES 250.00</h6>
              </div>
              <div className="flex justify-between">
                <h6 className="text-red-500">Discount</h6>
                <h6 className="text-red-500 font-semibold">KES 0.00</h6>
              </div>
              <div className="flex justify-between text-orange-500">
                <h6 className="font-semibold text-2xl">Total incl. VAT: </h6>
                <h6 className=" font-semibold text-2xl">KES 1250.00</h6>
              </div>
            </div>
    </div>
  );
};

export default Prepared;
