import React, { useEffect, useState } from "react";

import {
  AccessTime,
  ChevronLeft,
  FavoriteBorder,
  Redeem,
  Restaurant,
  Star,
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import NumberFormat from "react-number-format";

const EditPackage = () => {
  const { Id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/cook/show-packages/${Id}`)
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
    <div className="h-full ">
      <div>
        <Link
          to={`/cook/cookcreatemeals/${Id}`}
          className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white text-left"
        >
          <h6 className="flex items-center">
            <ChevronLeft />
            Edit Package
          </h6>
        </Link>
      </div>
      <div>
        <div className="flex flex-col justify-evenly">
          <div>
            <div className="w-full mx-auto rounded h-44 bg-slate-400"></div>
            <div className="flex justify-between my-4 w-11/12 mx-auto">
              <div className="h-20 flex flex-col justify-evenly">
                <h6 className="font-[Lambency] font-semibold text-xl">
                  {data.package?.package_name}
                </h6>
                <h6>
                  <Star style={{ fontSize: "1rem" }} /> 4.3
                  <span>(320 Reviews)</span>
                </h6>
              </div>
              <div className="bg-green-500 text-white w-20 h-10 rounded-xl">
                <button className="bg-green-500 text-white w-20 h-full rounded-xl">
                  Get poster
                </button>
                <button className="border-2 mt-2 border-slate-500 text-slate-500 w-20 h-full rounded-xl">
                  Get poster
                </button>
              </div>
            </div>
            <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
              <h6 className="font-semibold">
                {" "}
                <NumberFormat
                  value={data.package?.total_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Ksh. "}
                />
              </h6>
              <h6 className=" text-slate-600">Min 1: Max 5</h6>
              <div className=" text-slate-600 flex items-center">
                <AccessTime />
                <h6>30min</h6>
              </div>
            </div>
            <div className="flex w-11/12 justify-between mx-auto h-10 items-center">
              <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                <Star style={{ fontSize: "1rem" }} />
                4.3
              </h6>
              <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                <img src={hat} alt="..." className="w-4 h-4" />
                4.3
              </h6>
              <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                <Redeem style={{ fontSize: "1rem" }} />
                4.3
              </h6>
              <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                <Restaurant style={{ fontSize: "1rem" }} />
                4.3
              </h6>
              <h6 className="font-semibold flex items-center text-slate-500 text-sm">
                <FavoriteBorder style={{ fontSize: "1rem" }} />
                4.3
              </h6>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto  flex flex-col justify-evenly overflow-auto">
          <h6>{data.package?.package_description}</h6>
        </div>
      </div>

      <div className="pb-2 items-center  flex justify-evenly w-full fixed bg-white bottom-0">
        <div className="w-2/3 text-lanternOrange">
          <h6 className="text-xl">Total</h6>
          <h6 className="font-bold text-2xl">
            <NumberFormat
              value={data.package?.total_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Ksh. "}
            />
          </h6>
        </div>
        <Link to={`/cook/editpackagedets/${Id}`}>
          <button className="bg-lanternOrange text-white rounded-lg w-28 h-10">
            Edit Package
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditPackage;
