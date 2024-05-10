import { ChevronLeft } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const ManualLoc = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [locationNames, setLocationNames] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`client/customer-address/${Id}`);
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places?.length === 0) {
      console.error("No place selected.");
      return;
    }
    const place = places[0];
    setAddress(place.formatted_address, place.name);
    setPosition({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  useEffect(() => {
    if (Id) {
      getSingleGroup(Id);
    } else {
      setLocationNames("");
    }
  }, [Id]);

const getSingleGroup = async (id) => {
  try {
    const singleGroup = await apiClient.get(`client/customer-address/${id}`);
    setLocationNames(singleGroup.data.data.location_name);
  } catch (error) {
    console.error(error);
  }
};

  const handleEditGroup = async (e) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`client/customer-address/${Id}`, {
        location_name: locationNames,
        customer_address: address,
      });
      navigate(`/client/address/${data.client_id}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to update the details. Please try again.");
    }
  };

  return (
    <div className="h-full">
      <div className="h-14 flex font-sans no-underline items-center w-full bg-lanternOrange text-white ">
        <Link to={`/client/address/${data.client_id}`} className="text-white">
        <h6 className="flex items-center ml-1 text-lg">
          <ChevronLeft style={{fontSize:"2.5rem",marginRight:"0.8rem"}}/>
            Add Place
          </h6>
        </Link>
      </div>
      <div>
        <div className="w-11/12 mx-auto mt-3">
          <h6 className="text-xl">{data.address_name}</h6>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}
            libraries={["places"]}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              value={locationNames}
              onPlacesChanged={handlePlaceChanged}
            >
              <TextField
                margin="normal"
                id="filled-basic"
                label="street"
                variant="outlined"
                className="w-full"
              />
            </StandaloneSearchBox>
          </LoadScript>
        </div>
      </div>
      <div className="w-11/12 mx-auto h-12 rounded-xl bg-lanternOrange text-white">
        <button className="w-full h-full" onClick={handleEditGroup}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ManualLoc;
