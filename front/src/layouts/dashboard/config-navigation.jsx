import {
  AnalyticsOutlined,
  AutoGraphOutlined,
  HomeOutlined,
  ListAltOutlined,
  MessageOutlined,
  PersonOutline,
  SetMealOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { ClientIdContext, CookIdContext } from "../../Helper/Context";
import { LuChefHat } from "react-icons/lu";
import { useContext } from "react";

// ----------------------------------------------------------------------

export const NavConfig = () => {
  const { Id } = useParams();
  return [
    {
      title: "Home",
      path: `/dashboard/${Id}`,
      icon: <AnalyticsOutlined />,
    },
    {
      title: "Admins",
      path: `/admins/${Id}`,
      icon: <PersonOutline />,
    },
    {
      title: "Shift",
      path: `/shifts/${Id}`,
      icon: <AnalyticsOutlined />,
    },
    {
      title: "Markup",
      path: `/markup/${Id}`,
      icon: <AnalyticsOutlined />,
    },
    {
      title: "Communication",
      path:`/communications/${Id}`,
      icon: <MessageOutlined />,
    },
  ];
};

export const FinancenavConfig = [
  {
    title: "Home",
    path: "/finance",
    icon: <PersonOutline />,
  },
  {
    title: "Delivaries",
    path: "/fdelivaries",
    icon: <PersonOutline />,
  },
  {
    title: "Shifts",
    path: "/fshifts",
    icon: <PersonOutline />,
  },
  {
    title: "Transactions",
    path: "/ftransactions",
    icon: <PersonOutline />,
  },
];

export const ApproverNavConfig = () => {
  const { Id } = useParams();
  return [
    {
      title: "Home",
      path: `/approver/${Id}`,
      icon: <PersonOutline />,
    },
    {
      title: "Cooks",
      path: `/acooks`,
      icon: <PersonOutline />,
    },
    {
      title: "Meals",
      path: `/ameals`,
      icon: <PersonOutline />,
    },
  ];
};
export const DriverNavConfig = () => {
  const { Id } = useParams();
  return [
    {
      title: "Client",
      path: "/login",
      icon: <PersonOutline />,
    },
    {
      title: "Cooks",
      path: `/cook/home/${Id}`,
      icon: <PersonOutline />,
    },
    {
      title: "Driver",
      path: "/driver/home",
      icon: <PersonOutline />,
    },
    {
      title: "DriverAdmin",
      path: "/driveradmin/assigneddriver",
      icon: <PersonOutline />,
    },
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <PersonOutline />,
    },
    {
      title: "Approver",
      path: `/approver/${Id}`,
      icon: <PersonOutline />,
    },
    {
      title: "Finance",
      path: "/finance",
      icon: <PersonOutline />,
    },
  ];
};

export const CookNavConfig = () => {
  const { Id } = useParams();
  const {cookId} = useContext(CookIdContext)

  return [
    {
      title: "Home",
      path: `/cook/home/${cookId}`,
      icon: <HomeOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "Meals",
      path: `/cook/cookcreatemeals/${cookId}`,
      icon: <SetMealOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "Orders",
      path: `/cook/startshift/${cookId}`,
      icon: <ListAltOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "Finance",
      path: `/cook/cookanalytics/${cookId}`,
      icon: <AutoGraphOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "My Account",
      path: `/cook/profileinfo/${cookId}`,
      icon: <PersonOutline style={{ marginRight: "1rem" }} />,
    },
  ];
};
export const ClientNavConfig = () => {
  const { clientId } = useContext(ClientIdContext);
  const { Id } = useParams();

  return [
    {
      title: "Home",
      path: `/client/home/${clientId}`,
      icon: <HomeOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "Orders",
      path: `/client/myorders/${clientId}`,
      icon: <SetMealOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "Cart",
      path: `/client/mealdets/${clientId}`,
      icon: <ShoppingCartOutlined style={{ marginRight: "1rem" }} />,
    },
    {
      title: "Cooks",
      path: `/client/cooks/${clientId}`,
      icon: <LuChefHat style={{ marginRight: "1rem",fontSize:"1.4rem" }} />,
    },
    {
      title: "My Account",
      path: `/client/clientprofile/${clientId}`,
      icon: <PersonOutline style={{ marginRight: "1rem" }} />,
    },
  ];
};
