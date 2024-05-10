import React, { useContext, useEffect, useState } from "react";
import { CooksNav } from "../Reusable/DriverNav";
import Switch from "@mui/material/Switch";
import {
  ImportExport,
  ListAlt,
  MailOutline,
  PersonOutline,
  PhoneAndroidOutlined,
  PowerSettingsNew,
  Star,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientIdContext } from "../Helper/Context";
import Storage from "../Storage/AuthSession";
import { apiClient } from "../Storage/ApiClient";
import { Backdrop, CircularProgress,  Modal} from "@mui/material";
const label = { inputProps: { "aria-label": "Switch demo" } };

const CookProfileInfo = () => {
  const { Id } = useParams();
  const history = useNavigate();
  const [url, setUrl] = useState(`/cook/profile/${Id}`);
  const { clientId, setClientId } = useContext(ClientIdContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const [toLoginPage, setToLoginPage] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const handleClose = () => setOpenModalId(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(url)
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
          setClientId(response.data.data.client_id);
          setComponentKey(Date.now() + 1);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [url]);

  function onLogoutHandler() {
    Storage.logOut();
    history("/login");
    setToLoginPage(true);
  }

  const [checked, setChecked] = useState(false);

  const handleRoles = () => {
    setChecked(true);

    history(`/client/home/${clientId}`);
  };

  return (
    <div>
       {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
       <Modal
        open={openModalId}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" mt-56"
      >
        <div className="w-3/4 mx-auto bg-white h-44 rounded my-auto p-2 flex flex-col justify-evenly">
          <h6 className="text-red-500 text-center text-lg font-semibold ">Deactivate profile</h6>
          <h6 className="text-center">
          Are you sure you want to deactivate your profile          </h6>
          <div className="w-full flex justify-between">
            <button
              className=" w-1/2 mr-3 h-10 border border-slate-500  text-slate-500 rounded"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className=" w-1/2 h-10 bg-red-500 text-white rounded"
             
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <div className="h-4/5 overflow-auto">
        <div className="bg-black h-1/4 py-5">
          <div className="max-lg:w-11/12  w-1/3 mx-auto">
            <div className="h-full w-1/2 mx-auto text-white font-sans">
              <div className="w-44 h-44 rounded-full bg-gray-600 mb-4"></div>
              <div className=" flex flex-col justify-center items-center mx-auto">
                <h6 className="text-xl font-bold text-white w-full text-center">
                 {data.kitchen_name}
                </h6>
                <h6 className="text-center w-full">{data.mpesa_number}</h6>
                <h6 className="flex items-center font-semibold w-44 justify-between">
                  <Star />
                  4.3<span>(321 Reviews)</span>
                </h6>
                <div className="flex justify-evenly4 items-center w-11/12 text-center"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-11/12 mx-auto h-fit mt-4 border-b border-gray-300 items-center">
          <h6 className="ml-4 text-slate-900">
            <PersonOutline style={{ marginRight: "1rem" }} />
            Profile
          </h6>
          <Link to={`/cook/editcookprofile/${Id}`}>
            <h6 className="text-green-500">Edit</h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-4 border-b border-gray-300 items-center">
          <Link to="/cook/transactionhistory">
            <h6 className="ml-4 text-slate-900">
              <ListAlt style={{ marginRight: "1rem" }} />
              Transaction History
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 mx-auto h-fit mt-4 border-b border-gray-300 items-center">
          <Link to={`/cook/changenumber/${Id}`}>
            <h6 className="ml-4 text-slate-900">
              <PhoneAndroidOutlined style={{ marginRight: "1rem" }} />
              Change Mpesa number
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 justify-between mx-auto h-fit mt-4 border-b border-gray-300 items-center">
          <h6 className="ml-4 text-slate-900">
            <ImportExport style={{ marginRight: "0.5rem" }} />
            Switch to client
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
        <div className="flex w-11/12 mx-auto h-fit mt-4 border-b border-gray-300 items-center">
          <Link to={`/driveradmin/myanalytics/{Id}`}>
            <h6 className="ml-4 text-slate-900">
              <MailOutline style={{ marginRight: "1rem" }} />
              Mailbox
            </h6>
          </Link>
        </div>
        <div className="flex w-11/12 justify-between mx-auto h-fit mt-4 border-b border-gray-300 items-center">
          <h6 className="ml-4 text-slate-900">
            <PowerSettingsNew style={{ marginRight: "0.5rem" }} />
            Deactivate Profile
          </h6>
          <Switch
            value={checked}
            defaultChecked={checked}
            onChange={()=>setOpenModalId(true)}
            shape="pill"
            size="sm"
            variant="outline"
          />
        </div>
      </div>
      <div className="w-32 h-10 mt-2 rounded-lg text-white mx-auto">
        <button className="w-full h-full rounded-lg bg-green-500">
          Get Poster
        </button>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default CookProfileInfo;
