import {
  FavoriteBorder,
  FilterList,
  LocationOnOutlined,
  Redeem,
  Restaurant,
  Search,
  SoupKitchen,
  Star,
} from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import sort from "../Media/iconoir_sort.png";
import hat from "../Media/tabler_chef-hat.png";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ClientNav } from "../Reusable/DriverNav";
import { ClientIdContext } from "../Helper/Context";

const ActiveShifts = () => {
  const { clientId } = useContext(ClientIdContext);
  return (
    <div>
      <div className="w-3/4 max-lg:w-full">
        <div className="flex items-center justify-evenly w-11/12 mx-auto  mr-10 ">
          <div
            className="w-11/12 flex rounded justify-between my-3 border border-slate-500 mx-auto"
            sx={{
              p: "2px 4px",
              ml: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ p: "4px 0 0rem 0.8rem" }}
              placeholder="Search by Meals"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </div>
          <div className="flex w-1/3 justify-evenly">
            <img src={sort} alt="lantern sort" style={{ marginLeft: 2 }} />
            <FilterList style={{ marginLeft: 2 }} />
          </div>
        </div>
        <div className="flex w-11/12 justify-between mx-auto my-3">
          <div className=" w-1/2">
            <Link to={`/client/cooks/${clientId}`}>
              <h6 className="flex items-center justify-center ml-2  font-[kalam]">
                Cooks
              </h6>
            </Link>
          </div>
          <div className="border-b-2 border-black w-1/2 ml-2">
            <h6 className="flex items-center justify-center  font-[kalam]">
              Active Shifts
            </h6>
          </div>
        </div>
        <div className="flex w-11/12 items-center mx-auto justify-between mt-3 bg-white p-2 rounded-lg">
          <div className="flex w-11/12 items-center ">
            <Link to="/client/home">
              <div className="w-16 h-16 rounded-full bg-slate-500 mr-2"></div>
            </Link>
            <div className="h-fit ml-3 flex flex-col justify-evenly w-3/4">
              <div className="">
                <div className="flex items-center">
                  <h6 className="text-xl mr-5">Kitchen Name</h6>
                  <div className="">
                    <h6 className="flex items-center w-fit  justify-between text-green-500 mr-2">
                      Active
                    </h6>
                  </div>
                </div>

                <div className="flex justify-between w-2/3 max-lg:flex-col max-lg:w-11/12">
                  <h6 className=" text-slate-500">
                    <SoupKitchen />
                    20 Meals Available
                  </h6>{" "}
                  <h6 className="  text-slate-500">
                    <SoupKitchen />
                    20 Packages Available
                  </h6>
                </div>
              </div>
              <div className="flex items-center max-lg:flex-col max-lg:items-start">
                <h6 className="flex items-center w-fit justify-between">
                  <LocationOnOutlined style={{ marginRight: "0.5rem" }} />
                  Location
                </h6>
                <div className="flex w-full justify-between ml-4 h-10 items-center max-lg:ml-0 ">
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Star style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <img src={hat} alt="..." className="w-4 h-4" />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Redeem style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Restaurant style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <FavoriteBorder style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                </div>
              </div>
            </div>{" "}
          </div>

          <FavoriteBorder />
        </div>
        <div className="flex w-11/12 items-center mx-auto justify-between mt-3 bg-white p-2 rounded-lg">
          <div className="flex w-11/12 items-center ">
            <Link to="/client/home">
              <div className="w-16 h-16 rounded-full bg-slate-500 mr-2"></div>
            </Link>
            <div className="h-fit ml-3 flex flex-col justify-evenly w-3/4">
              <div className="">
                <div className="flex items-center">
                  <h6 className="text-xl mr-5">Kitchen Name</h6>
                  <div className="">
                    <h6 className="flex items-center w-fit  justify-between text-green-500 mr-2">
                      Active
                    </h6>
                  </div>
                </div>

                <div className="flex justify-between w-2/3 max-lg:flex-col max-lg:w-11/12">
                  <h6 className=" text-slate-500">
                    <SoupKitchen />
                    20 Meals Available
                  </h6>{" "}
                  <h6 className="  text-slate-500">
                    <SoupKitchen />
                    20 Packages Available
                  </h6>
                </div>
              </div>
              <div className="flex items-center max-lg:flex-col max-lg:items-start">
                <h6 className="flex items-center w-fit justify-between">
                  <LocationOnOutlined style={{ marginRight: "0.5rem" }} />
                  Location
                </h6>
                <div className="flex w-full justify-between ml-4 h-10 items-center max-lg:ml-0 ">
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Star style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <img src={hat} alt="..." className="w-4 h-4" />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Redeem style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Restaurant style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <FavoriteBorder style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                </div>
              </div>
            </div>{" "}
          </div>

          <FavoriteBorder />
        </div>
        <div className="flex w-11/12 items-center mx-auto justify-between mt-3 bg-white p-2 rounded-lg">
          <div className="flex w-11/12 items-center ">
            <Link to="/client/home">
              <div className="w-16 h-16 rounded-full bg-slate-500 mr-2"></div>
            </Link>
            <div className="h-fit ml-3 flex flex-col justify-evenly w-3/4">
              <div className="">
                <div className="flex items-center">
                  <h6 className="text-xl mr-5">Kitchen Name</h6>
                  <div className="">
                    <h6 className="flex items-center w-fit  justify-between text-green-500 mr-2">
                      Active
                    </h6>
                  </div>
                </div>

                <div className="flex justify-between w-2/3 max-lg:flex-col max-lg:w-11/12">
                  <h6 className=" text-slate-500">
                    <SoupKitchen />
                    20 Meals Available
                  </h6>{" "}
                  <h6 className="  text-slate-500">
                    <SoupKitchen />
                    20 Packages Available
                  </h6>
                </div>
              </div>
              <div className="flex items-center max-lg:flex-col max-lg:items-start">
                <h6 className="flex items-center w-fit justify-between">
                  <LocationOnOutlined style={{ marginRight: "0.5rem" }} />
                  Location
                </h6>
                <div className="flex w-full justify-between ml-4 h-10 items-center max-lg:ml-0 ">
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Star style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <img src={hat} alt="..." className="w-4 h-4" />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Redeem style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <Restaurant style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                  <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                    <FavoriteBorder style={{ fontSize: "1rem" }} />
                    4.3
                  </h6>
                </div>
              </div>
            </div>{" "}
          </div>

          <FavoriteBorder />
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};
export default ActiveShifts;
