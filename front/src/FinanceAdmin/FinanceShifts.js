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
  import {UserTableRow} from "../sections/user/user-table-row";
  import UserTableHead from "../sections/user/user-table-head";
  import TableEmptyRows from "../sections/user/table-empty-rows";
  
  import { emptyRows, applyFilter, getComparator } from "../sections/user/utils";
  import TableNoData from "../sections/user/table-no-data";
  import { CalendarIcon } from "@mui/x-date-pickers";
  import { Search } from "@mui/icons-material";
  
  const FinanceShifts = () => {
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
  
    const handleClick = ( name) => {
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
    return (
      <div>
        <div className="h-24  w-full  max-lg:ml-2 ">
          <h6 className="text-xl p-2
          text-lanternOrange bg-lanternOrange/30">Shift earnings</h6>
       
        </div>
        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
          <Card
            sx={{ minWidth: 275 }}
            className="border border-slate-400 shadow-none max-lg:ml-2"
          >
            <CardContent className="text-center">
              <Typography
                variant="h6"
                sx={{ fontSize: 14 }}
                color="gray"
                gutterBottom
              >
                Total earnings
              </Typography>
              <Typography variant="h6" component="div">
                KES 204,500.00
                <span className="text-green-400 text-sm mt-2 ml-2">24%</span>
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ minWidth: 275 }}
            className="border border-slate-400 shadow-none max-lg:ml-2"
          >
            <CardContent className="text-center">
              <Typography
                variant="h6"
                sx={{ fontSize: 14 }}
                color="gray"
                gutterBottom
              >
                Total shifts
              </Typography>
  
              <h6 className=" font-semibold text-xl">452<span className="text-red-500 text-sm">-4%</span></h6>
            </CardContent>
          </Card>
          <Card
            sx={{ minWidth: 275 }}
            className="border border-slate-400 shadow-none max-lg:ml-2"
          >
            <CardContent className="text-center">
              <Typography
                variant="h6"
                sx={{ fontSize: 14 }}
                color="gray"
                gutterBottom
              >
                Remitted amount
              </Typography>
              <h6 className=" font-semibold text-xl">KES 28,500.00 <span className="text-red-500 text-sm ml-2">-4%</span></h6>
            </CardContent>
          </Card>
          
        </div>
          <div className=" h-[35rem] mt-10">
          <div className="flex max-lg:flex-col   h-fit justify-between  rounded-lg">
              <div className="h-24 flex flex-col justify-evenly ml-2  ">
                <h6 className="text-2xl text-semibold">All Transactions</h6>
                <div className="h-14 flex flex-col justify-evenly max-lg:w-full">
              <div className="w-64 h-fit flex  justify-between  max-lg:w-full">
                <h6
                  className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28"
                  style={{ fontSize: "13px" }}
                >
                  Copy
                </h6>
                <h6
                  className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28"
                  style={{ fontSize: "13px" }}
                >
                  CSV
                </h6>
                <h6
                  className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28"
                  style={{ fontSize: "13px" }}
                >
                  PDF
                </h6>
                <h6
                  className="rounded-xl border-2 border-slate-300  h-6 flex items-center justify-center mr-1 py-3 w-28"
                  style={{ fontSize: "13px" }}
                >
                  Print
                </h6>
              </div>
            </div>
              </div>
              <div className=" justify-evenly flex h-24 max-lg:w-11/12 ml-2 mb-2">
                <div
                  component="form"
                  className=" w-72 my-4 mx-auto rounded  border border-slate-700"
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
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <Search />
                  </IconButton>
                </div>
  
                <div
                  component="form"
                  className=" w-72 my-4  ml-4 rounded  border border-slate-700"
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
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <Search />
                  </IconButton>
                </div>
              </div>
            </div>
            <TableContainer >
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
  
  export default FinanceShifts;
  