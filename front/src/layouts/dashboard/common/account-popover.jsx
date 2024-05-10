import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { Add, Logout, PersonOutline } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";
import { apiAdmin } from "../../../Storage/ApiClient";

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: "Finance",
//     path: "/finance",
//     icon: <PersonOutline className="mr-2" />,
//   },
//   {
//     label: "Approver",
//     path: "/approver",
//     icon: <PersonOutline className="mr-2" />,
//   },
//   {
//     label: "Add Admin",
//     icon: <Add className="mr-2" />,
//   },
//   {
//     label: "Add DeliveryCompany",
//     icon: <Add className="mr-2" />,
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { Id } = useParams();
  const history = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const [openModal, setModal] = useState(false);
  const handleModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const [openAdmin, setAdmin] = useState(false);
  const handleAdmin = () => setAdmin(true);
  const handleCloseAdmin = () => setAdmin(false);

  const deliveryState = {
    full_name: "",
    phone_number: "",
    email: "",
    company: "",
    location_charge: "",
  };

  const [formValue, setFormValues] = useState(deliveryState);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
    role_id: 1,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles] = useState([]);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(false);
    setOpen(false);
    setLoading(true);
    try {
      const response = await apiAdmin.post("deliverycompanies", formValue);
      console.log("Response:", response.data);
      if (response.data) {
        setLoading(false);
        setMessage("Delivery company added successfully");
        history("/driveradmin/otp");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
  };

  const handleAdminSubmit = () => {
    setLoading(true);
    apiAdmin
      .post("/users", formData)
      .then((res) => {
        setLoading(false);
        setMessage("Admin Created Successfully");
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      apiAdmin
        .get("/roles")
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchCategory();
  }, []);
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute bg-white rounded p-4  top-44  max-lg:h-1/2">
          <div>
            <h2 className="text-2xl text-lanternOrange font-sans">
              Add Delivery Company
            </h2>
          </div>
          <div className="flex flex-col justify-evenly">
            <TextField
              margin="dense"
              label="Full Name"
              variant="outlined"
              value={formValue.full_name}
              onChange={(e) =>
                setFormValues({ ...formValue, full_name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Phone Number"
              variant="outlined"
              value={formValue.phone_number}
              onChange={(e) =>
                setFormValues({ ...formValue, phone_number: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email Address"
              variant="outlined"
              value={formValue.email}
              onChange={(e) =>
                setFormValues({ ...formValue, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Company Name"
              variant="outlined"
              value={formValue.company}
              onChange={(e) =>
                setFormValues({ ...formValue, company: e.target.value })
              }
            />

            <TextField
              margin="dense"
              label="Location Charge"
              value={formValue.location_charge}
              onChange={(e) =>
                setFormValues({ ...formValue, location_charge: e.target.value })
              }
              variant="outlined"
            />
          </div>
          <div className="w-full rounded-lg bg-lanternOrange text-white mt-3 h-12">
            <button className="font-sans w-full h-full" onClick={handleSubmit}>
              Save Delivery Company
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={openAdmin} onClose={handleCloseAdmin}>
        <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute bg-white rounded p-4  top-44  max-lg:h-1/2">
          <div>
            <h2 className="text-2xl text-lanternOrange font-sans">Add Admin</h2>
          </div>
          <div className="flex flex-col">
            <TextField
              margin="dense"
              id="filled-basic"
              label="Full Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="filled-basic"
              label="Email Address"
              variant="outlined"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="filled-basic"
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="filled-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <TextField
              id="outlined-select-currency-native"
              select
              label="Admin Role"
              className="w-full"
              SelectProps={{
                native: true,
              }}
              helperText="Please select admin role"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="w-full rounded-lg bg-lanternOrange text-white h-12">
            <button
              className="font-sans w-full h-full"
              onClick={handleAdminSubmit}
            >
              Create Admin
            </button>
          </div>
        </div>
      </Modal>
      <div onClick={handleOpen} >
        <PersonOutline style={{fontSize:"2rem"}}/>
      </div>

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
            width: 300,
          },
        }}
        className="flex flex-col justify-between h-74 w-80"
      >
        <div className="p-2 flex flex-col justify-between h-52">
          <Link to="/finance">
            <h6>Finance</h6>
          </Link>

          <Link to={`/approver/${Id}`}>
            <h6>Approver</h6>
          </Link>
          <h6 onClick={handleAdmin}>
            <Add /> Add Admin
          </h6>

          <h6 onClick={handleModal}>
            <Add /> Add Delivery Company
          </h6>
        </div>

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
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative h-44 w-11/12 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div className="relative h-44 w-11/12 mx-auto">
        {message && (
          <Alert severity="sucess" className="w-full absolute top-1/2 ">
            {message.message}
          </Alert>
        )}
      </div>
    </>
  );
}
