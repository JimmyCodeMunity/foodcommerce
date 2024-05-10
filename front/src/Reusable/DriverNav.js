import React, { useContext } from "react";
import {
  AutoGraph,
  DirectionsCarOutlined,
  ExploreOutlined,
  HomeOutlined,
  ListAlt,
  ListAltOutlined,
  MailOutline,
  PersonOutline,
  Portrait,
  SetMealOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";

import { NavLink, useLocation, useParams } from "react-router-dom";
import { ClientIdContext, CookIdContext } from "../Helper/Context";

const activeStyle = {
  color: "#FED10A",
};

const inactiveStyle = {
  color: "black",
};

export const DriverNav = () => {
  const {Id} = useParams()
  const location = useLocation();

  return (
    <div className="w-11/12 mx-auto flex justify-between items-center sticky h-fit bg-white pt-2 border-t-2 border-slate-200">
      <NavLink
        to={`/driver/home/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driver/home/${Id}` ? activeStyle : inactiveStyle
        }
      >
        <HomeOutlined style={{ fontSize: "1.7rem" }} />
      </NavLink>
      <NavLink
        to={`/driver/activeorders/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driver/activeorders/${Id}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <ListAlt style={{ fontSize: "1.7rem" }} />
      </NavLink>
      <NavLink
        to={`/driver/closedorders/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driver/closedorders/${Id}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <ExploreOutlined style={{ fontSize: "1.7rem" }} />
      </NavLink>
      <NavLink
        to={`/driver/mailbox/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driver/mailbox/${Id}` ? activeStyle : inactiveStyle
        }
      >
        <MailOutline style={{ fontSize: "1.7rem" }} />
      </NavLink>
      <NavLink
        to={`/driver/profile/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driver/profile/${Id}` ? activeStyle : inactiveStyle
        }
      >
        <PersonOutline style={{ fontSize: "1.7rem" }} />
      </NavLink>
    </div>
  );
};

export const DriverAdminNav = () => {
  const location = useLocation();
  const { Id } = useParams();

  return (
    <div className="w-11/12 mx-auto flex justify-between items-center sticky h-fit bg-white pt-2">
      <NavLink
        to={`/driveradmin/driverhome/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driveradmin/driverhome/${Id}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <HomeOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>

      <NavLink
        to={`/driveradmin/assigneddriver/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driveradmin/assigneddriver/${Id}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <Portrait style={{ fontSize: "1.9rem" }} />
      </NavLink>

      <NavLink
        to={`/driveradmin/unassignedvehicle/${Id}`}
        activeclassname="active"
        style={
          location.pathname === ` /driveradmin/unassignedvehicle/${Id}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <DirectionsCarOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>
      <NavLink
        to={`/driveradmin/myaccount/${Id}`}
        activeclassname="active"
        style={
          location.pathname === `/driveradmin/myaccount/${Id}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <PersonOutline style={{ fontSize: "1.9rem" }} />
      </NavLink>
    </div>
  );
};

export const CooksNav = () => {
  const location = useLocation();
  const { Id } = useParams();
  const {cookId} = useContext(CookIdContext)
  return (
    <div className="w-11/12 mx-auto flex justify-between items-center sticky h-fit bg-white pt-2">
      <NavLink
        to={`/cook/home/${cookId}`}
        activeclassname="active"
        style={
          location.pathname === `/cook/home/${cookId}` ? activeStyle : inactiveStyle
        }
      >
        <HomeOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>

      <NavLink
        to={`/cook/cookcreatemeals/${cookId}`}
        activeclassname="active"
        style={
          location.pathname === `/cook/cookcreatemeals/${cookId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <SetMealOutlined style={{ fontSize: "1.9rem" }} />
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
        <ListAltOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>
      <NavLink
        to={`/cook/cookanalytics/${cookId}`}
        activeclassname="active"
        style={
          location.pathname === `/cook/cookanalytics/${cookId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <AutoGraph style={{ fontSize: "1.9rem" }} />
      </NavLink>
      <NavLink
        to={`/cook/profileinfo/${cookId}`}
        activeclassname="active"
        style={
          location.pathname === `/cook/profileinfo/${cookId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <PersonOutline style={{ fontSize: "1.9rem" }} />
      </NavLink>
    </div>
  );
};
export const ClientNav = () => {
  const location = useLocation();
  const { Id } = useParams();
  const {clientId} = useContext(ClientIdContext)

  return (
    <div className="w-11/12 mx-auto flex justify-between items-center sticky h-fit bg-white pt-2">
      <NavLink
        to={`/client/home/${clientId}`}
        activeclassname="active"
        style={
          location.pathname === `/client/home/${clientId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <HomeOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>

      <NavLink
        to={`/client/myorders/${clientId}`}
        activeclassname="active"
        style={
          location.pathname === `/client/myorders/${clientId} `
            ? activeStyle
            : inactiveStyle
        }
      >
        <ExploreOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>
      <NavLink
        to={`/client/mealdets/${clientId}`}
        activeclassname="active"
        style={
          location.pathname === `/client/mealdets/${clientId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <ShoppingCartOutlined style={{ fontSize: "1.9rem" }} />
      </NavLink>
      <NavLink
        to={`/client/cooks/${clientId}`}
        activeclassname="active"
        style={
          location.pathname === `/client/cooks/${clientId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <img src={hat} alt="..." />
      </NavLink>

      <NavLink
        to={`/client/clientprofile/${clientId}`}
        activeclassname="active"
        style={
          location.pathname === `/client/clientprofile/${clientId}`
            ? activeStyle
            : inactiveStyle
        }
      >
        <PersonOutline style={{ fontSize: "1.9rem" }} />
      </NavLink>
    </div>
  );
};
