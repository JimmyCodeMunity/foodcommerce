import React, { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import food from "../Media/Ellipse 2.png";
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
import { CookIdContext } from "../Helper/Context";
import NumberFormat from "react-number-format";
const label = { inputProps: { "aria-label": "Switch demo" } };
const CookPackage = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { setCookId } = useContext(CookIdContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/cook/packages`)
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
    <div>
      <div className="max-lg:w-full max-lg:mx-auto w-3/4">
        <CooksMeals />
        <div className="flex w-11/12 justify-between mx-auto">
          <div className="w-1/2">
            <Link to={`/cook/cookcreatemeals/${Id}`}>
              <h6 className="flex items-center justify-center ml-2">
                Meals <KeyboardArrowDown />
              </h6>
            </Link>
          </div>
          <div className="border-b-2 border-black w-1/2">
            <h6 className="flex items-center justify-center">
              Package <KeyboardArrowDown />
            </h6>
          </div>
        </div>
        <div className="w-11/12 h-4/5 mx-auto">
          {data?.map((item, index) => {
            return (
              <div className="flex justify-between items-center w-full h-24 mt-8 mx-auto">
                <div className="flex">
                  <Link to={`/cook/editpackage/${item.id}`}>
                    <img src={food} alt="lantern app" className="w-18 h-18" />
                  </Link>

                  <div className="flex flex-col justify-evenly h-full ml-5">
                    <h6 className="font-semibold">
                      {item.package_name}(Min 12:Max 24)
                    </h6>
                    <h6 className="text-red-500">
                      {" "}
                      <NumberFormat
                        value={item.total_price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh. "}
                      />
                    </h6>
                   
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-full h-12 rounded-md bg-lanternOrange text-white  mt-4">
            <Link
              to={`/cook/createpackage/${Id}`}
              className="w-full h-full  text-white"
            >
              <button className="w-full h-full ">
                <Add />
                Create package
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

export default CookPackage;
