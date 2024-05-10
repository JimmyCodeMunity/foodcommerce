import { Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountPopover from "../../layouts/dashboard/common/account-popover";
import { FilterList } from "@mui/icons-material";
import { apiAdmin } from "../../Storage/ApiClient";

const Transactions = () => {
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState([])
  const [cooks,setCooks] = useState([])
  const [meals,setMeals] = useState([])


  //get total clients
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiAdmin
        .get('/clients')
        .then((response) => {
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

    //get total cooks
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        apiAdmin
          .get('/cooks')
          .then((response) => {
            setCooks(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      };
      fetchData();
    }, []);

      //get total meals
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiAdmin
        .get('/cook/meals')
        .then((response) => {
          setMeals(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between w-full h-20 items-center ">
        <div className="h-20 flex flex-col justify-evenly max-lg:ml-2">
          <h6 className="text-3xl ">Transactions</h6>
          <h6 className="text-slate-400" style={{fontSize:"14px"}}>Thurs 22, Oct</h6>
        </div>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterList style={{fontSize:"2rem"}} className=" text-slate-400" />
          <AccountPopover />
        </Stack>
      </div>

      <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1 mt-10">
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total cooks
            </Typography>
            <Typography variant="h5" component="div">
              {cooks?.length}
            </Typography>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total clients
            </Typography>

            <h6 className=" font-semibold text-2xl">
              {data?.length}<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Number of meals
            </Typography>
            <h6 className=" font-semibold text-2xl">
             {meals?.length}<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Number of deliveries
            </Typography>
            <h6 className=" font-semibold text-2xl">
              452<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total cost of meals
            </Typography>
            <h6 className=" font-semibold text-2xl">
              452<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total cost of deliveries
            </Typography>
            <h6 className=" font-semibold text-2xl">
              452<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
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
        <Card className="border border-slate-400 max-lg:ml-2 shadow-none">
          <CardContent className="text-center">
            <Typography
              variant="h6"
              sx={{ fontSize: 14 }}
              color="gray"
              gutterBottom
            >
              Total revenue of delivaries
            </Typography>
            <h6 className=" font-semibold text-2xl">
              452<span className="ml-2 text-red-500 text-sm">-4%</span>
            </h6>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
