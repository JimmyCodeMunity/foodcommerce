import { useDispatch, useSelector } from "react-redux";
import { setShiftId } from "../features/User";
import play from "../Media/filled.png";
import playgreen from "../Media/playgreen.png";
import React, { useContext, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { apiClient } from "../Storage/ApiClient";import { CookIdContext } from "../Helper/Context";
;

const activeStyle = {
  color: "#E4BC09",
  borderBottom: "2px solid #FED10A",
  fontFamily: "kalam",
};

const inactiveStyle = {
  color: "black",
  fontFamily: "kalam",
};

export const CookData = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [shift, setShift] = useState([]);
  const Shift_id = useSelector((state)=>state.shiftId.value)
  const {CookId} = useContext(CookIdContext)
  const [activeId, setActiveId] = useState();

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/cook/profile/${Id}`);
        setData(response.data.data);
        console.log(response.data.data);
          const ActiveShift = response.data.data.shifts?.filter(shift => shift.shift_status === 1);
        const ActiveId = ActiveShift.map(shift => shift.id);
        setActiveId(ActiveId);

        dispatch(setShiftId(ActiveId)) 
          const shiftDetailsPromises = ActiveId.map(id =>
          apiClient.get(`/cook/shift-edit/${id}`)
        );
          const shiftDetailsResponses = await Promise.all(shiftDetailsPromises);
        const shiftDetailsData = shiftDetailsResponses.map(response => response.data.data);
        
        setShift(shiftDetailsData);
        console.log(shiftDetailsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [Id]); 
  
  console.log(Shift_id[0])
  return (
    <div className="">
      <div className="h-24 mx-auto flex justify-between w-11/12">
        <div className="flex w-fit justify-between ml-2">
          <div className="w-10 h-10 rounded-full bg-slate-600"></div>
          <div className="flex flex-col ml-2">
            <h6 className="text-2xl font-[Lambency] ">{data?.kitchen_name}</h6>
            {data?.status === 2 ? (
              <h6 className="text-green-500 flex items-center">
                <div className="w-2 h-2 rounded full mr-2 bg-green-500"></div>
                Active
              </h6>
            ) : (
              <h6 className="text-red-500 flex items-center">
                <div className="w-2 h-2 rounded full mr-2 bg-red-500"></div>
                Inactive
              </h6>
            )}
          </div>
        </div>
        {activeId && activeId[0] ? (
         <Tooltip title="View Shift Details">
            <Link to={`/cook/endshift/${activeId[0]}`}>
              <img src={playgreen} alt="lantern app" />
            </Link>
          </Tooltip>
      ) : (
      <Tooltip title="View Shift Details">
          <Link to={`/cook/shiftperiod/${Id}`}>
          <img src={play} alt="lantern app" />
        </Link>
        </Tooltip>
      )}
      </div>
      <div className="flex w-11/12 justify-between mx-auto">
        <div className="border-b-2 text-center border-black w-1/2">
          <h6 className="flex items-center justify-center ml-2 font-[kalam]">
            Express
          </h6>
        </div>
        <div className=" w-1/2 ml-2">
          <Link to={`/cook/cookincoming/${Id}`}>
            <h6 className="flex items center justify-center font-[kalam]">
              Booked
            </h6>
          </Link>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex justify-between items-center sticky h-fit bg-yellow-500/20 p-2 mt-4 ">
        <NavLink
          to={`/cook/startshift/${Id}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/startshift/${Id}`
              ? activeStyle
              : inactiveStyle
          }
        >
          New Orders
        </NavLink>

        <NavLink
          to={`/cook/cookready/${Id}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/cookready/${Id}`
              ? activeStyle
              : inactiveStyle
          }
        >
          Ready
        </NavLink>

        <NavLink
          to={`/cook/cookdispatched/${Id}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/cookdispatched/${Id}`
              ? activeStyle
              : inactiveStyle
          }
        >
          Dispatched
        </NavLink>

        <NavLink
          to={`/cook/cookdelivered/${Id}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/cookdelivered/${Id}`
              ? activeStyle
              : inactiveStyle
          }
        >
          Delivered
        </NavLink>
      </div>
    </div>
  );
};

export const CookBooked = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [shift, setShift] = useState([]);
  const Shift_id = useSelector((state)=>state.shiftId.value)
  const [activeId, setActiveId] = useState();
  const {cookId} = useContext(CookIdContext)

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/cook/profile/${cookId}`);
        setData(response.data.data);
        console.log(response.data.data);
          const ActiveShift = response.data.data.shifts?.filter(shift => shift.shift_status === 1);
        const ActiveId = ActiveShift.map(shift => shift.id);
        setActiveId(ActiveId);

        dispatch(setShiftId(ActiveId)) 
          const shiftDetailsPromises = ActiveId.map(id =>
          apiClient.get(`/cook/shift-edit/${id}`)
        );
          const shiftDetailsResponses = await Promise.all(shiftDetailsPromises);
        const shiftDetailsData = shiftDetailsResponses.map(response => response.data.data);
        
        setShift(shiftDetailsData);
        console.log(shiftDetailsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cookId]); 
  

  return (
    <div className="">
      <div className="h-24 mx-auto flex justify-between  w-11/12 ">
        <div className="flex w-fit justify-between ml-2">
          <div className="w-10 h-10 rounded-full bg-slate-600"></div>
          <div className="flex flex-col ml-2">
          <h6 className="text-2xl font-[Lambency] ">{data?.kitchen_name}</h6>
            {data?.status === 2 ? (
              <h6 className="text-green-500 flex items-center">
                <div className="w-2 h-2 rounded full mr-2 bg-green-500"></div>
                Active
              </h6>
            ) : (
              <h6 className="text-red-500 flex items-center">
                <div className="w-2 h-2 rounded full mr-2 bg-red-500"></div>
                Inactive
              </h6>
            )}
          </div>
        </div>
        {activeId && activeId[0] ? (
         <Tooltip title="View Shift Details">
            <Link to={`/cook/endshift/${activeId[0]}`}>
              <img src={playgreen} alt="lantern app" />
            </Link>
          </Tooltip>
      ) : (
      <Tooltip title="View Shift Details">
          <Link to={`/cook/shiftperiod/${Id}`}>
          <img src={play} alt="lantern app" />
        </Link>
        </Tooltip>
      )}
      </div>
      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          className="w-11/12 mx-auto border border-slate-700 mb-3"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
      </div>

      <div className="flex w-11/12 justify-between mx-auto">
        <div className="w-1/2">
          <Link
            to={`/cook/startshift/${cookId}`}
            className="flex items-center justify-center"
          >
            <h6 className="flex items-center justify-center">Express</h6>
          </Link>
        </div>
        <div className="border-b-2 border-black w-1/2">
          <h6 className="flex items-center justify-center">Booked</h6>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex justify-between items-center sticky h-fit bg-yellow-500/20 p-2 mt-3 ">
        <NavLink
          to={`/cook/cookincoming/${cookId}`}
          activeclassname="active"
          style={
            location.pathname ===`/cook/cookincoming/${cookId}`
              ? activeStyle
              : inactiveStyle
          }
        >
          Incoming
        </NavLink>

        <NavLink
          to={`/cook/cookaccepted/${cookId}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/cookaccepted/${cookId}`
              ? activeStyle
              : inactiveStyle
          }
        >
          Accepted
        </NavLink>

        <NavLink
          to={`/cook/startshift/${cookId}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/startshift/${cookId}`
              ? activeStyle
              : inactiveStyle
          }
        >
          New Orders
        </NavLink>

        <NavLink
          to={`/cook/cookready/${cookId}`}
          activeclassname="active"
          style={
            location.pathname === `/cook/cookready/${cookId}`
              ? activeStyle
              : inactiveStyle
          }
        >
          Ready
        </NavLink>
      </div>
    </div>
  );
};

export const CooksMeals = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [shift, setShift] = useState([]);
  const Shift_id = useSelector((state)=>state.shiftId.value)
  const [activeId, setActiveId] = useState();
  const {cookId} = useContext(CookIdContext)

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/cook/profile/${cookId}`);
        setData(response.data.data);
        console.log(response.data.data);
          const ActiveShift = response.data.data.shifts?.filter(shift => shift.shift_status === 1);
        const ActiveId = ActiveShift.map(shift => shift.id);
        setActiveId(ActiveId);

        dispatch(setShiftId(ActiveId)) 
          const shiftDetailsPromises = ActiveId.map(id =>
          apiClient.get(`/cook/shift-edit/${id}`)
        );
          const shiftDetailsResponses = await Promise.all(shiftDetailsPromises);
        const shiftDetailsData = shiftDetailsResponses.map(response => response.data.data);
        
        setShift(shiftDetailsData);
        console.log(shiftDetailsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cookId]); 
  
  console.log(Shift_id[0])
  return (
    <div className="w-full ">
      <div className="h-24 flex justify-between max-lg:ml-2 w-11/12 mx-auto">
        <div className="flex w-fit justify-between">
          <div className="w-10 h-10 rounded-full bg-slate-600"></div>
          <div className="flex flex-col ml-2">
            <div>
              <h6 className="text-2xl font-[Lambency] ">{data.kitchen_name}</h6>
              {data.status === 2 ? (
                <h6 className="text-green-500 flex items-center">
                  <div className="w-2 h-2 rounded full mr-2 bg-green-500"></div>
                  Active
                </h6>
              ) : (
                <h6 className="text-red-500 flex items-center">
                  <div className="w-2 h-2 rounded full mr-2 bg-red-500"></div>
                  Inactive
                </h6>
              )}
            </div>
          </div>
        </div>
        {activeId && activeId[0] ? (
         <Tooltip title="View Shift Details">
            <Link to={`/cook/endshift/${activeId[0]}`}>
              <img src={playgreen} alt="lantern app" />
            </Link>
          </Tooltip>
      ) : (
      <Tooltip title="View Shift Details">
          <Link to={`/cook/shiftperiod/${Id}`}>
          <img src={play} alt="lantern app" />
        </Link>
        </Tooltip>
      )}
      </div>
    </div>
  );
};
