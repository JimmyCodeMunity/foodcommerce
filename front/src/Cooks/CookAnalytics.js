import { FilterList, Search } from "@mui/icons-material";
import React, { useState } from "react";
import sort from "../Media/iconoir_sort.png";
import {
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import AppCurrentVisits from "../sections/overview/app-current-visits";
import AppWebsiteVisits from "../sections/overview/app-website-visits";
import { CooksNav } from "../Reusable/DriverNav";
import UserTableHead from "../sections/user/user-table-head";
import { ApproverCookRow } from "../sections/user/user-table-row";
import TableEmptyRows from "../sections/user/table-empty-rows";
import TableNoData from "../sections/user/table-no-data";
import { users } from "../_mock/user";
import { applyFilter, emptyRows, getComparator } from "../sections/user/utils";


const CookAnalytics = () => {
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
      const newSelecteds = users?.map((n) => n.name);
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
  return (
    <div className="  ">
      <div className="font-sans w-11/12 mx-auto">
        <div>
          <h6 className=" text-2xl font-semibold capitalize ml-2">
            Your Financial Analytics
          </h6>
          <h6 className="font-sans ml-2">Sat, 21 Oct 2023</h6>
        </div>
        <div className="flex items-center justify-evenly w-full mx-auto  ml-4 ">
              <div
                className="w-11/12 flex rounded justify-between my-3 border border-slate-500 mx-auto"
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
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </div>
              <div className="flex w-1/3 justify-evenly">
                <img
                  src={sort}
                  alt="lantern sort"
                  style={{ marginLeft: 2 }}
                />
                <FilterList  style={{ marginLeft: 2 }} />
              </div>
            </div>

        <div className="my-4 bg-white">
        <TableContainer>
          <Table sx={{ minWidth: 1000 }}>
            <UserTableHead
            style={{backgroundColor:"red"}}
              order={order}
              orderBy={orderBy}
              rowCount={users?.length}
              numSelected={selected?.length}
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
                emptyRows={emptyRows(page, rowsPerPage, users?.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        <div xs={12} md={6} lg={4} className="my-4">
          <AppCurrentVisits   
            chart={{
              series: [
                { label: "Express", value: 4344 },
                { label: "Express RTE", value: 5435 },
                { label: "Express RTC", value: 1443 },
                { label: "Booked", value: 4453 },
                { label: "Booked RTE", value: 4449 },
                { label: "Booked RTC", value: 4443 },
              ],
            }}
          />
        </div>
        
        <div xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            chart={{
              labels: [
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ],
              series: [
                {
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </div>
      </div>
      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default CookAnalytics;
