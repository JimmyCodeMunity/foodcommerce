import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Search } from "@mui/icons-material";
import {  IconButton, InputBase, Paper } from "@mui/material";

import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import { ClientIdContext } from "../Helper/Context";

const AddLoc = () => {
  const { Id } = useParams();
  const navigate = useNavigate()
  const inputRef = useRef();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [address,setAddress] = useState("")
  const {clientId} = useContext(ClientIdContext)

  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places?.length === 0) {
      console.error("No place selected.");
      return;
    }
    const place = places[0];
    setAddress(place.name,place.formatted_address);
    setPosition({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  const saveAddress = async () => {
    setLoading(true)
    try {
      const locationName = `${position.lat}-${position.lng}`;
      const response = await apiClient.post('client/customer-addresses', {
        client_Id:clientId,
        location_name: locationName,
        address_name:address
      });
      setLoading(false)
      navigate(`/client/address/${Id}`)
      console.log(response.data); 
    } catch (error) {
      setLoading(false)
      console.error("Error saving address:", error);
      setError(error)
    }
  };

  return (
    <div className="h-full ">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <Paper
            component="form"
            className="w-11/12 justify-between my-1 mx-auto  border border-slate-700"
            sx={{
              p: "2px 4px",
              ml: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <Search />
            </IconButton>
            <InputBase
              placeholder="Enter Delivery Address"
              className=" w-11/12"
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
        </StandaloneSearchBox>
      </LoadScript>
      <div className=" h-4/5 relative w-full">
        <APIProvider apiKey={process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}>
          <div className="h-full">
            <Map
              zoom={16}
              center={position}
              mapId={process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}
            >
              <AdvancedMarker position={position}>
                <Pin background={"grey"} borderColor={"green"} />
              </AdvancedMarker>
            </Map>
          </div>
        </APIProvider>
      </div>
      <div className="w-2/3 my-3 mx-auto">
        <button className="bg-lanternOrange text-white rounded-lg w-full h-10" onClick={saveAddress}>
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddLoc;
