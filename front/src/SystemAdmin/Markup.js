import {
  Card,
  CardContent,
  IconButton,
  InputBase,
  Paper,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { users } from "../_mock/user";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import { UserTableRow } from "../sections/user/user-table-row";
import UserTableHead from "../sections/user/user-table-head";
import TableEmptyRows from "../sections/user/table-empty-rows";

import { emptyRows, applyFilter, getComparator } from "../sections/user/utils";
import TableNoData from "../sections/user/table-no-data";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Close, PersonOutline, Search } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { apiAdmin } from "../Storage/ApiClient";

const Markup = () => {
  const [page] = useState(0);
  const { Id } = useParams();
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [loading, setLoading] = useState(false);
  const [filterName] = useState("");
  const [rowsPerPage] = useState(5);

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
  const handleOpen = () => setOpen(true);
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
      <div className="h-24 w-full flex justify-between max-lg:ml-2 max-lg:mr-2 -mt-2">
        <h6 className="text-3xl ">Markup</h6>
        <div className="flex w-36 justify-between items-center h-10">
          <button
            className="w-24 ml-2 h-10 rounded bg-lanternOrange text-white"
            onClick={handleOpen}
          >
            Set Markup
          </button>
          <PersonOutline style={{ fontSize: "2rem" }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400 max-lg:ml-2 shadow-none"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total booked orders
            </Typography>
            <Typography variant="h5" component="div">
              25
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400 max-lg:ml-2 shadow-none"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total express orders{" "}
            </Typography>

            <h6 className=" font-semibold text-2xl">12</h6>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400 max-lg:ml-2 shadow-none"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Estimated earnings
            </Typography>
            <h6 className=" font-semibold text-2xl">452</h6>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400 max-lg:ml-2 shadow-none"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total revenue of meals
            </Typography>
            <h6 className=" font-semibold text-2xl">
              452<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400 max-lg:ml-2 shadow-none"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total revenue of deliveries
            </Typography>
            <h6 className=" font-semibold text-2xl">
              452<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
      </div> 
      <div className=" h-[35rem] mt-10"><h6 className="text-3xl ml-3 text-semibold">All Periods</h6>
      <div className="flex max-lg:flex-col w-full h-fit justify-between items-center ">
        <div className="h-14 flex flex-col justify-evenly ml-2 max-lg:w-11/12">
          <div className="w-64 h-fit flex  justify-between max-lg:w-full  max-lg:justify-between ">
            <h6 className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28" style={{fontSize:"13px"}}>
              Copy
            </h6>
            <h6 className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28" style={{fontSize:"13px"}}>CSV</h6>
            <h6 className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28" style={{fontSize:"13px"}}>PDF</h6>
            <h6 className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28" style={{fontSize:"13px"}}>
              Print
            </h6>
          </div>
        </div>
       
          <div
            className="w-1/3 rounded my-2 mx-auto ml-2  border border-slate-700 flex justify-between max-lg:w-11/12  max-lg:justify-between "
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              placeholder=" 11-02-2023 to 11-03-2024"
              
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <CalendarIcon />
            </IconButton>
          </div>
          <div
            className="w-1/3 rounded my-2 mx-auto  border border-slate-700 flex justify-between  max-lg:w-11/12  max-lg:justify-between"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              placeholder=" Search"
              
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </div>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={users?.length}
              numSelected={selected?.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "name", label: "Name" },
                { id: "company", label: "Company" },
                { id: "role", label: "Role" },
                { id: "isVerified", label: "Verified", align: "center" },
                { id: "status", label: "Status" },
                { id: "" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name}
                    role={row.role}
                    status={row.status}
                    company={row.company}
                    avatarUrl={row.avatarUrl}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, users?.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Markup;
