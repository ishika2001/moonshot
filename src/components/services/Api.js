import { toast } from "react-toastify";
import { getChecked } from "../../slices/checkSlice";
import { isLoading } from "../../slices/loginSlice";
import axios from "axios";
import {
  alertChecked,
  attempCount,
  verfifyChecked,
} from "../../slices/checkVerify";
import { getCases } from "../../slices/getCaseSlice";

export async function callLoginAPI(
  isLoginScreen,
  dispatch,
  email,
  ip,
  setemail,
  emailGet
) {
  dispatch(getChecked(true));
  toast("OTP send!");
  await axios
    .post(process.env.REACT_APP_API_AUTH + "/api/SendOtp", {
      email: email,
      IP: ip,
      is_pin: isLoginScreen,
    })
    .then((response) => {
      const dataEmail = response.data;
      dispatch(emailGet({ dataEmail, email }));
      setemail(dataEmail.email);
      dispatch(getChecked(true));
      dispatch(attempCount(3));
    }).catch((error) => {
      console.log(error);
    });
}

export async function callLoginAPItoVerifyIdentity(
  isVerifyIdentity,
  dispatch,
  email,
  ip_,
  setemail,
  emailGet,
  getSchedule,
  schedule,
  setSchedule
) {
  dispatch(getChecked(true));
  toast("PIN sent!");
  await axios
    .post(process.env.REACT_APP_API_AUTH + "/api/SendOtp", {
      email: email,
      IP: ip_,
      is_pin: isVerifyIdentity,
    })
    .then((response) => {
      const dataEmail = response.data;
      dispatch(emailGet({ dataEmail, email }));
      setemail(dataEmail.email);
      dispatch(getSchedule({ dataEmail, schedule }));
      dispatch(getChecked(true));
      dispatch(attempCount(3));
    }).catch((error) => {
      console.log(error);
    });;
}

export async function callVerifiyAPI(
  isVerifyScreen,
  dispatch,
  email,
  OTP,
  veriftGet,
  navigate,
  setWorngOtpMsg,
  setTokenFromVerify,
  atemptCount,
  setOTP
) {
  dispatch(isLoading(true));
  dispatch(verfifyChecked(false));
  await axios
    .post(process.env.REACT_APP_API_AUTH + "/api/VerifyOtp", {
      email: email,
      otp: OTP,
      is_pin: isVerifyScreen,
    })
    .then((response) => {
      const Token = response.data.token;
      setTokenFromVerify(response.data.token);
      dispatch(veriftGet({ Token, response }));
      navigate("/case");
      toast("OTP verified!");
      setOTP("");
      dispatch(getChecked(false));
      dispatch(verfifyChecked(false));
      dispatch(isLoading(false));
      dispatch(alertChecked(true));
      dispatch(attempCount(3));
    })
    .catch((error) => {
      toast("Invalid OTP!");
      dispatch(isLoading(false));
      dispatch(verfifyChecked(true));
      dispatch(attempCount(atemptCount - 1));
      setWorngOtpMsg("Invalid OTP");
      setOTP("");
    });
}

export async function callVerifiyAPItoVerifyPIN(
  isVerifyPin,
  dispatch,
  email,
  OTP,
  veriftGet,
  navigate,
  setWorngOtpMsg,
  setTokenFromVerify,
  atemptCount,
  setOTP
) {
  dispatch(isLoading(true));
  dispatch(verfifyChecked(false));
  await axios
    .post(process.env.REACT_APP_API_AUTH + "/api/VerifyOtp", {
      email: email,
      otp: OTP,
      is_pin: isVerifyPin,
    })
    .then((response) => {
      const Token = response.data.token;
      setTokenFromVerify(response.data.token);
      dispatch(veriftGet({ Token, response }));
      navigate("/downloadJobs");
      toast("PIN verified!");
      setOTP("");
      dispatch(getChecked(false));
      dispatch(verfifyChecked(false));
      dispatch(isLoading(false));
      dispatch(alertChecked(true));
      dispatch(attempCount(3));
    })
    .catch((error) => {
      toast("Invalid PIN!");
      dispatch(isLoading(false));
      dispatch(verfifyChecked(true));
      dispatch(attempCount(atemptCount - 1));
      setWorngOtpMsg("Invalid PIN");
      setOTP("");
    });
}

export async function getAllCases(token, setMainData, dispatch) {
  if (token) {
    dispatch(isLoading(true));
    await axios
      .get(process.env.REACT_APP_API_ALLCASES_URL + "/api/getAllCases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(isLoading(false));
        setMainData(response.data.data);
      })
      .catch((e) => {
        dispatch(isLoading(false));
        console.log(e);
      });
  }
}

export async function addCases(
  token,
  formInputField,
  setFormInputField,
  initialVal,
  setShowDesh,
  setRenderCaseData,
  renderCaseData
) {
  await axios
    .post(
      process.env.REACT_APP_API_ADDCASE_URL + "/api/addCase",
      formInputField,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setFormInputField(initialVal);
      setShowDesh(false);
      setRenderCaseData(!renderCaseData);
    })
    .catch((e) => {
      console.log("Error", e);
    });
}
export async function getCaseDetail(
  token,
  dispatch,
  setCaseDetails,
  caseDetailsData
) {
  if (token) {
    dispatch(isLoading(true));
    await axios
      .get(
        process.env.REACT_APP_API_ALLCASES_URL +
        `/api/getCase?case_id=${caseDetailsData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(getCases(response.data.data));
        dispatch(isLoading(false));
        setCaseDetails(response.data.data);
      })
      .catch((e) => {
        dispatch(isLoading(false));
        console.log(e);
      });
  }
}
export async function getJobData(
  token,
  dispatch,
  setTableData,
  caseDetailsData
) {
  if (token) {
    dispatch(isLoading(true));
    await axios
      .get(
        process.env.REACT_APP_API_ALLCASES_URL +
        `/api/getJobs?case_id=${caseDetailsData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(isLoading(false));
        // setTableData(response.data.data);
        const jobsWithInitialStatus = response.data.data.map((job) => ({
          ...job,
          initialStatus: job.status,
        }));
        setTableData(jobsWithInitialStatus);
      })
      .catch((e) => {
        dispatch(isLoading(false));
      });
  }
}

export async function addJobsByApi(
  token,
  setShowModal,
  dispatch,
  formInputField,
  caseDetailsData,
  setFormInputField,
  initialVal,
  setErrorMessage,
  renderData,
  setRenderData
) {
  setShowModal(false);
  dispatch(isLoading(true));
  await axios
    .post(
      process.env.REACT_APP_API_URLEXPORT + "/api/UrlExport",
      {
        ...formInputField,
        case_id: caseDetailsData.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setFormInputField(initialVal);
      setErrorMessage({});
      setRenderData(!renderData);
      dispatch(isLoading(false));
    })
    .catch((e) => {
      console.log("Error", e);
      dispatch(isLoading(false));
    });
}

export async function getScheduledJob(token, dispatch, job_id, setTableData) {
  if (token) {
    dispatch(isLoading(true));
    await axios
      .get(
        process.env.REACT_APP_API_ALLCASES_URL +
        `/api/getJob?job_id=${job_id.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(isLoading(false));
        setTableData([response.data.data]);
      })
      .catch((e) => {
        dispatch(isLoading(false));
        console.log(e);
      });
  }
}
export async function downloadJobs(
  token,
  dispatch,
  job_id,
  setTableDataToShowAllJobs,
  schedule,
  identity
) {
  if (token) {
    dispatch(isLoading(true));
    await axios
      .post(
        process.env.REACT_APP_API_ALLJOBS_URL + "/api/DownloadAllJobUrl",
        {
          schedule: schedule,
          email: identity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(isLoading(false));
        setTableDataToShowAllJobs(response.data.data);
      })
      .catch((e) => {
        console.log(e);
        dispatch(isLoading(false));
      });
  }
}

export async function addAttachment(
  token,
  caseId,
  base64_url,
  isAttach,
  setIsAttach
) {
  await axios
    .post(
      process.env.REACT_APP_API_ADDCASE_URL + "/api/addAttachment",
      {
        case_id: caseId,
        image: base64_url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      toast("Added successfully");
      setIsAttach(!isAttach);
    })
    .catch((e) => {
      console.log(e);
    });
}
export async function getAttachment(token, caseId, setAttachFiles) {
  await axios
    .post(
      process.env.REACT_APP_API_ADDCASE_URL + "/api/getAttachments",
      {
        case_id: caseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setAttachFiles(response.data.data);
    })
    .catch((e) => {
      console.log(e);
    });
}
export async function downloadAllJobUrl(
  id,
  token,
  setDownloadedRowId,
  setDownload,
  setPdf,
  setPng,
  setZip,
  caseId,
  setStartProcess
) {
  setStartProcess(true);
  setDownload(true);
  if (token) {
    await axios
      .post(
        process.env.REACT_APP_API_URLEXPORT + "/api/downloadUrl",
        {
          jobId: id,
          case_id: caseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStartProcess(false);
        setPdf(response.data?.data[0]?.pdf);
        setPng(response.data?.data[1]?.png);
        setZip(response.data?.data[2]?.zip);
      })
      .catch((e) => {
        console.log(e);
        setStartProcess(false);
      });
  }
}

export async function downloadUrl(
  id,
  token,
  setDownloadedRowId,
  setDownload,
  setPdf,
  setPng,
  setZip,
  caseId,
  setStartProcess
) {
  setDownloadedRowId(id);
  setStartProcess(true);
  setDownload(true);
  if (token) {
    await axios
      .post(
        process.env.REACT_APP_API_URLEXPORT + "/api/downloadUrl",
        {
          jobId: id,
          case_id: caseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStartProcess(false);
        setPdf(response.data?.data[0]?.pdf);
        setPng(response.data?.data[1]?.png);
        setZip(response.data?.data[2]?.zip);
      })
      .catch((e) => {
        console.log(e);
        setStartProcess(false);
      });
  }
}

export async function closeCase(token, caseId, setIsCloseCase, isCloseCase) {
  await axios
    .post(
      process.env.REACT_APP_API_ADDCASE_URL +
      `/api/closeCase?case_id=${caseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setIsCloseCase(!isCloseCase);
      toast("Case closed!");
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function editCase(
  dispatch,
  setIsCloseCase,
  isCloseCase,
  token,
  caseId,
  caseNo,
  caseType,
  caseTag,
  caseLocation,
  caseDate,
  setRenderEditData,
  renderEditData
) {
  await axios
    .post(
      process.env.REACT_APP_API_ADDCASE_URL + `/api/editCase`,
      {
        case_id: caseId,
        case_number: caseNo,
        type: caseType,
        tags: caseTag,
        location: caseLocation,
        initial_date: caseDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setIsCloseCase(!isCloseCase);
      setRenderEditData(!renderEditData);
    })
    .catch((e) => {
      console.log(e);
    });
}


export async function updateJobStatus(
  token,
  dispatch,
  setJobStatus,
  job_id,
) {
  if (token) {
    dispatch(isLoading(true));
    await axios
      .get(process.env.REACT_APP_API_ALLCASES_URL + `/api/getJobStatus?job_id=${job_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(isLoading(false));
        setJobStatus(response.data.data.status);
      })
      .catch((e) => {
        dispatch(isLoading(false));
        console.log(e);
      });
  }
}