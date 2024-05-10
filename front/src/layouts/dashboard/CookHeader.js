import PropTypes from "prop-types";


import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";


import { useResponsive } from "../../hooks/use-responsive";

import { bgBlur } from "../../theme/css";


import { NAV, HEADER } from "./config-layout";


import Topnav from "../../Reusable/Topnav";

// ----------------------------------------------------------------------

export default function CookHeader({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive("up", 1024);

  

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        background:"#F2F5F7",       
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          width: "full",
          float: "left",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Topnav />
      </Toolbar>
    </AppBar>
  );
}

CookHeader.propTypes = {
  onOpenNav: PropTypes.func,
};
