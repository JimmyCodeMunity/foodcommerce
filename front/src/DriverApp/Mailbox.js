import React from "react";
import { DriverNav } from "../Reusable/DriverNav";

const Mailbox = () => {
  return (
    <div className="  ">
      <div className="h-4/5 flex flex-col justify-between">
        <div className="h-3/4 flex flex-col justify-between">
          <div className="flex w-11/12 mx-auto h-fit border-l-4 pl-2 border-lanternOrange items-center ml-2 mt-2 justify-between ">
            <div className="flex flex-col h-32 my-3 justify-evenly w-1/2 ">
              <h4 className="font-semibold text-base text-green-500">
                Client: Nima
              </h4>
              <h6 className="h-1/2 text-justify">
                Second line Secondary line text. Lorem ipsum dolor sit amet,
                consectetur adipiscit elit.
              </h6>
            </div>
            <div className="flex flex-col justify-evenly h-24 w-42  ">
            <div className="w-full flex items-end justify-end ">
                <button className="w-1/2 h-7 rounded-2xl bg-lanternOrange text-white float-left">
                  Read
                </button>
                </div>
             
              <h6 className="text-sm text-slate-500 mr-2">FRI, SEP 1, 12:00 PM</h6>
            </div>
          </div>
          <div className="flex w-11/12 mx-auto h-fit items-center ml-2 mt-2 justify-between pl-2 border-l-4">
            <div className="flex flex-col h-32 my-3 justify-evenly w-1/2 ">
              <h4 className="font-semibold text-base text-green-500">
                Client: Nima
              </h4>
              <h6 className="h-1/2 text-justify">
                Second line Secondary line text. Lorem ipsum dolor sit amet,
                consectetur adipiscit elit.
              </h6>
            </div>
            <div className="flex flex-col justify-evenly h-24 w-42  ">
              <div className="w-full flex items-end justify-end ">
                <button className="w-1/2 h-7 rounded-2xl bg-lanternOrange text-white float-left">
                  Read
                </button>
              </div>

              <h6 className="text-sm text-slate-500 mr-2">FRI, SEP 1, 12:00 PM</h6>
            </div>
          </div>
          <div className="flex w-11/12 mx-auto h-fit items-center ml-2 mt-2 justify-between pl-2 border-l-4">
            <div className="flex flex-col h-32 my-3 justify-evenly w-1/2 ">
              <h4 className="font-semibold text-base text-green-500">
                Client: Nima
              </h4>
              <h6 className="h-1/2 text-justify">
                Second line Secondary line text. Lorem ipsum dolor sit amet,
                consectetur adipiscit elit.
              </h6>
            </div>
            <div className="flex flex-col justify-evenly h-24 w-42  ">
            <div className="w-full flex items-end justify-end ">
                <button className="w-1/2 h-7 rounded-2xl bg-lanternOrange text-white float-left">
                  Read
                </button>
                </div>
              <h6 className="text-sm text-slate-500 mr-2">FRI, SEP 1, 12:00 PM</h6>
            </div>
          </div>
          <div className="flex w-11/12 mx-auto h-fit items-center ml-2 mt-2 justify-between pl-2 border-l-4">
            <div className="flex flex-col h-32 my-3 justify-evenly w-1/2 ">
              <h4 className="font-semibold text-base text-green-500">
                Client: Nima
              </h4>
              <h6 className="h-1/2 text-justify">
                Second line Secondary line text. Lorem ipsum dolor sit amet,
                consectetur adipiscit elit.
              </h6>
            </div>
            <div className="flex flex-col justify-evenly h-24 w-42  ">
            <div className="w-full flex items-end justify-end ">
                <button className="w-1/2 h-7 rounded-2xl bg-lanternOrange text-white float-left">
                  Read
                </button>
                </div>
              <h6 className="text-sm text-slate-500 mr-2">FRI, SEP 1, 12:00 PM</h6>
            </div>
          </div>
        </div>

        <div className="pb-6 w-full fixed bg-white bottom-0">
          <DriverNav />
        </div>
      </div>
    </div>
  );
};

export default Mailbox;
