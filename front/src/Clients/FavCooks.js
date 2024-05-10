import {
  ChevronLeft,
  FavoriteBorder,
  LocationOnOutlined,
  Redeem,
  Restaurant,
  Star,
  Close,
} from "@mui/icons-material";
import hat from "../Media/tabler_chef-hat.png";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ClientNav } from "../Reusable/DriverNav";
import { Modal, Slider, useTheme } from "@mui/material";

const style = {
  position: "absolute",
  bottom: "-0",
  left: "50%",
  transform: "translate(-50%, 0%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
};
const FavCooks = () => {
  const {Id} = useParams()
  const theme = useTheme();

  const [rating, setRating] = React.useState(null);
  const handleRating = (event) => {
    setRating(event.currentTarget);
  };
  const handleClose = () => {
    setRating(null);
  };
  const Ratingopen = Boolean(rating);

  return (
    <div>
      <Modal open={Ratingopen} onClose={handleClose}>
        <div className="bg-white" style={style}>
          <div className="w-full h-fit  rounded-full text-right">
            <Close
              onClick={handleClose}
              style={{
                backgroundColor: "#0002",
                borderRadius: "100%",
                margin: "1rem",
              }}
            />
          </div>
          <h6 className="text-2xl ml-2">
           
            Cook Rating and Review
          </h6>
          <div className="bg-white flex h-44 w-11/12 mx-auto px-2 rounded">
            <div className=" flex my-3 flex-col justify-between h-28 items-start ">
              <h6 className="font-normal text-2xl">4.5</h6>
              <div>
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
                <Star style={{ color: "gold", fontSize: "1.5rem" }} />
              </div>
              <h6 className="text-lg">13,541</h6>
            </div>
            <div className="w-1/2 mx-auto h-full ">
              <div
                direction="row"
                alignItems="center"
                className="flex items-center h-8"
              >
                5.
                <Slider
                  defaultValue={100}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fa6f26" : "#000",
                  }}
                />
              </div>
              <div
                direction="row"
                alignItems="center"
                className="flex items-center h-8"
              >
                4.
                <Slider
                  defaultValue={80}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fa6f26" : "#000",
                  }}
                />
              </div>
              <div
                direction="row"
                alignItems="center"
                className="flex items-center h-8"
              >
                3.
                <Slider
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fa6f26" : "#000",
                  }}
                />
              </div>
              <div
                direction="row"
                alignItems="center"
                className="flex items-center h-8"
              >
                1.
                <Slider
                  defaultValue={40}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fa6f26" : "#000",
                  }}
                />
              </div>
              <div
                direction="row"
                alignItems="center"
                className="flex items-center h-8"
              >
                1.
                <Slider
                  defaultValue={20}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fa6f26" : "#000",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto my-3">
            <div className="flex w-1/3 items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-slate-600"></div>
              <h6>John doe</h6>
            </div>
            <div className="flex w-2/3 justify-between items-center my-1">
            <div className="flex items-center ">
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
              </div>
              <h6 className="text-slate-500">23/12/2022</h6>
            </div>
            <div>
              <h6 className="font-normal">Lorem ipsum dolor sit amet consectetur. Quisque et adipiscing quis massa condimentum metus felis arcu. Tortor faucibus sed accumsan erat aliquam imperdiet. Libero adipiscing massa at nisl.</h6>
            </div>
          </div>
          <div className="w-11/12 mx-auto my-3">
            <div className="flex w-1/3 items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-slate-600"></div>
              <h6>John doe</h6>
            </div>
            <div className="flex w-2/3 justify-between items-center my-1">
            <div className="flex items-center ">
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
                <Star style={{ color: "gold", fontSize: "1rem" }} />
              </div>
              <h6 className="text-slate-500">23/12/2022</h6>
            </div>
            <div>
              <h6 className="font-normal">Lorem ipsum dolor sit amet consectetur. Quisque et adipiscing quis massa condimentum metus felis arcu. Tortor faucibus sed accumsan erat aliquam imperdiet. Libero adipiscing massa at nisl.</h6>
            </div>
          </div>
        </div>
      </Modal>
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
        <Link to="/client/clientprofile" className="text-white">
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Favorites
          </h6>
        </Link>
      </div>

      <div className="flex w-11/12 justify-between mx-aut my-2">
        <div className="w-1/2">
          <Link to={`/client/favmeals/${Id}`}>
            <h6 className="flex items-center justify-center ml-2 font-[kalam]">
              Meals
            </h6>
          </Link>
        </div>
        <div className="border-b-2 border-black w-1/2 ml-2">
          <h6 className="flex items-center justify-center ml-2 font-[kalam]">
            Cooks
          </h6>
        </div>
      </div>
      <div>
        <div className="flex w-11/12 items-center mx-auto justify-between mt-3">
          <Link to={`/client/viewcook/${Id}`}>
            <div className="w-16 h-16 rounded-full bg-slate-500 mr-2"></div>
          </Link>

          <div className="h-18 flex flex-col justify-evenly w-3/4">
            <h6>Kitchen Name</h6>
            <h6 className="flex items-center w-fit  justify-between">
              <div className="w-5 h-5 rounded-full bg-green-500 mr-2"></div>
              Active
            </h6>
            <h6 className="flex items-center w-fit justify-between">
              <LocationOnOutlined style={{ marginRight: "0.5rem" }} />
              Location
            </h6>
            <div className="flex w-11/12 justify-between h-10 items-center">
              <h6
                className="font-semibold flex items-center text-slate-500 text-sm"
                onClick={handleRating}
              >
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
          <FavoriteBorder />
        </div>
      </div>
      <div className=" max-lg:flex hidden pb-6 w-full fixed bg-white bottom-0">
        <ClientNav />
      </div>
    </div>
  );
};
export default FavCooks;
