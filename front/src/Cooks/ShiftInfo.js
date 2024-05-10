import {
  CardContent,
  IconButton,
  InputBase,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Search } from "@mui/icons-material";
import { CooksNav } from "../Reusable/DriverNav";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";

const ShiftInfo = () => {
  const [checked, setChecked] = useState(false);
  const Shift_id = useSelector((state)=>state.shiftId.value)
  const [meals, setMeal] = useState([]);
  const [shift, setShift] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      apiClient
        .get(`/cook/shift-edit/${Shift_id[0]}`)
        .then((response) => {
          setShift(response.data.data[0]);
          setMeal(response.data.data[1]);
          setLoading(false);
          console.log("shift", response.data.data[0]);
          console.log("meal", response.data.data[1]);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    fetchData();
  }, []);



  return (
    <div className="h-full ">
      <Link
        to={`/cook/shiftsummary/${Shift_id[0]}`}
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
      >
         <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Shift Info
        </h6>
      </Link>
      <div className="grid grid-cols-2 gap-3 mt-2 ">
        <div className="border border-slate-400 max-lg:ml-2 bg-lanternOrange/30 rounded-md">
          <CardContent className="text-center">
            <h6 className="text-2xl">
              {" "}
              <NumberFormat
                value={shift.estimated_revenue}
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
        <InputBase
          placeholder="Search by Meals"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>

      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Shift Id</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

            <TableBody >
              <>
                <TableCell align="center">{shift.id}</TableCell>
                <TableCell align="center">{shift.updated_at}</TableCell>
                <TableCell align="center">{shift.estimated_revenue}</TableCell>
                <TableCell align="center">{shift.meal_price}</TableCell>
                <TableCell>
                  <Switch
                    value={checked}
                    defaultChecked={() => {
                      shift.shift_id != null
                        ? setChecked(true)
                        : setChecked(false);
                    }}
                    shape="pill"
                    size="sm"
                    variant="outline"
                  />
                </TableCell>
              </>
            </TableBody>
        </Table>
      </TableContainer>

      <div className="pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default ShiftInfo;
