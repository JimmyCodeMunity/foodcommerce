import { Add, ChevronLeft, MoreVert, Star } from "@mui/icons-material";
import { Popover } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import { ClientIdContext } from "../Helper/Context";

const Address = () => {
  const { Id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { setLocId,clientId } = useContext(ClientIdContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdateAddressStatus = async (id) => {
    try {
      const response = await apiClient.put(
        `/update-cart-address/${id}`
      );
      if (response.data.status === "success") {
        fetchData();
      } else {
        console.error(
          "Failed to update address status: ",
          response.data.message
        );
      }
    } catch (error) {
      console.log("Error updating address status: ", error);
    }
  };

  const handleAddressClick = async (id) => {
    try {
      await handleUpdateAddressStatus(id);
      navigate(`/client/mealdets/${Id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("client/customer-address");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full">
      <Link
        to="/client/tocart"
        className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white "
      >
      <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
          Delivery Address
        </h6>
      </Link>
      <div className="flex justify-evenly flex-col">
        {data?.map((item, index) => {
          return (
            <div>
              {" "}
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="p-2 text-slate-400 w-20">
                  <Link to={`/client/manualloc/${item.id}`}>
                    <h6 className="border-b border-slate-800">Edit</h6>
                  </Link>

                  <h6 className="border-b border-slate-800">Delete</h6>
                </div>
              </Popover>
              <div className="flex h-20 w-11/12 justify-between my-2 items-center mx-auto">
                <div onClick={() => handleAddressClick(item.id)}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-black/10 rounded-full mr-5">
                      <Star />
                    </div>
                    <div className="flex w-11/12 justify-start flex-col">
                      <h6>{item.address_name}</h6>
                      <h6 className="text-slate-500">{item.location_name}</h6>
                    </div>
                  </div>
                </div>
                <MoreVert onClick={handleClick} />
              </div>
            </div>
          );
        })}
        <Link to={`/client/addloc/${Id}`}>
          <div className="flex h-20 w-11/12 justify-between my-2 items-center mx-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-black/10 rounded-full mr-5">
                <Add />
              </div>
              <div>
                <h6>Add Address</h6>
              </div>
            </div>

            <MoreVert />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Address;
