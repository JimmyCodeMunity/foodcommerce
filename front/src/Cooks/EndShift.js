import React, { useContext, useEffect, useState } from "react";
import { AccessTime, KeyboardArrowDown } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Backdrop,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Switch,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table, TableBody, TableContainer } from "@mui/material";
import UserTableHead from "../sections/user/user-table-head";
import TableEmptyRows from "../sections/user/table-empty-rows";
import TableNoData from "../sections/user/table-no-data";
import { users } from "../_mock/user";
import { applyFilter, emptyRows, getComparator } from "../sections/user/utils";
import { UserTableRow } from "../sections/user/user-table-row";
import { useSelector } from "react-redux";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
import { CookIdContext } from "../Helper/Context";

const label = { inputProps: { "aria-label": "Switch demo" } };

const EndShift = () => {
  const { Id } = useParams();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName] = useState("");
  const [shift, setShift] = useState([]);
  const [meal, setMeal] = useState([]);
  const navigate = useNavigate();
  const Shift_id = useSelector((state) => state.shiftId.value);
  const cookId = useContext(CookIdContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [target, setTarget] = useState(0);
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState([]);

  const incrementTarget = () => {
    setTarget(target + 1);
  };

  const decrementTarget = () => {
    if (target > 0) {
      setTarget(target - 1);
    }
  };

  const handleMealSelection = (meal) => {
    const updatedSelectedMeals = [...selectedMeals, { meal_id: meal.id }];
    setSelectedMeals(updatedSelectedMeals);
    setTotalMealPrice(totalMealPrice + meal.meal_price * target);
  };

  useEffect(() => {
    setFormValues((prevState) => ({
      ...prevState,
      estimated_revenue: totalMealPrice,
    }));
  }, [totalMealPrice]);

  const initialState = {
    cook_id: shift.cook_id,
    estimated_revenue: totalMealPrice,
    start_time: "",
    end_time: "",
    shift_date: shift.shift_date,
  };
  const [formValue, setFormValues] = useState(initialState);

  console.log(selectedMeals);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      apiClient
        .get(`/cook/shift-edit/${Id}`)
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

  useEffect(() => {
    if (Id) {
      getSingleShift(Id);
    } else {
      setFormValues({ ...initialState });
    }
  }, [Id]);

  const getSingleShift = async (id) => {
    const singleShift = await apiClient.get(`/cook/shift-edit/${Id}`);
    setFormValues({ ...singleShift.data.data[0] });
  };

  const handleEditShift = async (e) => {
    try {
      setLoading(true);
      const response = await apiClient.put(
        `/cook/shift-update/${Id}`,
        formValue
      );
      setMessage("Details updated successfully");
      setLoading(false);
      navigate(`/cook/startshift/${cookId}`);
    } catch (error) {
      console.error(error);
      setError("Failed to update the details. Please try again.");
    }
  };

  const handleCloseShift = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.put(
        `/cook/shift-end/${Id}`,
        {
          shift_status: "",
        }
      );
      if (response.data.status === "success") {
        setLoading(false);
        setMessage("Shift ended successfully");
        navigate(`/cook/startshift/${cookId.cookId}`);
      } else {
        setLoading(false);
        setError(response.data.message);
        return false;
      }
    } catch (error) {
      setLoading(false)
      setError("Error: ", error.message);
      return false; // or handle the error differently
    }
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;

  return (
    <div className="h-full ">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative  w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-1/2 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div>
        <div className="h-14 flex font-sans no-underline items-center w-full bg-white text-black ">
          <h6 className="flex items-center text-xl ml-4">Shift Period</h6>
        </div>
        <div className="max-lg:flex w-full justify-between hidden">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              marginY: "1rem",
            }}
            className="w-2/5 mx-auto mr-2 border border-slate-700 "
          >
            <AccessTime />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ "aria-label": "search google maps" }}
              value={formValue.start_time}
              onChange={(e) =>
                setFormValues({ ...formValue, start_time: e.target.value })
              }
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <KeyboardArrowDown />
            </IconButton>
          </Paper>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              marginY: "1rem",
            }}
            className="w-2/5 mx-auto border border-slate-700"
          >
            <AccessTime />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={formValue.end_time}
              onChange={(e) =>
                setFormValues({ ...formValue, end_time: e.target.value })
              }
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <KeyboardArrowDown />
            </IconButton>
          </Paper>
        </div>
      </div>

      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Target Serve</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          {meal?.map((row, index) => (
            <TableBody key={index}>
              <>
                <TableCell align="center">{row.meal_name}</TableCell>
                <TableCell align="center">{row.max_qty}</TableCell>
                <TableCell align="center">{row.min_qty}</TableCell>
                <TableCell align="center">{row.meal_price}</TableCell>
                <TableCell>
                  <Switch
                    value={checked}
                    defaultChecked={() => {
                      row.shift_id != null
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
      <div className="mt-2 w-11/12 h-20 flex flex-col justify-evenly mx-auto bg-white bottom-0">
        <div className="flex justify-between">
          <h6 className="text-slate-500">Shift Target</h6>
          <h6 className=" font-semibold">
            {" "}
            <NumberFormat
              value={formValue.estimated_revenue}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Ksh. "}
            />
          </h6>
        </div>

        <div className="flex justify-between">
          <h6 className="text-slate-500">total Earnings</h6>
          <h6 className=" font-semibold">KES 30,000.00</h6>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-5 flex">
        <Link
          to={`/cook/editshift/${Id}`}
          className="w-1/2 h-14 rounded border-2 border-slate-500 text-slate-500"
        >
          <button className="w-full h-14 rounded  text-slate-500">
            Edit Shift
          </button>
        </Link>
        <button
          className="w-1/2 ml-2 h-14 rounded bg-red-500 text-white"
          onClick={handleCloseShift}
        >
          End Shift
        </button>
      </div>
    </div>
  );
};
export default EndShift;
