import {
  Card,
  CardContent,
  IconButton,
  InputBase,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { users } from "../_mock/user";
import Table from "@mui/material/Table";
import TableEmptyRows from "../sections/user/table-empty-rows";
import { emptyRows, applyFilter, getComparator } from "../sections/user/utils";
import TableNoData from "../sections/user/table-no-data";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import ApproverPopover from "../layouts/dashboard/common/approver-popover";
import { apiAdmin } from "../Storage/ApiClient";
import { useNavigate } from "react-router-dom";

const ApproverMeal = () => {
  const [page] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterName] = useState("");
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cooksResponse, otherDataResponse] = await Promise.all([
          apiAdmin.get("/cooks"),
          apiAdmin.get("/cook/meals"),
        ]);

        const mergedData = [
          ...cooksResponse.data.data,
          ...otherDataResponse.data.data,
        ];

        setData(mergedData);
        console.log(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data?.filter(item => item.status === 1);
const approved = filteredData.length;

  return (
    <div>
      <div className="h-fit mb-4  w-full  max-lg:ml-2 flex justify-between  bg-lanternOrange/30 p-2 max-lg:flex-col">
        <h6
          className="text-3xl 
          text-lanternOrange"
        >
          Meals
        </h6>
        <div className="w-1/2 flex justify-between items-center max-lg:w-full">
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
            <Typography variant="h6" component="div">
              {data.length}
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

            <h6 className=" font-semibold text-xl">
              {approved}<span className="text-red-500 text-sm">-4%</span>
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
            <h6 className=" font-semibold text-xl">
              KES 28,500.00{" "}
              <span className="text-red-500 text-sm ml-2">-4%</span>
            </h6>
          </CardContent>
        </Card>
      </div>
      <div className=" h-[35rem] mt-10">
      <div className="flex max-lg:flex-col h-fit justify-between rounded-lg">
              <div className="h-24 flex flex-col justify-evenly ml-2  ">
                <h6 className="text-2xl text-semibold">List of all Accounts</h6>
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
        <TableContainer className="w-3/4 mx-auto ">
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Account no.</TableCell>
                <TableCell align="center">Account Type</TableCell>
                <TableCell align="center">Names</TableCell>
                <TableCell align="center">Kitchen Name</TableCell>
                <TableCell align="center">Mobile Number</TableCell>
                <TableCell align="center">Last Updated</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>{" "}
            {data?.map((row) => (
              <TableBody>
                <>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">Cook Account</TableCell>
                  <TableCell align="center">{row.kitchen_name}{row.meal_name}</TableCell>
                  <TableCell align="center">{row.kitchen_name}</TableCell>
                  <TableCell align="center">{row.mpesa_number}</TableCell>
                  <TableCell align="center">{row.updated_at}</TableCell>
                  <TableCell>
                    {row.status===0?<button
                      className="w-24 h-8 rounded-xl text-white bg-lanternOrange"
                      onClick={() =>{row.meal_name ?navigate(`/ameals/${row.id}`): navigate(`/acooks/${row.id}`)}}
                    >
                      Approve
                    </button>:<button
                      className="w-24 h-8 rounded-xl text-white bg-green-500"
                      onClick={() =>{row.meal_name ?navigate(`/ameals/${row.id}`): navigate(`/acooks/${row.id}`)}}
                    >
                      Approved
                    </button>}
                  </TableCell>
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
    </div>
  );
};

export default ApproverMeal;
