import React, { useEffect, useState } from "react";
import { Switch, Modal } from "@mui/material";
import {
  Add,
  AddCircle,
  KeyboardArrowDown,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CooksMeals } from "../Reusable/CookData";
import { CooksNav } from "../Reusable/DriverNav";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";
const label = { inputProps: { "aria-label": "Switch demo" } };

const CookCreateMeals = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);
  const handleClose = () => setOpenModalId(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`cook/cook_meals/${Id}`)
        .then((response) => {
          setLoading(false);
          setData(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="h-full">
      <Modal
        open={openModalId}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" mt-56"
      >
        <div className="w-11/12 mx-auto bg-white h-64 rounded my-auto p-2 flex flex-col justify-evenly">
          <h6 className="text-slate-500 text-center text-lg font-semibold ">
            Deactivate Meal{" "}
          </h6>
          <h6 className="text-center">
            Are you sure you want to deactivate this meal from your list{" "}
          </h6>
          <div className="w-full flex justify-between">
            <button
              className=" w-1/2 mr-3 h-10 border-2 border-slate-500  text-slate-500 rounded"
              onClick={handleClose}
            >
              Back
            </button>
            <button className=" w-1/2 h-10 bg-red-500 text-white rounded">
              Deactivate
            </button>
          </div>
        </div>
      </Modal>
      <div className="max-lg:w-full max-lg:mx-auto w-3/4">
        <CooksMeals />
        <div className="flex w-11/12 justify-between mx-auto">
          <div className="border-b-2 border-black w-1/2">
            <h6 className="flex items-center justify-center ml-2">
              Meals <KeyboardArrowDown />
            </h6>
          </div>
          <div className=" w-1/2 ml-2">
            <Link to={`/cook/cookpackage/${Id}`}>
              <h6 className="flex items-center justify-center">
                Package <KeyboardArrowDown />
              </h6>
            </Link>
          </div>
        </div>
        <div className="w-11/12 h-4/5 mx-auto">
          {data?.map((item, index) => {
            return (
              <div
                className="flex justify-between items-center w-full h-24 mt-8 mx-auto"
                key={index}
              >
                <div className="flex">
                  <img
                    src={item.meals_images[0]?.image_url}
                    alt="lantern app"
                    className="w-14 h-16"
                    onClick={() => navigate(`/cook/viewmeal/${item.id}`)}
                  />
                  <div className="flex flex-col justify-evenly h-full ml-5">
                    <h6 className="font-semibold">
                      {item.meal_name} (Min {item.min_qty}:Max {item.max_qty})
                    </h6>
                    <h6 className="text-red-500">
                      {" "}
                      {
                        <NumberFormat
                          value={item?.meal_price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Ksh. "}
                        />
                      }
                    </h6>
                    <div className="flex w-full justify-between items-center">
                      <h6 className="flex items-center w-24 rounded-xl justify-between text-black">
                        <RemoveCircleOutline /> 14
                        <AddCircle />
                      </h6>
                    </div>
                  </div>
                </div>
                <Switch {...label} onClick={() => setOpenModalId(true)} />
              </div>
            );
          })}

          <div className="w-full h-12 rounded-md bg-lanternOrange text-white  mt-4">
            <Link
              to={`/cook/cookaddmeal/${Id}`}
              className="w-full h-full  text-white"
            >
              <button className="w-full h-full ">
                <Add />
                Create a meal
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <CooksNav />
      </div>
    </div>
  );
};

export default CookCreateMeals;
