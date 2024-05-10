import { useState } from "react";

import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";


import { Add, Logout, PersonOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Driver",
    path: "/driver/home",
    icon: <PersonOutline className="mr-2"/>,
  },
  {
    label: "DriverAdmin",
    path: "/driveradmin/assigneddriver",
    icon: <PersonOutline className="mr-2"/>,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <Add className="mr-2"/>,
  },
];

// ----------------------------------------------------------------------

export default function DriverPopover() {
  const [open, setOpen] = useState(null);



  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      {/* <IconButton
        onClick={handleOpen}
        sx={{
            width: 40,
            height: 40,
            background: (theme) => alpha(theme.palette.grey[500], 0.08),
            textAlign: "right"        }}
      >
      </IconButton> */}

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
            color:"white"
          },
        }}
      >
        {MENU_OPTIONS.map((option) => (
          <Link to={option.path}>
            <MenuItem key={option.label} onClick={handleClose} >
              {option.icon}
              {option.label}
            </MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          <Logout/>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
