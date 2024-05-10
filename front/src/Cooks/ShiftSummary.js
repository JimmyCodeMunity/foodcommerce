import {
  CardContent,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Search } from "@mui/icons-material";
import { CooksNav } from "../Reusable/DriverNav";
import { Link, useParams } from "react-router-dom";
import UserTableHead from "../sections/user/user-table-head";
import TableEmptyRows from "../sections/user/table-empty-rows";
import TableNoData from "../sections/user/table-no-data";
import { users } from "../_mock/user";
import { applyFilter, emptyRows, getComparator } from "../sections/user/utils";
import { UserTableRow } from "../sections/user/user-table-row";
import { CalendarIcon } from "@mui/x-date-pickers";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const ShiftSummary = () => {
  const { Id } = useParams();
  const [page] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [data, setData] = useState([]);
  const [filterName] = useState("");
  const [rowsPerPage] = useState(5);

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      apiClient
        .get(`/cook/shift-edit/${Id}`)
        .then((response) => {
          setData("shift", response.data.data[0]);
          console.log("shift", response.data.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;
  return (
    <div className="h-full ">
      <Link
        to={`/cook/shiftinfo/${Id}`}
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Shift Summary
        </h6>
      </Link>
      <div className="grid grid-cols-2 gap-3 mt-2 ">
        <div className="border border-slate-400 max-lg:ml-2 bg-lanternOrange/30 rounded-md">
          <CardContent className="text-center">
            <h6 className="text-2xl">
              {" "}
              <NumberFormat
                value={data.estimated_revenue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Ksh. "}
              />
            </h6>
            <h6 className="text-slate-500">Target Amount</h6>
          </CardContent>
        </div>
        <div className="border border-slate-400 max-lg:ml-2 bg-lanternOrange/30 rounded-md">
          <CardContent className="text-center">
            <h6 className="text-2xl">KES 25,000</h6>
            <h6 className="text-slate-500"> Total Earnings</h6>
          </CardContent>
        </div>
        <div className="border border-slate-400 max-lg:ml-2 bg-lanternOrange/30 rounded-md">
          <CardContent className="text-center">
            <h6 className="text-2xl">15</h6>
            <h6 className="text-slate-500">No of meals sold</h6>
          </CardContent>
        </div>
        <div className="border border-slate-400 max-lg:ml-2 bg-lanternOrange/30 rounded-md">
          <CardContent className="text-center">
            <h6 className="text-2xl">5</h6>
            <h6 className="text-slate-500">No of packages sold</h6>
          </CardContent>
        </div>
      </div>

      <Paper
        component="form"
        className="w-11/12 my-4 mx-auto  border border-slate-700"
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
              { id: "company", label: "Date" },
              { id: "role", label: "Amount" },
              { id: "", label: "Action" },
            ]}
          />
          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <UserTableRow
                  key={row.id}
                  name={row.company}
                  role={row.role}
                  company={row.company}
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
      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default ShiftSummary;
