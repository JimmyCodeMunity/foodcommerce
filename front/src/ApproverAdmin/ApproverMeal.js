import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Backdrop, CircularProgress, Divider, FormControl, Input, InputLabel, Modal } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { apiAdmin } from "../Storage/ApiClient";
import { AdminIdContext, AuthContext, EmailContext } from "../Helper/Context";

const ApproverMeal = () => {
  const { Id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  const { email } = useContext(EmailContext);
  console.log(email);
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejection_reason, setRejectionReason] = useState("");
  const {adminId,setAdminId} = useContext(AdminIdContext)

  const handleApproval = async () => {
    try {
      setApprovalStatus(true)
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleRejection = async () => {
    try {
      setApprovalStatus(false)
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiAdmin
        .get(`/edit-approve-meal/${Id}`)
        .then((response) => {
          setData(response.data.data[1]);
          setInfo(response.data.data[0]);
          console.log("Data", response.data.data[1]);
          console.log("Info", response.data.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const updateApproval = async (approvalData) => {
    setLoading(true)
    try {
      const response = await apiAdmin.put(`/update-approve-meal/${Id}`, approvalData);
      setLoading(false)
      navigate(`/aprprover/${adminId}`)
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const approveAll = async () => {
    updateApproval({ status: '1' });
  };

  const rejectAll = async () => {
    if (!rejection_reason) {
      setError('Rejection reason is required');
      return;
    }
    updateApproval({ status: '2', rejection_reason: rejection_reason });
  };
  return (
    <div>
           {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="h-fit mb-4  w-full  max-lg:ml-2 flex justify-between  bg-lanternOrange/30 p-2">
        <h6
          className="text-3xl 
          text-lanternOrange"
        >
          Meal Review
        </h6>
       =
         {info.status === 2 ? (
          <button className="border-2 border-red-600  text-red-600 font-semibold  w-44 h-10 px-2 rounded">
            Suspend Meal
          </button>
        ) : info.status === 0 ? (
          <div className="w-1/4 max-lg:w-2/3 justify-between flex items-center">
            <div></div>
            <button
              className="bg-red-500 text-white w-32 mr-2 h-10 px-2 rounded"
              onClick={handleOpen}
            >
              Reject Meal
            </button>

            <button
              className=" bg-green-500 text-white  w-32 ml-2 h-10 px-2  rounded"
              onClick={approveAll}
            >
              Approve Meal
            </button>
          </div>
        ) : (
          <button className="bg-green-500 text-white w-44 h-10 px-2 rounded">
            Meal Approved
          </button>
        )}
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            className="w-[30rem]  h-44 mx-auto"
          >
            <div className="flex flex-col w-[32rem] h-[32rem] bg-white my-2 mx-auto  p-4 justify-evenly rounded ">
              <div className=" text-center w-full">
                <h6 className="text-center capitalize text-red-500">
                  Reject Meal
                </h6>
                <h6 className="text-center text-slate-500">
                  Give a reason why you are rejecting the meal
                </h6>
              </div>

              <textarea
                maxRows={4}
                id="outlined-basic"
                placeholder="reason"
                variant="outlined"
                className="mb-2 h-1/2 border border-black"
                value={rejection_reason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <button
                onClick={rejectAll}
                className="bg-red-500 text-white w-fit h-14 px-2 rounded"
              >
                Reject Profile
              </button>
            </div>
          </Modal>
        )}
     
      </div>
      <div className="flex flex-col h-20 justify-evenly ml-2">
        <h6 className="font-semibold text-3xl">{info.meal_name}</h6>
        <h6>Kitchen Name</h6>
      </div>
      <div className="w-full">
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="w-full">
              <h6>Meal details</h6>
              <div className="flex items-center">
                <Divider className="w-1/2 bg-red-900 h-1 " />
                <ExpandMoreIcon />
                <Divider className="w-1/2 bg-red-900 h-1" />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="ml-2 flex justify-between flex-col">
              <div className="flex justify-between">
                <div className="w-44 h-44 rounded max-lg:mx-auto">
                  <img src={data?.image_url} alt="..."/>
                </div>
                <div className="w-1/2 h-72 justify-between  flex flex-col max-lg:w-2/3 max-lg:mx-auto max-lg:mt-5">
                  <div variant="standard">
                    <h6 className="text-slate-500">Kitchen Name</h6>
                    <div className="flex mt-1 w-full justify-between">
                      <h6>{info.meal_name}</h6>

                      {approvalStatus === true ? (
                        <div>
                          <button className="w-20 h-10 bg-green-500 text-white rounded">
                            Approved
                          </button>
                        </div>
                      ) : approvalStatus === false ? (
                        <button className="w-20 h-10 bg-red-500 text-white rounded">
                          Rejected
                        </button>
                      ) : (
                        <div className="flex w-20 justify-between items-center">
                          <div
                            className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                            onClick={() =>
                              handleRejection("kitchen_name_approved")
                            }
                          >
                            <Close />
                          </div>
                          <div
                            className="w-8 h-8 rounded text-green-600 border border-green-600"
                            onClick={() =>
                              handleApproval("kitchen_name_approved")
                            }
                          >
                            <Check />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div variant="standard">
                    <h6 className="text-slate-500">Meal Name</h6>
                    <div className="flex mt-1 w-full justify-between">
                      <h6>{info.meal_name}</h6>

                      {approvalStatus === true ? (
                        <div>
                          <button className="w-20 h-10 bg-green-500 text-white rounded">
                            Approved
                          </button>
                        </div>
                      ) : approvalStatus === false ? (
                        <button className="w-20 h-10 bg-red-500 text-white rounded">
                          Rejected
                        </button>
                      ) : (
                        <div className="flex w-20 justify-between items-center">
                          <div
                            className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                            onClick={() => handleRejection("")}
                          >
                            <Close />
                          </div>
                          <div
                            className="w-8 h-8 rounded text-green-600 border border-green-600"
                            onClick={() =>
                              handleApproval("kitchen_name_approved")
                            }
                          >
                            <Check />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div variant="standard">
                    <h6 className="text-slate-500">Meal Type</h6>
                    <div className="flex mt-1 w-full justify-between">
                      <h6>{info.meal_type}</h6>

                      {approvalStatus === true ? (
                        <div>
                          <button className="w-20 h-10 bg-green-500 text-white rounded">
                            Approved
                          </button>
                        </div>
                      ) : approvalStatus === false ? (
                        <button className="w-20 h-10 bg-red-500 text-white rounded">
                          Rejected
                        </button>
                      ) : (
                        <div className="flex w-20 justify-between items-center">
                          <div
                            className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                            onClick={() =>
                              handleRejection("kitchen_name_approved")
                            }
                          >
                            <Close />
                          </div>
                          <div
                            className="w-8 h-8 rounded text-green-600 border border-green-600"
                            onClick={() =>
                              handleApproval("kitchen_name_approved")
                            }
                          >
                            <Check />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full  my-10 justify-between  flex flex-col max-lg:mx-auto max-lg:mt-5">
                <div variant="standard">
                  <h6 className="text-slate-500">Meal Description</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6>{info.meal_desc}</h6>

                    {approvalStatus=== true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus=== false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between items-center">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("kitchen_name_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("kitchen_name_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Ingredients</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6>{info.ingredients}</h6>

                    {approvalStatus === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between items-center">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("kitchen_name_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("kitchen_name_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Serving advice</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6>{info.serving_advice}</h6>

                    {approvalStatus === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between items-center">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("kitchen_name_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("kitchen_name_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="w-full">
              <h6>Meal Photos</h6>
              <div className="flex items-center ">
                <Divider className="w-1/2 bg-red-900 h-1 " />
                <ExpandMoreIcon />
                <Divider className="w-1/2 bg-red-900 h-1" />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="ml-2 flex justify-between w-11/12 mx-auto flex-col">
              <div className="flex w-11/12 justify-between max-lg:grid max-lg:grid-cols-1">
                <div>
                  <div className="w-44 h-44 bg-slate-500 rounded max-lg:mx-auto"></div>
                  <h6>Profilephoto.jpg</h6>
                  <h6>250*250px</h6>
                  <h6>42kb</h6>
                  {approvalStatus === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between items-center">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("kitchen_name_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("kitchen_name_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                </div>
                <div>
                  <div className="w-44 h-44 bg-slate-500 rounded max-lg:mx-auto"></div>
                  <h6>Profilephoto.jpg</h6>
                  <h6>250*250px</h6>
                  <h6>42kb</h6>
                  {approvalStatus === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between items-center">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("kitchen_name_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("kitchen_name_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                </div>
                <div>
                  <div className="w-44 h-44 bg-slate-500 rounded max-lg:mx-auto"></div>
                  <h6>Profilephoto.jpg</h6>
                  <h6>250*250px</h6>
                  <h6>42kb</h6>
                  {approvalStatus === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between items-center">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("kitchen_name_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("kitchen_name_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default ApproverMeal;
