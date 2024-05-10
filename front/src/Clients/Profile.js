import React, { useEffect, useState } from "react";
import Storage from "../Storage/AuthSession";

import { ClientNav } from "../Reusable/DriverNav";
import Switch from "@mui/material/Switch";
import {
  FavoriteBorder,
  ImportExport,
  ListAlt,
  Logout,
  MailOutline,
  PersonOutline,
  Star,
} from "@mui/icons-material";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import { ClientIdContext, CookIdContext } from "../Helper/Context";
import { useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";

const label = { inputProps: { "aria-label": "Switch demo" } };

const ClientProfile = () => {
  const { Id } = useParams();
  const history = useNavigate();
  const [url, setUrl] = useState(`/get-profile/${Id}`);
  const { clientId, setClientId } = useContext(ClientIdContext);
  const { cookId, setCookId } = useContext(CookIdContext)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const [toLoginPage, setToLoginPage] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     apiClient
  //       .get(url)
  //       .then((response) => {
  //         setData(response.data.data);
  //         console.log(response.data.data);
  //         setClientId(response.data.data.id);
  //         setComponentKey(Date.now() + 1);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   };
  //   fetchData();
  // }, [url]);

  //Display  info
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(Id)

        const response = await axios.get(process.env.REACT_APP_API_URL+`client/get-profile/${Id}`);
        const collected = response.data;
        setData(collected)
        setClientId(collected.id);
        setComponentKey(Date.now() + 1);
        console.log("collected info", response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)

      }
    };
    fetchData();
  }, [`/get-profile/${Id}`]);

  function onLogoutHandler() {
    Storage.logOut();
    history("/login");
    setToLoginPage(true);
  }
  const [checked, setChecked] = useState(false);

  const handleRoles = () => {
    setChecked(true);
    if (data && data.cook) {
      setCookId(data.cook.id)
      history(`/cook/home/${data.cook.id}`);
    } else {
      history(`/cook/register/${Id}`);
    }
  };

  return (
    <div className="h-full">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {toLoginPage ? <Navigate to="/login" /> : null}
      <div className="h-4/5 overflow-auto">
        <div className="bg-black h-1/4 py-5">
          <div className="max-lg:w-11/12  w-1/3 mx-auto">
            <div className="h-full w-1/2 mx-auto text-white font-sans">
              <div className="w-48 h-48 rounded-full bg-gray-600 mx-auto mb-4"></div>
              <div className=" flex flex-col justify-center items-center mx-auto">
                <h6 className="text-xl font-bold text-white w-full text-center">
                  {data.fullname}
                </h6>
                <h6 className="text-center w-full">{data.phoneNumber}</h6>
                <h6 className="flex items-center font-semibold w-fit justify-between">
                  <Star />
                  4.3<span>(321 Reviews)</span>
                </h6>
                <div className="flex justify-evenly4 items-center w-11/12 text-center"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-11/12 mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <h6 className="ml-4 text-slate-900">
            <PersonOutline style={{ marginRight: "0.5rem" }} />
            Profile
          </h6>
          <Link to={`/client/editprofile/${Id}`}>
            <h6 className="text-green-500">Edit</h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <Link to={`/client/favmeals/${Id}`}>
            <h6 className="ml-4 text-slate-900">
              <FavoriteBorder style={{ marginRight: "0.5rem" }} />
              Favorites
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <Link to={`/client/transactions/${Id}`}>
            <h6 className="ml-4 text-slate-900">
              <ListAlt style={{ marginRight: "0.5rem" }} />
              Transaction History
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 justify-between mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <Link to={`/driveradmin/myanalytics/${Id}`}>
            <h6 className="ml-4 text-slate-900">
              <MailOutline style={{ marginRight: "0.5rem" }} />
              Marketing News
            </h6>
          </Link>
          <Switch {...label} />
        </div>
        <div className="flex w-11/12 justify-between mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <h6 className="ml-4  text-slate-900">
            <ImportExport style={{ marginRight: "0.5rem" }} />
            Cook for us
          </h6>
          <Switch
            value={checked}
            defaultChecked={checked}
            onChange={handleRoles}
            shape="pill"
            size="sm"
            variant="outline"
          />
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <Link to={`/driveradmin/myanalytics/{Id}`}>
            <h6 className="ml-4 text-slate-900">
              <MailOutline style={{ marginRight: "0.5rem" }} />
              Mailbox
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-3 border-b border-gray-300 items-center">
          <h6 className="ml-4 text-red-500" onClick={onLogoutHandler}>
            <Logout style={{ marginRight: "0.5rem" }} />
            Log Out
          </h6>
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};

export default ClientProfile;
