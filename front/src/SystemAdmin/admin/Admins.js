import {
  IconButton,
  InputBase,
  Stack,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TableNoData from "../../sections/user/table-no-data";
import Table from "@mui/material/Table";
import Search from "@mui/icons-material/Search";
import { CalendarIcon } from "@mui/x-date-pickers";
import AccountPopover from "../../layouts/dashboard/common/account-popover";
import { FilterList } from "@mui/icons-material";
import { apiAdmin } from "../../Storage/ApiClient";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Admins = () => {
  const [page,setPage] = useState(0);
  const [data, setData] = useState([]);
  const [filterName] = useState("");
  const [rowsPerPage,setRowsPerPage] = useState(5);
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");



  const notFound = !search?.length && !!filterName;

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




  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="h-full ">
      <div className="flex justify-between w-full h-20 items-center">
        <div className="h-24 flex flex-col justify-evenly max-lg:ml-2">
          <h6 className="text-3xl ">Admin</h6>
        </div>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterList style={{fontSize:"2rem"}} className=" text-slate-400" />
          <AccountPopover />
        </Stack>
      </div>
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
              onChange={(e)=>setSearch(e.target.value)}
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
              onChange={(e)=>setSearch(e.target.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </div>
        </div>

      <div>
        <TableContainer className="w-3/4 mx-auto ">
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow className="border-b-2 border-slate-900">
                <TableCell>Admin ID</TableCell>
                <TableCell align="left">Names</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            {data?.filter((item)=>{return search.toLowerCase()===""?item:item.name.toLowerCase().includes(search)}).map((row) => (
              <TableBody>
                <>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell>
                    <Switch
                      value={checked}
                      defaultChecked={() => {
                        row.is_active === 1
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
  );
};

export default Admins;
