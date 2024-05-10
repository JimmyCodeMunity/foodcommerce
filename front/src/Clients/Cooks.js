import {
  FavoriteBorder,
  FilterList,
  LocationOnOutlined,
  Redeem,
  Restaurant,
  Search,
  Star,
} from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import sort from "../Media/iconoir_sort.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { ClientNav } from "../Reusable/DriverNav";
import { apiClient } from "../Storage/ApiClient";

const Cooks = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('')
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get("cooks-meals")
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen">
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-2 text-slate-400">
          <h6 className="border-b border-slate-800">Most Popular</h6>
          <h6 className="border-b border-slate-800">Package ratings</h6>
          <h6 className="border-b border-slate-800">Cook's rating</h6>
          <h6 className="border-b border-slate-800">Servings sold</h6>
          <h6 className="border-b border-slate-800">Price</h6>
        </div>
      </Popover>
      <div className="max-lg:w-full w-3/4">
      <div className="flex items-center justify-evenly w-11/12 mx-auto  mr-10 ">
          <div
            className="w-11/12 flex rounded justify-between my-3 border border-slate-500 mx-auto"
            sx={{
              p: "2px 4px",
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
        <div className="flex w-11/12 justify-between mx-auto my-2">
          <div className="border-b-2 border-black w-1/2">
            <h6 className="flex items-center justify-center ml-2 font-[kalam]">
              Cooks
            </h6>
          </div>
          <div className=" w-1/2 ml-2">
            <Link to="/client/activeshifts">
              <h6 className="flex items-center justify-center font-[kalam]">
                Active Shifts
              </h6>
            </Link>
          </div>
        </div>
        <div>
          {data?.map((item, index) => {
            return (
              <div
                className="flex w-11/12 items-center mx-auto justify-between mt-3"
                key={index}
              >
                
                <Link to={`/client/viewcook/${item.id}`}>
                  <div className="flex w-80 items-center mx-auto justify-between mt-3">
                    <div className="w-16 h-16 rounded-full bg-slate-500 mr-2"></div>
                    <div className="h-fit flex flex-col justify-between  w-3/4">
                      <h6 className="text-base font-normal">{item.kitchen_name}</h6>
                      <h6 className="flex items-center w-fit  justify-between text-normal text-green-300">
                        {item.status === 2 ? (
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        )}
                        {item.status === 2 ? "Active" : "Inactive"}
                      </h6>
                      <h6 className="text-normal text-slate-500">
                        <LocationOnOutlined style={{ marginLeft: "-0.2rem" }} />
                        {item.physical_address}
                      </h6>
                      {/* <div className="flex w-11/12 justify-between h-10 items-center">
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
                      </div> */}
                    </div>
                  </div>
                </Link>
                <FavoriteBorder />
              </div>
            );
          })}
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};
export default Cooks;
