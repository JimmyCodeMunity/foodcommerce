import {
  Card,
  CardContent,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { users } from "../_mock/user";
import Table from "@mui/material/Table";
import { UserTableRow } from "../sections/user/user-table-row";
import UserTableHead from "../sections/user/user-table-head";
import TableEmptyRows from "../sections/user/table-empty-rows";
import TableNoData from "../sections/user/table-no-data";

import { emptyRows, applyFilter, getComparator } from "../sections/user/utils";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import AccountPopover from "../layouts/dashboard/common/account-popover";
import { FilterList } from "@mui/icons-material";
import { apiAdmin } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const Shift = () => {
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [filterName] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiAdmin
        .get("/cooks/active-shifts")
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const totalEstimatedRevenue = data.reduce((total, shift) => {
    return total + parseFloat(shift.estimated_revenue);
  }, 0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className=" bg-[#F2F5F7]">
      <div className="flex justify-between w-full h-20 items-center">
        <div className="h-24 flex flex-col justify-evenly max-lg:ml-2">
          <h6 className="text-3xl ">Shifts</h6>
          <h6 className="text-green-400">06.00am - 06.00pm</h6>
        </div>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterList
            style={{ fontSize: "2rem" }}
            className=" text-slate-400"
          />
          <AccountPopover />
        </Stack>
      </div>
      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none bg-white">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total Shifts
            </Typography>
            <Typography variant="h5" component="div">
              {data?.length}
            </Typography>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none bg-white">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Active Shifts
            </Typography>

            <h6 className=" font-semibold text-2xl">{data?.length}</h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none bg-white">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Estimated earnings
            </Typography>
            <h6 className=" font-semibold text-2xl">
              <NumberFormat
                value={totalEstimatedRevenue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Ksh. "}
              />
            </h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none bg-white">
          <CardContent className="text-center" style={{ boxShadow: "0" }}>
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
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none bg-white">
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
      <div className=" h-[35rem] mt-10">
        <div className="flex max-lg:flex-col   h-fit justify-between rounded-lg items-center">
          <div className="h-24 flex flex-col justify-evenly ml-2 max-lg:w-11/12 max-lg:h-32">
            <h6 className="text-3xl text-semibold">All Periods</h6>
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
          <div className="items-center justify-evenly w-1/2  flex flex-col h-40 max-lg:w-11/12 ml-2 mb-2">
            <div
              className="w-full my-4 mx-auto flex justify-between rounded  border border-slate-700"
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
                placeholder="Search Shifts"
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </div>
          </div>
        </div>

        <div>
          <TableContainer className="w-3/4 mx-auto ">
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  <TableCell align="center">Cook ID</TableCell>
                  <TableCell align="center">Shift ID</TableCell>
                  <TableCell align="center">Shift Start Time</TableCell>
                  <TableCell align="center">Shift End Time</TableCell>
                  <TableCell align="center">Mpesa Number</TableCell>
                  <TableCell align="center"> Shift amount</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>

              {data
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search);
                })
                .map((row) => (
                  <TableBody>
                    <>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.cook_id}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.start_time}</TableCell>
                      <TableCell align="center">{row.end_time}</TableCell>
                      <TableCell align="center">{row.mpesa_number}</TableCell>
                      <TableCell align="center">
                        {row.estimated_revenue}
                      </TableCell>
                      <TableCell align="center">{row.shift_date}</TableCell>
                      <TableCell>
                        <Switch
                          value={checked}
                          defaultChecked={() => {
                            row.shift_status === 1
                              ? setChecked(true)
                              : setChecked(false);
                          }}
                          shape="pill"
                          size="sm"
                          variant="outline"
                        />
                      </TableCell>
                    </>

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
        
        </div>
      </div>
    </div>
  );
};

export default Shift;
