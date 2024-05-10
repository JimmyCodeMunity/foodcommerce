import { ChevronLeft, FilterList } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon } from "@mui/x-date-pickers";
import { CCard, CCardBody, CCardSubtitle, CCardTitle } from "@coreui/react";
import { LineChart } from "@mui/x-charts/LineChart";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserTableHead from "../sections/user/user-table-head";
import { UserTableRow } from "../sections/user/user-table-row";
import TableEmptyRows from "../sections/user/table-empty-rows";
import TableNoData from "../sections/user/table-no-data";
import { users } from "../_mock/user";
import { applyFilter, emptyRows, getComparator } from "../sections/user/utils";
import { apiRider } from "../Storage/ApiClient";
const sample = [1, 10, 30, 50, 70, 90, 100];

const DriverAnalytics = () => {
  const [page] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      apiRider
        .get("driver/analytics")
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="  ">
      <Link
        to="/driver/profile"
        className="h-14 flex font-sans items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Analytics
        </h6>
      </Link>
      <div className=" w-11/12 mx-auto">
        <div className="h-20 flex flex-col justify-between">
          <h6 className=" text-3xl mt-2 font-semibold capitalize ml-2 font-[Lambency]">
            Your Financial Analytics
          </h6>
          <h6 className="font-sans ml-2">Sat, 21 Oct 2023</h6>
        </div>
        <Paper
          component="form"
          className="w-full my-4 mx-auto  border border-slate-700"
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
            sx={{ ml: 1, flex: 1 }}
            placeholder="01-10-2001 - 20-01-2002"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className="flex justify-between mb-4 w-full">
          <CCard
            className="w-1/2"
            style={{
              backgroundColor: "rgba(250, 111, 38, 0.20)",
            }}
          >
            <CCardBody>
              <CCardTitle style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                {data.total_deliveries}
              </CCardTitle>
              <CCardSubtitle className="mb-2 text-base text-medium-emphasis text-gray-300/75">
                Number of deliveries
              </CCardSubtitle>
            </CCardBody>
          </CCard>
          <CCard
            className="w-1/2 ml-2"
            style={{
              backgroundColor: "rgba(250, 111, 38, 0.20)",
            }}
          >
            <CCardBody>
              <CCardTitle style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                {data.delivery_timeline?.length}
              </CCardTitle>
              <CCardSubtitle className="mb-2 text-base text-medium-emphasis text-gray-300/75">
                Timeless
              </CCardSubtitle>
            </CCardBody>
          </CCard>
        </div>
        <div>
          <TableContainer className="w-3/4 mx-auto ">
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>TID</TableCell>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Timeliness</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>{" "}
              {data.delivery_timeline?.map((row) => (
                <TableBody>
                  <>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                      {row.order_id}
                      {row.meal_name}
                    </TableCell>
                    <TableCell align="center">{row.timeliness}</TableCell>
                    <TableCell align="center">{row.updated_at}</TableCell>
                  </>

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </div>
        <Paper
          component="form"
          className="w-full my-4 mx-auto mt-2 border border-slate-700"
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
            sx={{ ml: 1, flex: 1 }}
            placeholder="01-10-2001 - 20-01-2002"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <FilterList />
          </IconButton>
        </Paper>
        <div className="mx-auto w-full">
          <LineChart
            xAxis={[{ data: sample }]}
            yAxis={[{ id: "logAxis", scaleType: "log" }]}
            series={[{ yAxisKey: "logAxis", data: sample, label: "log" }]}
            rightAxis="logAxis"
            height={400}
            sx={{ w: 200 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverAnalytics;
