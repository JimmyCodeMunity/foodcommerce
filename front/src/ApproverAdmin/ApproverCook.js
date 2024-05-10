import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Divider,
  div,
  Input,
  h6,
  TextField,
  Backdrop,
  Alert,
  CircularProgress,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { apiAdmin } from "../Storage/ApiClient";
import { AuthContext } from "../Helper/Context";

const ApproverCook = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [approvalStatus, setApprovalStatus] = useState({
    kitchen_name_approved: null,
    id_number_approved: null,
    mpesa_number_approved: null,
    health_number_approved: null,
    health_expiry_date_approved: null,
    shrt_desc_approved: null,
    id_front_approved: null,
    id_back_approved: null,
    health_cert_approved: null,
    profile_pic_approved: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejection_reason, setRejectionReason] = useState("");

  const handleApproval = async (fieldName) => {
    try {
      const updatedApprovalStatus = { ...approvalStatus, [fieldName]: true };
      console.log(`Approving ${fieldName}`);
      console.log(updatedApprovalStatus);
      setApprovalStatus(updatedApprovalStatus);
      await updateApproval(updatedApprovalStatus);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleRejection = async (fieldName) => {
    try {
      const updatedApprovalStatus = { ...approvalStatus, [fieldName]: false };
      console.log(`Rejecting ${fieldName}`);
      console.log(updatedApprovalStatus);
      setApprovalStatus(updatedApprovalStatus);
      await updateApproval(updatedApprovalStatus);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      apiAdmin
        .get(`/edit-approve-cook/${Id}`)
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
    try {
      const response = await apiAdmin.put(`/approve-cook/${Id}`, approvalData);
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const approveAll = () => {
    const updatedApprovalStatus = { ...approvalStatus };
    for (const key in updatedApprovalStatus) {
      updatedApprovalStatus[key] = true;
    }
    setApprovalStatus(updatedApprovalStatus);
    updateApproval(updatedApprovalStatus);
  };

  const rejectAll = async () => {
    setLoading(true);
    try {
      if (!rejection_reason) {
        setError("Rejection reason is required");
        return;
      }
      const updatedApprovalStatus = { ...approvalStatus };
      for (const key in updatedApprovalStatus) {
        updatedApprovalStatus[key] = false;
      }
      setApprovalStatus(updatedApprovalStatus);
      await updateApproval({ ...updatedApprovalStatus, rejection_reason });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className="mb-2">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="relative  w-2/3 mx-auto">
        {error && (
          <Alert severity="error" className="w-full absolute top-10 ">
            {error.message}
          </Alert>
        )}
      </div>
      <div className="h-fit mb-4  w-full  max-lg:ml-2 flex justify-between  bg-lanternOrange/30 p-2 max-lg:flex-col">
        <h6
          className="text-3xl 
          text-lanternOrange"
        >
          Cook's Profile Review
        </h6>
        {info.status === 2 ? (
          <button className="border-2 border-red-600  text-red-600 font-semibold  w-44 h-10 px-2 rounded">
            Suspend Cook
          </button>
        ) : info.status === 0 ? (
          <div className="w-1/4 max-lg:w-2/3 justify-between flex items-center">
            <div></div>
            <button
              className="bg-red-500 text-white w-32 mr-2 h-10 px-2 rounded"
              onClick={handleOpen}
            >
              Reject Profile
            </button>

            <button
              className=" bg-green-500 text-white w-32 mr-2 h-10 px-2 rounded"
              onClick={approveAll}
            >
              Approve Profile
            </button>
          </div>
        ) : (
          <button className="bg-green-500 text-white w-44 h-10 px-2 rounded">
            Profile Approved
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
                  Reject Cook
                </h6>
                <h6 className="text-center text-slate-500">
                  Give a reason why you are rejecting the application
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
      {
        <div className="flex flex-col h-20 justify-evenly ml-2">
          <h6 className="font-semibold text-3xl">Kitchen Name</h6>
          <h6>Cook's Name</h6>
        </div>
      }
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
              <h6>Personal details</h6>
              <div className="flex items-center">
                <Divider className="w-1/2 bg-red-900 h-1 " />
                <ExpandMoreIcon />
                <Divider className="w-1/2 bg-red-900 h-1" />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="ml-2 flex justify-between max-lg:flex-col">
              <div className="w-44 h-44  rounded max-lg:mx-auto">
                <img src={data.profile_pic} alt=".." />
              </div>

              {info.status === 2 ? (
                <button className="w-20 h-10 bg-green-500 hidden text-white rounded">
                  Approved
                </button>
              ) : approvalStatus.profile_pic_approved === true ? (
                <div>
                  <button className="w-20 h-10 bg-green-500 text-white rounded">
                    Approved
                  </button>
                </div>
              ) : approvalStatus.profile_pic_approved === false ? (
                <button className="w-20 h-10 bg-red-500 text-white rounded">
                  Rejected
                </button>
              ) : (
                <div className="flex w-20 justify-between">
                  <div
                    className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                    onClick={() => handleRejection("profile_pic_approved")}
                  >
                    <Close />
                  </div>
                  <div
                    className="w-8 h-8 rounded text-green-600 border border-green-600"
                    onClick={() => handleApproval("profile_pic_approved")}
                  >
                    <Check />
                  </div>
                </div>
              )}
              <div className="w-1/2 h-80 justify-between  flex flex-col max-lg:w-11/12 max-lg:mx-auto max-lg:mt-5">
                <div variant="standard">
                  <h6 className="text-slate-500">Full Name</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.kitchen_name}
                    </h6>

                    {info.status === 2 ? (
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    ) : approvalStatus.kitchen_name_approved === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus.kitchen_name_approved === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between">
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
                  <h6 className="text-slate-500">ID Number</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.id_number}
                    </h6>

                    {info.status === 2 ? (
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    ) : approvalStatus.id_number_approved === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus.id_number_approved === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() => handleRejection("id_number_approved")}
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() => handleApproval("id_number_approved")}
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Phone Number</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.mpesa_number}
                    </h6>

                    {info.status === 2 ? (
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    ) : approvalStatus.mpesa_number_approved === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus.mpesa_number_approved === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("mpesa_number_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("mpesa_number_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Description</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.shrt_desc}
                    </h6>

                    {info.status === 2 ? (
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    ) : approvalStatus.shrt_desc_approved === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus.shrt_desc_approved === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() => handleRejection("shrt_desc_approved")}
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() => handleApproval("shrt_desc_approved")}
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
              <h6>Personal documents</h6>
              <div className="flex items-center">
                <Divider className="w-1/2 bg-red-900 h-1 " />
                <ExpandMoreIcon />
                <Divider className="w-1/2 bg-red-900 h-1" />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="ml-2 flex justify-between w-2/3 mx-auto flex-col">
              <div className="w-full  my-10 justify-between  flex flex-col max-lg:mx-auto max-lg:mt-5">
                <div variant="standard">
                  <h6 className="text-slate-500">ID Number</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.id_number}
                    </h6>
                  </div>
                </div>
              </div>
              <div className=" w-11/12 grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                <div className="mb-2">
                  <div className="w-44 h-44 rounded max-lg:mx-auto">
                    <img src={data.id_front} alt="..." />
                  </div>
                  <h6>Front ID Photo</h6>
                  <h6>250*250px</h6>
                  <h6>42kb</h6>
                  {info.status === 2 ? (
                    <button className="w-20 h-10 bg-green-500 text-white rounded hidden">
                      Approved
                    </button>
                  ) : approvalStatus.id_front_approved === true ? (
                    <div>
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    </div>
                  ) : approvalStatus.id_front_approved === false ? (
                    <button className="w-20 h-10 bg-red-500 text-white rounded">
                      Rejected
                    </button>
                  ) : (
                    <div className="flex w-20 justify-between">
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() => handleRejection("id_front_approved")}
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() => handleApproval("id_front_approved")}
                        >
                          <Check />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <div className="w-44 h-44 rounded max-lg:mx-auto">
                    <img src={data.id_back} alt="..." />
                  </div>
                  <h6>Back ID Photo</h6>
                  <h6>250*250px</h6>
                  <h6>42kb</h6>
                  {info.status === 2 ? (
                    <button className="w-20 h-10 bg-green-500 text-white rounded hidden">
                      Approved
                    </button>
                  ) : approvalStatus.id_back_approved === true ? (
                    <div>
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    </div>
                  ) : approvalStatus.id_back_approved === false ? (
                    <button className="w-20 h-10 bg-red-500 text-white rounded">
                      Rejected
                    </button>
                  ) : (
                    <div className="flex w-20 justify-between">
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() => handleRejection("id_back_approved")}
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() => handleApproval("id_back_approved")}
                        >
                          <Check />
                        </div>
                      </div>
                    </div>
                  )}
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
              <h6>Business documents</h6>
              <div className="flex items-center">
                <Divider className="w-1/2 bg-red-900 h-1 " />
                <ExpandMoreIcon />
                <Divider className="w-1/2 bg-red-900 h-1" />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="ml-2 flex justify-between max-lg:flex-col">
              <div className="w-44 h-44 flex justify-center items-center flex-col rounded max-lg:mx-auto">
                <img src={data.health_cert} alt="..." />{" "}
                <h6 className="mt-3">Health Certificate</h6>
              </div>

              {info.status === 2 ? (
                <button className="w-20 h-10 bg-green-500 hidden text-white rounded">
                  Approved
                </button>
              ) : approvalStatus.health_cert_approved === true ? (
                <div>
                  <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                    Approved
                  </button>
                </div>
              ) : approvalStatus.health_cert_approved === false ? (
                <button className="w-20 h-10 bg-red-500 text-white rounded">
                  Rejected
                </button>
              ) : (
                <div className="flex w-20 justify-between">
                  <div
                    className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                    onClick={() => handleRejection("health_cert_approved")}
                  >
                    <Close />
                  </div>
                  <div
                    className="w-8 h-8 rounded text-green-600 border border-green-600"
                    onClick={() => handleApproval("health_cert_approved")}
                  >
                    <Check />
                  </div>
                </div>
              )}
              <div className="w-1/2 h-72 justify-between  flex flex-col max-lg:w-2/3 max-lg:mx-auto max-lg:mt-5">
                <div variant="standard">
                  <h6 className="text-slate-500">Location</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.google_map_pin}
                    </h6>
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Physical Address</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.physical_address}
                    </h6>
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Health cert number</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.health_number}
                    </h6>
                    {info.status === 2 ? (
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    ) : approvalStatus.health_number_approved === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus.health_number_approved === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("health_number_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("health_number_approved")
                          }
                        >
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div variant="standard">
                  <h6 className="text-slate-500">Expiry Date</h6>
                  <div className="flex mt-1 w-full justify-between">
                    <h6 className=" border-b border-slate-400 leading-loose w-full">
                      {info.health_expiry_date}
                    </h6>
                    {info.status === 2 ? (
                      <button className="w-20 h-10 hidden bg-green-500 text-white rounded">
                        Approved
                      </button>
                    ) : approvalStatus.health_expiry_date_approved === true ? (
                      <div>
                        <button className="w-20 h-10 bg-green-500 text-white rounded">
                          Approved
                        </button>
                      </div>
                    ) : approvalStatus.health_expiry_date_approved === false ? (
                      <button className="w-20 h-10 bg-red-500 text-white rounded">
                        Rejected
                      </button>
                    ) : (
                      <div className="flex w-20 justify-between">
                        <div
                          className="w-8 h-8 rounded text-red-600 border border-red-600 text-center"
                          onClick={() =>
                            handleRejection("health_expiry_date_approved")
                          }
                        >
                          <Close />
                        </div>
                        <div
                          className="w-8 h-8 rounded text-green-600 border border-green-600"
                          onClick={() =>
                            handleApproval("health_expiry_date_approved")
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
      </div>
    </div>
  );
};

export default ApproverCook;
