import {
  IconButton,
  InputBase,
  Paper,
  TableBody,
  TableContainer,
  TextField,
  TableCell,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { users } from "../_mock/user";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import UserTableHead from "../sections/user/user-table-head";

import { applyFilter, getComparator } from "../sections/user/utils";
import TableNoData from "../sections/user/table-no-data";
import { CalendarIcon } from "@mui/x-date-pickers";
import { ChevronLeft, Close, Search } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiAdmin } from "../Storage/ApiClient";
import Topnav from "../Reusable/Topnav";

const Communications = () => {
  const navigate = useNavigate();
  const [page] = useState(0);
  const { Id } = useParams();
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [loading, setLoading] = useState(false);
  const [filterName] = useState("");
  const [rowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      apiAdmin
        .get("/users")
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiAdmin
        .get("/markups")
        .then((response) => {
          console.log(response);
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
    <div className="h-full ">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" w-11/12 mx-auto rounded-xl h-fit py-4 pb-6 bg-white">
          <div
            className="w-11/12 mx-auto flex justify-between"
            onClick={handleClose}
          >
            <h6 className="text-xl ml-4">Markup</h6>
            <Close style={{ fontSize: "1.5rem" }} />
          </div>

          <div className="flex items-center flex-col w-11/12 mx-auto">
            <Paper
              component="form"
              className="w-full mt-2 mx-auto  border border-slate-700"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <CalendarIcon />
              </IconButton>
              <InputBase
                placeholder="01-10-2001 - 20-01-2002"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </Paper>
            <TextField
              margin="normal"
              id="filled-basic"
              placeholder="Order type"
              variant="outlined"
              className="w-full h-10"
            />
            <TextField
              margin="normal"
              id="filled-basic"
              placeholder="Markup"
              variant="outlined"
              className="w-full h-10"
            />
            <Link
              to={`/client/paymentsuccess/${Id}`}
              className="w-full mx-auto h-12 rounded-lg bg-lanternOrange text-white my-4"
            >
              <button className="w-full h-full text-xl">Save Changes</button>
            </Link>
          </div>
        </div>
      </Modal>
      <Topnav />
      <Link
        to={`/driveradmin/myaccount/${Id}`}
        className="h-14 flex font-sans items-center w-full mt-2 bg-lanternOrange text-white text-left"
      >
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{ fontSize: "2.5rem", marginRight: "0.8rem" }} />
          New Message
        </h6>
      </Link>

      <div className=" h-[35rem] mt-10 bg-white">
        <TableContainer className="">
          <Table sx={{ minWidth: 800,bgcolor: "white" }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={users?.length}
              onRequestSort={handleSort}
              headLabel={[
                { id: "name", label: "Id", align: "left" },
                { id: "company", label: "Target", align: "left" },
                { id: "role", label: "Message", align: "left" },
                { id: "isVerified", label: "Date", align: "left" },
              ]}
            />
            {data
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((row) => (
                <TableBody
                  onClick={() =>
                    navigate(`/driveradmin/ridermessage/${row.id}`)
                  }
                >
                  <>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">Payment recieved</TableCell>
                    <TableCell align="left">12/06/2024</TableCell>
                  </>

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              ))}
          </Table>
        </TableContainer>
        <div className="flex w-11/12 justify-center mx-auto items-center h-10  mt-24">
          <button
            className="w-11/12 float-left px-2 h-10 rounded bg-lanternOrange text-white"
            onClick={() => navigate("/driveradmin/ridernewmssg")}
          >
            New message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communications;
