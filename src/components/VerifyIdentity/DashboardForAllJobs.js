import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import Spinner from 'react-bootstrap/Spinner'
import '../CasesDashboard/Screen.css'
import { UserContext } from "../../App";
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { RiDownloadLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { MainHeader } from "../CaseDetailContainer/MainHeader/MainHeader";
import { downloadJobs } from "../services/Api";
import { downloadUrl } from "../services/Api";

export function DashboardForAllJobs() {
  
  const [downloadedRowId, setDownloadedRowId] = useState(null);
  const [startProcess, setStartProcess] = useState(true)
  const [download, setDownload] = useState(false);
  const [searchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pdf, setPdf] = useState("");
  const [zip, setZip] = useState("");
  const [png, setPng] = useState("");
  const { TableDataToShowAllJobs, setTableDataToShowAllJobs } = useContext(UserContext);
  const [job,setJob]=useState([]);
  const dispatch = useDispatch();
  const loadingConditionForJob = useSelector((state) => { return state.emails.isLoadingCondition });
  const token = useSelector((state) => { return state.pin.Token; });
  const job_id = useSelector((state) => state.jobs.jobId)
  const schedule = useSelector((state)=>{return state.identity.schedule})
  const identity = useSelector((state)=>{return state.identity.email})
  const caseDetailsData = useSelector((state) => state.cases.caseDetailsData)
  const dataTableCustomStyles = {
    rows: {
      style: {
        minHeight: "70px",
        fontFamily: 'Roboto',
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: 500,

      },
    },
    cells: {
      style: {
        paddingRight: "0px",
        fontSize: "16px",
      },
    },
    TableCol: {
      style: {
        background: "black",
      },
    },
  };
  useEffect(() => {
    downloadJobs(token, dispatch, job_id, setTableDataToShowAllJobs, schedule, identity);
  }, []);
  useEffect(() => {
    if (TableDataToShowAllJobs) {
      setJob(TableDataToShowAllJobs.length);
    }
  }, [TableDataToShowAllJobs]);


  let filteredData=[];
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  if(TableDataToShowAllJobs){
     filteredData = TableDataToShowAllJobs.filter((item) =>
    item.url.toLowerCase().includes(searchText.toLowerCase())
  );
  }
  

  const downloadHandler = (event, id) => {
    event.stopPropagation();
    downloadUrl(id, token, setDownloadedRowId, setDownload, setPdf, setPng, setZip, caseDetailsData.id, setStartProcess)
  };
  const dataTableColumns = [
    {
      name: "Source",
      selector: (row) => (
        <>
          <div>
            {row.url}
          </div>
        </>
      ),
      sortable: true,
      width: "30%",
    },
    {
      name: "Job Type",
      selector: (row) => (
        <>
          <div>
            {row.type}
          </div>
        </>
      ),
      sortable: true,
      width: "15%",
    },
    {
      name: "Created On",
      selector: (row) => (
        <>
          <div className="date-set">
            <div className="time-icon-other"><BiTimeFive /></div>

            <span>
                {new Date(row.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/(\w{3}) (\d{2}), (\d{4})/, "$2 $1, $3")},{" "}
                {new Date(row.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true
                })}
              </span>
          </div>
        </>
      ),
      sortable: true,
      width: "20%",
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div>
            <Button className="status-button"><span>Created</span></Button>
          </div>
        </>

      ),
      sortable: true,
      width: "15%",
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          {downloadedRowId === row.id && download ? (startProcess) ?
            (<Button
              variant="dark"
              disabled
              className="download-success-button"
            >
              <div className="down-btn">
                <div>
                  <Spinner animation="border" variant="light" size="sm" />
                </div>
                <span className="down-write" >Processing</span>
              </div>

            </Button>) :
            (
              <div>
                <div className="upbtn">
                  <span onClick={() => setDownload(false)}><FaArrowAltCircleUp /></span>
                </div>
                <div>
                  {pdf ? (
                    <a style={{ color: "#52a6b6" }} className="d-block" href={pdf}>
                      Download PDF
                    </a>
                  ) : (
                    <span className="font-s">No PDF available</span>
                  )}
                  <br />
                  {png ? (
                    <a style={{ color: "#52a6b6" }} className="d-block" href={png}>
                      Download PNG
                    </a>
                  ) : (
                    <span className="font-s ">No PNG available</span>
                  )}
                  <br />
                  {zip ? (
                    <a style={{ color: "#52a6b6" }} className="d-block" href={zip}>
                      Download HTML
                    </a>
                  ) : (
                    <span className="font-s ">No HTML available</span>
                  )}
                </div>

              </div>
            ) : (
            <Button
              variant="dark"
              type="submit"
              className="download-success-button"
              onClick={(e) => downloadHandler(e, row.id)}
            >
              <div className="down-btn">
                <div>
                  <RiDownloadLine />
                </div>
                <span className="down-write" > Download</span>
              </div>

            </Button>
          )}
        </>
      ),
      sortable: true,
    },
  ];
  return (
    <>
      <Container fluid className="p-0">
        <Row>
          <MainHeader/>
        </Row>
        <Row>
        </Row>
        <Row className="sub-header">
          <Col style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <div className="job-counts table-header-job titleshift ">{schedule ? schedule.charAt(0).toUpperCase() + schedule.slice(1) : ''} Jobs - {job}</div>
          </Col>
          <Col>
            <div className="search-content" >
              <div className="set">
                <span>
                  <img src="./case_search.svg" className="my-img" alt="search"/>
                </span>
                <input
                  type="text"
                  className="search-input "
                  placeholder="Search"
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </Col>

          <Col>
            <div className="table-header">
            </div>
          </Col>
        </Row>
        {!loadingConditionForJob &&
          <div className="table-content">
            <DataTable
              columns={dataTableColumns}
              data={filteredData}
              customStyles={dataTableCustomStyles}
              pagination
              highlightOnHover
              filter={searchQuery}
            />
          </div>
        }
        {loadingConditionForJob && (
          <TailSpin
            height="50"
            width="50"
            radius="5"
            color="black"
            ariaLabel="loading"
            wrapperStyle={{ position: "absolute", top: "60%", left: "50%" }}
          />
        )}
      </Container>
    </>
  );
}

