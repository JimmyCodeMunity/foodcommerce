import {
  Card,
  CardContent,
  IconButton,
  InputBase,
  Paper,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { users } from "../_mock/user";
import Table from "@mui/material/Table";
import { ApproverCookRow } from "../sections/user/user-table-row";
import UserTableHead from "../sections/user/user-table-head";
import TableEmptyRows from "../sections/user/table-empty-rows";

import { emptyRows, applyFilter, getComparator } from "../sections/user/utils";
import TableNoData from "../sections/user/table-no-data";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import ApproverPopover from "../layouts/dashboard/common/approver-popover";

const CookMeals = () => {
  const [page] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName] = useState("");

  const [rowsPerPage] = useState(5);

  const handleSort = ( id) => {
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
    } else if (selectedIndex === selected.length - 1) {
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

  const notFound = !dataFiltered.length && !!filterName;
  return (
    <div>
      <div className="h-fit mb-4  w-full  max-lg:ml-2 flex justify-between  bg-lanternOrange/30 p-2 max-lg:flex-col">
        <h6
          className="text-3xl 
            text-lanternOrange"
        >
          Meals
        </h6>
        <div className="w-1/2 flex justify-between items-center max-lg:w-11/12 max-lg:my-2">
          <h6>All</h6>
          <h6>New application</h6>
          <h6>Recently corrected</h6>
          <h6>Edited profile</h6>
        </div>
      </div>
      <ApproverPopover />
      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400  shadow-none max-lg:ml-2"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              New approvals
            </Typography>
            <Typography variant="h3" component="div">
              KES 204,500.00
              <span className="text-green-400 text-sm mt-2 ml-2">24%</span>
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400  shadow-none max-lg:ml-2"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Corrected approvals
            </Typography>

            <h6 className=" font-semibold text-3xl">
              452<span className="text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 275 }}
          className="border border-slate-400  shadow-none max-lg:ml-2"
        >
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Edited approval
            </Typography>
            <h6 className=" font-semibold text-3xl">
              KES 28,500.00{" "}
              <span className="text-red-500 text-sm ml-2">-4%</span>
            </h6>
          </CardContent>
        </Card>
      </div>
      <div className=" h-[35rem] mt-10">
        <div className="flex max-lg:flex-col    justify-between rounded-lg">
          <div className="h-10 flex flex-col justify-between ml-2  ">
            <h6 className="text-2xl text-semibold">List of all meals</h6>
          </div>
        </div>
        <div className=" flex  h-24 mb-2">
          <Paper
            component="form"
            className="w-2/5 justify-between my-4 mx-auto  border border-slate-700"
            sx={{
              p: "2px 4px",
              ml: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
         
            <InputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>

          <Paper
            component="form"
            className="w-2/5  my-4 mx-auto justify-between  border border-slate-700"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
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
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={users.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "TID", label: "TID" },
                { id: "Account no.", label: "Account no." },
                { id: "Amount", label: "Amount" },
                { id: "Amount", label: "Amount", align: "center" },
                { id: "Kitchen Name", label: "Kitchen Name" },
                { id: "Cook ID", label: "Cook ID" },
                { id: "Payment type", label: "Payment type" },
                { id: "Time", label: "Time" },
                { id: "Date", label: "Date" },
                { id: "Action", label: "Action" },
                { id: "" },
              ]}
            />
            <TableBody>
              {dataFiltered
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <ApproverCookRow
                    key={row.id}
                    TID={row.name}
                    Amount={row.role}
                    Kitchen
                    Name={row.status}
                    Account
                    no={row.company}
                    avatarUrl={row.avatarUrl}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, users.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CookMeals;
