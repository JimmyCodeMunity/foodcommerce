import React, { useContext, useEffect, useState } from "react";
import logo from "../Media/Group 5489.png";
import check from "../Media/mdi_success-circle.png";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../Storage/ApiClient";
import { ClientIdContext, CookIdContext, EmailContext } from "../Helper/Context";

const Submitted = () => {
  const { Id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const {setCookId} = useContext(CookIdContext)
  const {clientId} = useContext(ClientIdContext)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiClient
        .get(`/cook/profile/${Id}`)
        .then((response) => {
          setLoading(false);
          setCookId(response.data.data.id)
          if (response.data.data.status === 2) {
            navigate(`/cook/home/${Id}`);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  
  return (
    <div className="  relative">
      <div className="right-0  fixed max-lg:w-1/2 w-1/5  ">
        <img src={logo} alt="lantern food app" className="w-full" />
      </div>
      <div className="max-lg:w-11/12 w-1/2 max-lg:left-5 left-1/4 absolute mx-auto  flex items-center flex-col top-44  max-lg:h-4/5">
        <img src={check} alt="lantern app" className="w-44 h-44 mx-auto" />
        <h6 className="font-[Lambency] text-4xl text-center mt-5 text-lanternOrange">
          Application Submitted
        </h6>
        <h6 className="text-base text-center w-11/12 mx-auto mt-3">
          Your application has been well recieved. Kindly sit tight awaiting our
          review
        </h6>

        <div className="w-11/12 mx-auto flex flex-col justify-center mt-3">
          <h6 className=" text-center font-[Lambency]  text-4xl">Contact</h6>
          <div className="text-center">
            <ul>
              <li>1. 254356788435</li>
              <li>2. cooking@lantern-foods.com</li>
              <li>3. 254356788435</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submitted;
