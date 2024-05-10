import { useState } from "react";

import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";

import { FilterList, Logout, PersonOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Cook's Profile",
    path: "/cprofile",
    icon: <PersonOutline className="mr-2" />,
  },
];

// ----------------------------------------------------------------------

export default function ApproverPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div className="w-full  text-end">
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          textAlign: "left",
          marginBottom: "1rem",
        }}
      >
        <FilterList style={{ fontSize: "2rem" }} />
      </IconButton>

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
          },
        }}
      >
        {MENU_OPTIONS.map((option) => (
          <Link to={option.path}>
            <MenuItem key={option.label} onClick={handleClose}>
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
          <Logout />
          Logout
        </MenuItem>
      </Popover>
    </div>
  );
}
